import React, { ChangeEvent, FC, useCallback, useMemo, useRef, useState } from 'react';
import styles from './glue-images-area.module.scss';
import { ImageLayersConfig } from '../../interfaces';
import UploadIcon from '../../shared/svg/upload.icon';

const ACCEPTABLE_AREA_TYPES = ['image/png', 'image/svg', 'image/jpg', 'image/jpeg'];
const ACCEPTABLE_TYPES_FOR_INPUT = ACCEPTABLE_AREA_TYPES.join(',');
const MIN_AREA_SIZE = 0;

export enum UploadFileErrors {
    Size,
    AcceptReg,
}

export interface GlueImagesAreaProps {
    className?: string;
    onDragOverClassName?: string;
    maxAreaSize: number;
    uploadPhraseText: string;
    maxFileSize?: number;
    debugFileData?: boolean;
    uploadFileCallBack: (loadedImage?: File, error?: UploadFileErrors) => void;
    layersConfig: ImageLayersConfig[];
}

const GlueImagesArea: FC<GlueImagesAreaProps> = ({
    className,
    onDragOverClassName,
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
                MIN_AREA_SIZE,
                maxAreaSize,
            },
            {
                wrapperClassName: styles.verticalSizeLine,
                MIN_AREA_SIZE,
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

    const onDragEnter = (e: React.DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();

        !isDrag && setIsDrag(true);
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onDragLeave = (): void => {
        isDrag && setIsDrag(false);
    };
    return (
        <div
            ref={uploadArea}
            className={`${styles.glueImagesAreaWrapper} ${className} ${isDrag && onDragOverClassName}`}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
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
            {linesAroundArea.map(({ wrapperClassName, MIN_AREA_SIZE, maxAreaSize }, index) => (
                <div key={`${wrapperClassName}-${index}-${Math.random()}`} className={wrapperClassName}>
                    <span>{MIN_AREA_SIZE}</span>
                    <span>{maxAreaSize}</span>
                </div>
            ))}
        </div>
    );
};

export default GlueImagesArea;
