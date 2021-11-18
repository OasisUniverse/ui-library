import { BoundingAreaProps, Sizes } from '../components';
import { useCallback } from 'react';
import pick1 from '../assets/temporary-images/pick0.jpg';
import pick2 from '../assets/temporary-images/pick1.png';
import pick3 from '../assets/temporary-images/pick2.png';

export const temporaryData: BoundingAreaProps[] = [
    {
        size: Sizes.Normal,
        acceptReg: 'image/png, image/jpeg',
        uploadFileCallBack: () => undefined,
        debugFileData: true,
        sendDataToServer: useCallback((data: File[]) => console.log(data), []),
        getFileCallBack: useCallback((data: File) => console.log(data), []),
        data: [pick1, pick2, pick3],
    },
];
