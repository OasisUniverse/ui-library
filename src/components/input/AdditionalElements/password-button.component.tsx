import React, { FC, ReactSVGElement } from 'react';

export interface PasswordButtonProps {
    className: string;
    onClick: () => void;
    icon: ReactSVGElement;
}

export const PasswordButton: FC<PasswordButtonProps> = ({ className, onClick, icon }) => {
    return (
        <span className={className} onClick={onClick}>
            {icon}
        </span>
    );
};
