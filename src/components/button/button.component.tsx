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
        ref,
    ) => {
        const buttonClassName = useMemo(
            () =>
                `${styles.button} ${styles[type]} ${styles[size]} ${icon && text ? styles.buttonWithIcon : ''} ${
                    reverseItems ? styles.reverseItems : ''
                } ${className} ${disabled ? styles.disabled : ''} ${isLoading ? styles.loading : ''}`,
            [type, size, className, disabled, text, icon, reverseItems, isLoading],
        );
        const linkContent = useMemo(
            () =>
                isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {icon}
                        {text}
                    </>
                ),
            [isLoading, icon, text],
        );
        return href ? (
            <a className={buttonClassName} ref={ref as ForwardedRef<HTMLAnchorElement>} href={href} onClick={onClick}>
                {linkContent}
            </a>
        ) : (
            <button
                className={buttonClassName}
                ref={ref as ForwardedRef<HTMLButtonElement>}
                onClick={onClick}
                disabled={disabled}
            >
                {icon}
                {text}
            </button>
        );
    },
);

Button.displayName = 'Button';
