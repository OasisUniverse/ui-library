import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './bounding-area.module.scss';

export enum UploadFileErrors {
    Size,
    AcceptReg,
}

export enum Sizes {
    Small = 'Small',
    Normal = 'Normal',
    Large = 'Large',
}

// todo в пропсе config отслеживается состояние картинок и изменяется по слоям как находятся объекты в массиве
// Не до конца понял на счёт конфигурации.
// todo при получении картинки вызывать callback объектом этой картинки.
// getFileCallback является тем самым callback, что указан выше.

export interface BoundingAreaProps {
    className?: string;
    size: Sizes;
    uploadPhraseText?: string;
    maxFileSize?: number;
    debugFileData?: boolean;
    acceptReg: string;
    isStopSizeAndAcceptValidation?: boolean;
    uploadFileCallBack: (file?: File, error?: UploadFileErrors) => void;
    getFileCallBack: (data: File) => void;
    data: string[];
    sendDataToServer: (data: File[]) => void;
}

const BoundingArea: FC<BoundingAreaProps> = ({
    className,
    size,
    uploadPhraseText,
    maxFileSize = 2097152, //2МБ in bytes
    debugFileData = false,
    isStopSizeAndAcceptValidation = false,
    acceptReg,
    uploadFileCallBack,
    getFileCallBack,
    sendDataToServer,
    data,
}) => {
    const uploadArea = useRef<HTMLDivElement>(null);
    const [isDrag, setIsDrag] = useState<boolean>(false);
    const [filesData, setFilesData] = useState<File[]>([]);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        // fix after setting mocks
        setFilesData([]);
    }, [data]);

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
            if (!isStopSizeAndAcceptValidation && file) {
                !isValid(acceptReg, file) && returnErrorWithStatus(UploadFileErrors.AcceptReg);
                file?.size > maxFileSize && returnErrorWithStatus(UploadFileErrors.Size);
                setFilesData((prevState) => (!prevState ? [file] : [...prevState, file]));
                setIsError(false);
            }
            if (file) {
                const reader = new FileReader();
                const img = new Image();
                reader.onload = (e) => {
                    if (e?.target?.result) img.src = e.target.result as string;
                    console.log(e?.target?.result);
                    reader.readAsDataURL(file);
                };
            }
            file && uploadFileCallBack(file);
            file && getFileCallBack(file);
            file && sendDataToServer(filesData);
        },
        [debugFileData, acceptReg, isStopSizeAndAcceptValidation, maxFileSize, uploadFileCallBack],
    );

    const onDragLeave = (): void => {
        isDrag && setIsDrag(false);
    };

    const onDragOverAndEnterLogic = (e: React.DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        !isDrag && setIsDrag(true);
        isError && setIsError(false);
    };

    return (
        <div
            ref={uploadArea}
            className={`${styles.boundingWrapper} ${className} ${isDrag && styles.isDragOver} ${
                size && `styles.${size}`
            }`}
            onDragEnter={onDragOverAndEnterLogic}
            onDragLeave={onDragLeave}
            onDragOver={onDragOverAndEnterLogic}
            onDrop={uploadFile}
        >
            {isDrag && (
                <span onDragOver={onDragOverAndEnterLogic} className={styles.dropMessage}>
                    {uploadPhraseText ?? 'Отпустите, чтобы загрузить изображение'}
                </span>
            )}
            {
                // Нужно обдумать структуру вывода изображений внутри компонента
                // filesData.map((el) => <img src={el.} alt={el.name}/>)
            }
        </div>
    );
};

export default BoundingArea;
