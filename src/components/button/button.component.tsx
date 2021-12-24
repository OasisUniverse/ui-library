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
    value?: string;
    onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    icon?: ReactSVGElement;
    reverseItems?: boolean;
    disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
    className,
    size = ButtonSizes.DefaultSize,
    style = ButtonStyle.DefaultStyle,
    value,
    onClick,
    icon,
    reverseItems,
    disabled = false,
}) => {
    return (
        <button
            className={`${styles.button} ${style ? styles[style] : ''} ${size ? styles[size] : ''} ${
                disabled ? styles.disabled : ''
            } ${icon && value ? styles.buttonWithIcon : ''} ${reverseItems ? styles.reverseItems : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && icon}
            {value && <span>{value}</span>}
        </button>
    );
};
