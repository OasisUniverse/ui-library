import React, { FC, ReactSVGElement } from 'react';
import styles from './button.module.scss';

export enum ButtonSizes {
    LargeSize = 'largeSize',
    DefaultSize = 'defaultSize',
}

export enum ButtonStyle {
    DefaultStyle = 'defaultStyle',
    SecondaryStyle = 'secondaryStyle',
    OutlinedStyle = 'outlinedStyle',
}

export interface ButtonProps {
    className?: string;
    size?: ButtonSizes;
    style?: ButtonStyle; // type?
    text?: string;
    onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
    icon?: ReactSVGElement;
    disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
    className,
    size = ButtonSizes.DefaultSize,
    style = ButtonStyle.DefaultStyle,
    text,
    onClick,
    icon,
    disabled = false,
}) => {
    return (
        <button
            className={`${styles.button} ${style ? styles[style] : ''} ${size ? styles[size] : ''} ${
                icon && text ? styles.buttonWithIcon : ''
            } ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && icon}
            {text && <span>{text}</span>}
        </button>
    );
};
