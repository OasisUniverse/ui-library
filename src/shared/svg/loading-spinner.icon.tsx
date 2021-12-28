import React, { FC, SVGProps } from 'react';

const LoadingSpinner: FC<SVGProps<SVGSVGElement>> = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            style={{ margin: 'auto', background: 'transparent', display: 'block', shapeRendering: 'auto' }}
            width='200px'
            height='200px'
            viewBox='0 0 100 100'
            preserveAspectRatio='xMidYMid'
        >
            <circle
                cx='50'
                cy='50'
                r='42'
                strokeWidth='7'
                stroke='#0eb56f'
                strokeDasharray='65.97344572538566 65.97344572538566'
                fill='none'
                strokeLinecap='round'
            >
                <animateTransform
                    attributeName='transform'
                    type='rotate'
                    repeatCount='indefinite'
                    dur='0.66s'
                    keyTimes='0;1'
                    values='0 50 50;360 50 50'
                />
            </circle>
        </svg>
    );
};

export default LoadingSpinner;
