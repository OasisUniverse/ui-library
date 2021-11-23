import React, { ChangeEvent, FC, useCallback, useMemo, useRef, useState } from 'react';
import styles from './glue-images-area.module.scss';
import { ImageLayersConfig } from '../../interfaces';
import UploadIcon from '../../assets/images/svg/upload-icon.component';

const ACCEPTABLE_AREA_TYPES = ['image/png', 'image/svg', 'image/jpg', 'image/jpeg'];
const ACCEPTABLE_TYPES_FOR_INPUT = 'image/png, image/svg, image/jpg, image/jpeg';
const minAreaSize = 0;

export enum UploadFileErrors {
    Size,
    AcceptReg,
}

export interface GlueImagesAreaProps {
    className?: string;
    maxAreaSize: number;
    uploadPhraseText: string;
    maxFileSize?: number;
    debugFileData?: boolean;
    uploadFileCallBack: (loadedImage?: File, error?: UploadFileErrors) => void;
    layersConfig: ImageLayersConfig[];
}

const GlueImagesArea: FC<GlueImagesAreaProps> = ({
    className,
    maxAreaSize,
    uploadPhraseText,
    maxFileSize = 5242880, //5МБ in bytes
    debugFileData = false,
    uploadFileCallBack,
    layersConfig,
}) => {
    const fileInput = useRef<HTMLInputElement>(null);
    const uploadArea = useRef<HTMLDivElement>(null);
    const [isDrag, setIsDrag] = useState<boolean>(false);

    const componentChangeableStyles = useMemo(
        () => ({ width: `${maxAreaSize}px`, height: `${maxAreaSize}px` }),
        [maxAreaSize],
    );

    const linesAroundArea = useMemo(() => {
        return [
            {
                wrapperClassName: styles.horizontalSizeLine,
                minAreaSize,
                maxAreaSize,
            },
            {
                wrapperClassName: styles.verticalSizeLine,
                minAreaSize,
                maxAreaSize,
            },
        ];
    }, [maxAreaSize]);

    const returnFileFromArea = (
        e:
            | (React.DragEvent<HTMLDivElement> & { dataTransfer?: DataTransfer })
            | (ChangeEvent<HTMLInputElement> & { dataTransfer?: DataTransfer }),
    ) =>
        (e.target as HTMLInputElement).files
            ? ((e?.target as HTMLInputElement)?.files as FileList)[0]
            : (e?.dataTransfer?.files[0] as File);

    const returnErrorWithStatus = (type: UploadFileErrors) => {
        uploadFileCallBack(undefined, type);
    };

    const isFileTypeAcceptable = (string: string[], file: File) =>
        string.some((reg) => file.type.trim() === reg.trim());

    const uploadFile = useCallback(
        (
            e:
                | (React.DragEvent<HTMLDivElement> & { dataTransfer?: DataTransfer })
                | (ChangeEvent<HTMLInputElement> & { dataTransfer?: DataTransfer }),
        ): void => {
            e.preventDefault();
            e.stopPropagation();
            setIsDrag(false);
            const file = returnFileFromArea(e);
            debugFileData && console.log(file);
            if (file) {
                if (!isFileTypeAcceptable(ACCEPTABLE_AREA_TYPES, file)) {
                    returnErrorWithStatus(UploadFileErrors.AcceptReg);
                    return;
                }
                if (file?.size > maxFileSize) {
                    returnErrorWithStatus(UploadFileErrors.Size);
                    return;
                }
                uploadFileCallBack(file, undefined);
            }
        },
        [debugFileData, maxFileSize, uploadFileCallBack],
    );

    const openContextFolder = () => fileInput?.current?.click();

    const onDragLeave = (): void => {
        isDrag && setIsDrag(false);
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onDragEnter = (e: React.DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();

        !isDrag && setIsDrag(true);
    };
    return (
        <div
            ref={uploadArea}
            className={`${styles.GlueImagesAreaWrapper} ${isDrag && styles.isDragOver} ${className}`}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={uploadFile}
            onClick={openContextFolder}
            style={componentChangeableStyles}
        >
            <input ref={fileInput} type='file' onChange={uploadFile} accept={ACCEPTABLE_TYPES_FOR_INPUT} />
            {!layersConfig?.length ? (
                <div className={styles.emptyImageListViewBox}>
                    <UploadIcon />
                    <span className={styles.uploadFilesText}>{uploadPhraseText}</span>
                </div>
            ) : (
                layersConfig?.map((el, index) => (
                    <img key={el.fileName} src={el.src} style={{ zIndex: index * 50 }} alt={el.fileName} />
                ))
            )}
            {linesAroundArea.map(({ wrapperClassName, minAreaSize, maxAreaSize }, index) => (
                <div key={`${wrapperClassName}-${index}-${Math.random() * 100}`} className={wrapperClassName}>
                    <span>{minAreaSize}</span>
                    <span>{maxAreaSize}</span>
                </div>
            ))}
        </div>
    );
};

export default GlueImagesArea;
