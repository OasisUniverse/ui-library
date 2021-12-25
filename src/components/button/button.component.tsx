import React, { FC, useMemo } from 'react';
import styles from './button.module.scss';

export enum ButtonSizes {
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export enum ButtonType {
    Default = 'default',
    Secondary = 'secondary',
    Outlined = 'outlined',
}

export interface ButtonProps {
    className?: string;
    size?: ButtonSizes;
    type?: ButtonType;
    text?: string;
    onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    icon?: JSX.Element;
    reverseItems?: boolean;
    disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
    className = '',
    size = ButtonSizes.Medium,
    type = ButtonType.Default,
    text,
    onClick,
    icon,
    reverseItems = false,
    disabled = false,
}) => {
    const buttonClassName = useMemo(
        () =>
            `${styles.button} ${type ? styles[type] : ''} ${size ? styles[size] : ''} ${
                icon && text ? styles.buttonWithIcon : ''
            } ${reverseItems ? styles.reverseItems : ''} ${className} ${disabled ? styles.disabled : ''}`,
        [type, size, className, disabled, text, icon, reverseItems],
    );
    return (
        <button className={buttonClassName} onClick={onClick} disabled={disabled}>
            {icon && icon}
            {text && text}
        </button>
    );
};
