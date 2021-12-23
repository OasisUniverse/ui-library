import React, { FC } from 'react';

const LockIcon: FC<React.SVGProps<SVGSVGElement>> = () => {
    return (
        <svg width='25' height='28' viewBox='0 0 25 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M22.375 12.25H21.0625V8.3125C21.0625 3.72969 17.3328 0 12.75 0C8.16719 0 4.4375 3.72969 4.4375 8.3125V12.25H3.125C1.67578 12.25 0.5 13.4258 0.5 14.875V25.375C0.5 26.8242 1.67578 28 3.125 28H22.375C23.8242 28 25 26.8242 25 25.375V14.875C25 13.4258 23.8242 12.25 22.375 12.25ZM16.6875 12.25H8.8125V8.3125C8.8125 6.14141 10.5789 4.375 12.75 4.375C14.9211 4.375 16.6875 6.14141 16.6875 8.3125V12.25Z'
                fill='#8C8C8C'
            />
        </svg>
    );
};

export default LockIcon;
