import React, { FC, forwardRef, useMemo } from 'react';
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
    text?: string;
    href?: string;
    size?: ButtonSizes;
    type?: ButtonType;
    onClick: (event?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    icon?: JSX.Element;
    isLink?: boolean;
    reverseItems?: boolean;
    disabled?: boolean;
}

export const Button: FC<ButtonProps> = forwardRef(
    ({
        className = '',
        size = ButtonSizes.Medium,
        type = ButtonType.Default,
        text,
        onClick,
        icon,
        href,
        isLink = false,
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
        return isLink ? (
            <a className={buttonClassName} href={href} onClick={onClick}>
                {icon && icon}
                {text && text}
            </a>
        ) : (
            <button className={buttonClassName} onClick={onClick} disabled={disabled}>
                {icon && icon}
                {text && text}
            </button>
        );
    },
);

Button.displayName = 'Button';
