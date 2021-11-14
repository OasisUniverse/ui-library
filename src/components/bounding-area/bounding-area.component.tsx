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
    isShowErrorLabel?: boolean;
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
    const fileInput = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [isDrag, setIsDrag] = useState<boolean>(false);
    const [, setFileData] = useState<File[]>([]);
    const [isError, setIsError] = useState<boolean>(false);

    const onDragLeave = (): void => {
        isDrag && setIsDrag(false);
    };

    const uploadFile = useCallback(
        (
            e:
                | (React.DragEvent<HTMLDivElement> & { dataTransfer?: DataTransfer })
                | (ChangeEvent<HTMLInputElement> & { dataTransfer?: DataTransfer }),
        ): void => {
            e.preventDefault();
            e.stopPropagation();
            setIsDrag(false);

            const file = (e.target as HTMLInputElement).files
                ? ((e?.target as HTMLInputElement)?.files as FileList)[0]
                : (e?.dataTransfer?.files[0] as File);

            if (file) {
                debugFileData && console.log(file);

                if (!isStopSizeAndAcceptValidation) {
                    if (!acceptReg.split(',').some((reg) => file.type.trim() === reg.trim())) {
                        setIsError(true);
                        uploadFileCallBack(undefined, UploadFileErrors.AcceptReg);
                        return;
                    }

                    if (file?.size > maxFileSize) {
                        setIsError(true);
                        uploadFileCallBack(undefined, UploadFileErrors.Size);
                        return;
                    }
                    if (fileInput.current) {
                        (fileInput.current as HTMLInputElement).value = '';
                    }

                    setFileData((prevState) => {
                        if (!prevState) {
                            return [file];
                        } else {
                            return [...prevState, file];
                        }
                    });
                    setIsError(false);
                }

                // checking canvas ref is exists
                if (canvasRef.current) {
                    // getting canvas
                    const canvas = canvasRef.current;
                    // getting context
                    const ctx = canvas.getContext('2d');
                    // checking file type
                    if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
                        // creating file reader
                        const reader = new FileReader();
                        // uploading images when reader loaded
                        reader.onload = ({ target }) => {
                            // checking event.target and context exists
                            if (target && ctx) {
                                // creating special image for canvas
                                const img = new Image();
                                // drawing image when it's loaded
                                const cvsCenter = canvasSize / 2;
                                img.onload = function () {
                                    if (img.height > canvasSize && img.width > canvasSize) {
                                        ctx.drawImage(img, 0, 0, canvasSize, img.height);
                                    } else if (img.height > canvasSize) {
                                        ctx.drawImage(img, cvsCenter - img.width / 2, 0, img.width, canvasSize);
                                    } else if (img.width > canvasSize) {
                                        ctx.drawImage(img, 0, cvsCenter - img.height / 2, canvasSize, canvasSize);
                                    } else {
                                        ctx.drawImage(
                                            img,
                                            cvsCenter - img.width / 2,
                                            cvsCenter - img.height / 2,
                                            img.width,
                                            img.height,
                                        );
                                    }
                                };
                                // setting image source if result exists
                                if (target.result) img.src = target.result as string;
                            }
                        };
                        // reading file as data url
                        reader.readAsDataURL(file);
                    }
                }

                uploadFileCallBack(file);
            }
        },
        [debugFileData, acceptReg, isStopSizeAndAcceptValidation, maxFileSize, uploadFileCallBack],
    );

    const onDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        event.stopPropagation();
    };

    const onDragEnter = (e: React.DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();

        !isDrag && setIsDrag(true);
        isError && setIsError(false);
    };
    return (
        <div
            ref={uploadArea}
            className={`${styles.boundingWrapper} ${isDrag && styles.isDragOver}`}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
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
