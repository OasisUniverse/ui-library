import React, { ChangeEvent, FC, useCallback, useRef, useState } from 'react';
import styles from './bounding-area.module.scss';
import { Config } from '../../interfaces';

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
    config: Config[];
}

const BoundingArea: FC<BoundingAreaProps> = ({
    className,
    boundingAreaSize = 'normal',
    uploadPhraseText,
    maxFileSize = 2097152, //2МБ in bytes
    debugFileData = false,
    acceptReg,
    uploadFileCallBack,
}) => {
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
            const formData = new FormData();
            formData.append('image', file);
            console.log(file);
            debugFileData && console.log(file);
            if (file) {
                !isValid(acceptReg, file) && returnErrorWithStatus(UploadFileErrors.AcceptReg);
                file?.size > maxFileSize && returnErrorWithStatus(UploadFileErrors.Size);
                setIsError(false);
                const reader = new FileReader();
                const img = new Image();
                reader.onload = (e) => {
                    if (e?.target?.result) img.src = e.target.result as string;
                    console.log(e?.target?.result);
                    reader.readAsDataURL(file);
                };
            }
            file &&
                uploadFileCallBack({
                    data: formData,
                    fileName: file.name,
                    extension: file.type,
                    date: new Date(Date.now()),
                });
        },
        [debugFileData, acceptReg, maxFileSize, uploadFileCallBack],
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
