import React, { FC, ForwardedRef, forwardRef, MouseEvent, useMemo } from 'react';
import styles from './button.module.scss';
import LoadingSpinner from '../../shared/svg/loading-spinner.icon';

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
    onClick: (event?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    icon?: JSX.Element;
    isLoading?: boolean;
    reverseItems?: boolean;
    disabled?: boolean;
}

export const Button: FC<ButtonProps> = forwardRef(
    (
        {
            className = '',
            size = ButtonSizes.Medium,
            type = ButtonType.Default,
            text,
            onClick,
            icon,
            href,
            isLoading,
            reverseItems = false,
            disabled = false,
        },
        forwardRef,
    ) => {
        const buttonClassName = useMemo(
            () =>
                `${styles.button} ${type ? styles[type] : ''} ${size ? styles[size] : ''} ${
                    icon && text ? styles.buttonWithIcon : ''
                } ${reverseItems ? styles.reverseItems : ''} ${className} ${disabled ? styles.disabled : ''} ${
                    isLoading ? styles.loading : ''
                }`,
            [type, size, className, disabled, text, icon, reverseItems, isLoading],
        );
        return href ? (
            <a
                className={buttonClassName}
                ref={forwardRef as ForwardedRef<HTMLAnchorElement>}
                href={href}
                onClick={onClick}
            >
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {icon && icon}
                        {text && text}
                    </>
                )}
            </a>
        ) : (
            <button
                className={buttonClassName}
                ref={forwardRef as ForwardedRef<HTMLButtonElement>}
                onClick={onClick}
                disabled={disabled}
            >
                {icon && icon}
                {text && text}
            </button>
        );
    },
);

Button.displayName = 'Button';
