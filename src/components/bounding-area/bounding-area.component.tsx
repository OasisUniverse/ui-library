import React, { ChangeEvent, FC, useCallback, useRef, useState } from 'react';
import styles from './bounding-area.module.scss';
import { Config } from '../../interfaces';
import UploadIcon from '../../assets/images/svg/upload-icon.component';

export enum UploadFileErrors {
    Size,
    AcceptReg,
}

export interface BoundingAreaProps {
    className?: string;
    boundingAreaSize?: 'small' | 'normal' | 'large';
    uploadPhraseText?: string;
    maxFileSize?: number;
    debugFileData?: boolean;
    acceptReg: string;
    uploadFileCallBack: (loadedImage?: Omit<Config, 'src'>, error?: UploadFileErrors) => void;
    layersConfig: Config[];
}

const BoundingArea: FC<BoundingAreaProps> = ({
    className,
    boundingAreaSize = 'normal',
    uploadPhraseText = 'Перетащите или загрузите собственный файл',
    maxFileSize = 2097152, //2МБ in bytes
    debugFileData = false,
    acceptReg,
    uploadFileCallBack,
    layersConfig,
}) => {
    const fileInput = useRef<HTMLInputElement>(null);
    const uploadArea = useRef<HTMLDivElement>(null);
    const [isDrag, setIsDrag] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const returnFileFrom = (
        e:
            | (React.DragEvent<HTMLDivElement> & { dataTransfer?: DataTransfer })
            | (ChangeEvent<HTMLInputElement> & { dataTransfer?: DataTransfer }),
    ) =>
        (e.target as HTMLInputElement).files
            ? ((e?.target as HTMLInputElement)?.files as FileList)[0]
            : (e?.dataTransfer?.files[0] as File);

    const returnErrorWithStatus = (type: UploadFileErrors) => {
        setIsError(true);
        uploadFileCallBack(undefined, type);
        return;
    };

    const isValid = (string: string, file: File) => string.split(',').some((reg) => file.type.trim() === reg.trim());

    const uploadFile = useCallback(
        (
            e:
                | (React.DragEvent<HTMLDivElement> & { dataTransfer?: DataTransfer })
                | (ChangeEvent<HTMLInputElement> & { dataTransfer?: DataTransfer }),
        ): void => {
            e.preventDefault();
            e.stopPropagation();
            setIsDrag(false);
            const file = returnFileFrom(e);
            debugFileData && console.log(file);
            const formData = new FormData();
            if (file) {
                if (!isValid(acceptReg, file)) {
                    returnErrorWithStatus(UploadFileErrors.AcceptReg);
                    return;
                }
                if (file?.size > maxFileSize) {
                    returnErrorWithStatus(UploadFileErrors.Size);
                    return;
                }
                formData.append(file.name, file);
                setIsError(false);
                const reader = new FileReader();
                const img = new Image();
                reader.onload = (e) => {
                    if (e?.target?.result) img.src = e.target.result as string;
                    reader.readAsDataURL(file);
                };
                file &&
                    uploadFileCallBack({
                        data: formData,
                        fileName: file.name,
                        extension: file.type,
                        date: new Date(Date.now()),
                    });
            }
            console.log(layersConfig);
        },
        [debugFileData, acceptReg, maxFileSize, uploadFileCallBack],
    );

    const openFileSelectFolder = () => fileInput?.current?.click();

    const onDragLeave = (): void => {
        isDrag && setIsDrag(false);
    };

    const onDragOverAndEnterLogic = (e: React.DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        !isDrag && setIsDrag(true);
        isError && setIsError(false);
    };

    const lineMaxValue: string = boundingAreaSize === 'small' ? '300' : boundingAreaSize === 'normal' ? '400' : '500';
    return (
        <div
            ref={uploadArea}
            className={`${styles.boundingWrapper} ${className} ${isDrag && styles.isDragOver} ${
                boundingAreaSize && styles[boundingAreaSize]
            }`}
            onDragEnter={onDragOverAndEnterLogic}
            onDragLeave={onDragLeave}
            onDragOver={onDragOverAndEnterLogic}
            onDrop={uploadFile}
            onClick={openFileSelectFolder}
        >
            <input ref={fileInput} type='file' onChange={uploadFile} accept={acceptReg} />
            {layersConfig?.length === 0 &&
                layersConfig.map((el, index) => (
                    <img
                        key={el.fileName}
                        src={el.src}
                        style={{
                            position: 'absolute',
                            zIndex: index,
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                        }}
                        alt={el.fileName}
                    />
                ))}
            {layersConfig?.length === 0 && (
                <>
                    <UploadIcon />
                    <span className={styles.uploadFilesText}>{uploadPhraseText}</span>
                </>
            )}
            <div className={styles.horizontalSizeLine}>
                <span>0</span>
                <span>{lineMaxValue}</span>
            </div>
            <div className={styles.verticalSizeLine}>
                <span>0</span>
                <span>{lineMaxValue}</span>
            </div>
        </div>
    );
};

export default BoundingArea;
