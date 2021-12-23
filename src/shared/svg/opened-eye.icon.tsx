import React, { FC } from 'react';

const OpenedEyeIcon: FC<React.SVGProps<SVGSVGElement>> = () => {
    return (
        <svg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M21 8C21 8 16.5228 15 11 15C5.47715 15 1 8 1 8C1 8 5.47715 1 11 1C16.5228 1 21 8 21 8Z'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <circle cx='11' cy='8' r='4' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
};

export default OpenedEyeIcon;
