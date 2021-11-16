import React, { ChangeEvent, FC, useCallback, useRef, useState } from 'react';
import styles from './bounding-area.module.scss';

export enum UploadFileErrors {
    Size,
    AcceptReg,
}

export interface BoundingAreaProps {
    text?: string;
    uploadPhraseText?: string;
    maxFileSize?: number;
    debugFileData?: boolean;
    acceptReg: string;
    isStopSizeAndAcceptValidation?: boolean;
    uploadFileCallBack: (file?: File, error?: UploadFileErrors) => void;
    canvasSize?: number;
}

const BoundingArea: FC<BoundingAreaProps> = ({
    text = '',
    uploadPhraseText,
    maxFileSize = 2097152, //2МБ in bytes
    debugFileData = false,
    isStopSizeAndAcceptValidation = false,
    acceptReg,
    uploadFileCallBack,
    canvasSize = 700,
}) => {
    const uploadArea = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [isDrag, setIsDrag] = useState<boolean>(false);
    const [, setFileData] = useState<File[]>([]);
    const [isError, setIsError] = useState<boolean>(false);

    const stopDefaultLogic = (e: React.DragEvent | React.DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onDragLeave = (): void => {
        isDrag && setIsDrag(false);
    };

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

    const getCvsContext = () => {
        const canvas = canvasRef.current;
        return canvas?.getContext('2d');
    };

    const settingImageWithLogic = (img: HTMLImageElement, ctx: CanvasRenderingContext2D) => {
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
        };
    };

    const uploadFile = useCallback(
        (
            e:
                | (React.DragEvent<HTMLDivElement> & { dataTransfer?: DataTransfer })
                | (ChangeEvent<HTMLInputElement> & { dataTransfer?: DataTransfer }),
        ): void => {
            stopDefaultLogic(e);
            setIsDrag(false);
            const file = returnFileFrom(e);
            if (!isStopSizeAndAcceptValidation && file) {
                !isValid(acceptReg, file) && returnErrorWithStatus(UploadFileErrors.AcceptReg);
                file?.size > maxFileSize && returnErrorWithStatus(UploadFileErrors.Size);
                setFileData((prevState) => (!prevState ? [file] : [...prevState, file]));
                setIsError(false);
            }
            if (canvasRef.current && file) {
                const ctx = getCvsContext();
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target && ctx) {
                        const img = new Image();
                        settingImageWithLogic(img, ctx);
                        if (e.target.result) img.src = e.target.result as string;
                    }
                };
                reader.readAsDataURL(file);
            }
            file && uploadFileCallBack(file);
        },
        [debugFileData, acceptReg, isStopSizeAndAcceptValidation, maxFileSize, uploadFileCallBack],
    );
    const onDragOverAndEnterLogic = (e: React.DragEvent): void => {
        stopDefaultLogic(e);
        !isDrag && setIsDrag(true);
        isError && setIsError(false);
    };
    return (
        <div
            ref={uploadArea}
            className={`${styles.boundingWrapper} ${isDrag && styles.isDragOver}`}
            onDragEnter={onDragOverAndEnterLogic}
            onDragLeave={onDragLeave}
            onDragOver={onDragOverAndEnterLogic}
            onDrop={uploadFile}
        >
            {text && <span className={`${styles.text}`}>{text}</span>}
            {isDrag && (
                <span className={styles.dropMessage}>
                    {uploadPhraseText ?? 'Отпустите, чтобы загрузить изображение'}
                </span>
            )}
            <canvas ref={canvasRef} height={canvasSize} width={canvasSize} />
        </div>
    );
};

export default BoundingArea;
