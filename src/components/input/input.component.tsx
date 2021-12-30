import React, { ChangeEvent, FC, ForwardedRef, forwardRef, useCallback, useMemo, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import InputCrossIcon from 'src/shared/svg/input-cross.icon';
import styles from './input.module.scss';
import ClosedEyeIcon from '../../shared/svg/closed-eye.icon';
import OpenedEyeIcon from '../../shared/svg/opened-eye.icon';
import LockIcon from '../../shared/svg/lock.icon';

const INPUT_TYPE = 'text';
const INPUT_PASSWORD_TYPE = 'password';

export enum InputType {
    DefaultInput,
    PasswordInput,
    SearchInput,
    TextArea,
}

export enum LabelPosition {
    TopLeft = 'topLeft',
    TopRight = 'topRight',
    BottomLeft = 'bottomLeft',
    BottomRight = 'bottomRight',
}

export interface InputProps {
    value?: string;
    onChange: (value: string, event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: InputType;
    placeholder?: string;
    autocomplete?: boolean;
    className?: string;
    debounceTimeoutMs?: number;
    isError?: boolean;
    label?: string;
    labelPosition?: LabelPosition;
    isResizable?: boolean;
    autofocus?: boolean;
    disabled?: boolean;
}

export const Input: FC<InputProps> = forwardRef(
    (
        {
            type = InputType.DefaultInput,
            onChange,
            label,
            labelPosition = LabelPosition.TopRight,
            debounceTimeoutMs,
            className = '',
            isResizable = false,
            autofocus = false,
            value = '',
            placeholder = '',
            autocomplete = false,
            isError = false,
            disabled = false,
        },
        forwardRef,
    ) => {
        const [isDisplayPassword, setDisplayPassword] = useState<boolean>(false);
        const isRenderPasswordIcon = useMemo(
            () => type === InputType.PasswordInput && !disabled && value,
            [type, disabled, value],
        );
        const displayPasswordHandler = () => setDisplayPassword(true);
        const hidingPasswordHandler = () => setDisplayPassword(false);

        const labelElement = label && (
            <span className={`${styles.label} ${labelPosition && styles[labelPosition]}`}>{label}</span>
        );

        const clearInput = () => onChange('');

        const onChangeCallback = useCallback(
            (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value, event),
            [onChange],
        );

        const isRenderCrossIcon = useMemo(
            () => value && !disabled && type !== InputType.TextArea && type !== InputType.PasswordInput,
            [type, value, disabled],
        );
        const crossIcon = isRenderCrossIcon && (
            <span className={styles.cross} onClick={clearInput}>
                <InputCrossIcon />
            </span>
        );

        const isActiveStyle = useMemo(() => (value && !disabled ? styles.active : ''), [value, disabled]);
        const isErrorStyle = useMemo(() => (isError && !disabled ? styles.error : ''), [isError, disabled]);
        const isDisabled = useMemo(() => (disabled ? styles.disabled : ''), [disabled]);
        const isResizableStyle = useMemo(() => (isResizable ? styles.resize : ''), [isResizable]);

        const inputWrapperClassName = useMemo(
            () =>
                `${type !== InputType.TextArea ? styles.inputWrapper : ''} ${
                    type === InputType.SearchInput ? styles.searchWrapper : ''
                } ${value ? isActiveStyle : ''} ${isError ? isErrorStyle : ''} ${isDisabled}`,
            [type, value, isError],
        );
        return (
            <div className={`${styles.wrapper} ${className}`}>
                {labelElement}
                {type === InputType.TextArea ? (
                    <textarea
                        className={`${isActiveStyle} ${isDisabled} ${isErrorStyle} ${isResizableStyle}`}
                        autoComplete={autocomplete ? 'on' : 'off'}
                        placeholder={placeholder}
                        ref={forwardRef as ForwardedRef<HTMLTextAreaElement>}
                        autoFocus={autofocus}
                        value={value}
                        onChange={onChangeCallback}
                    />
                ) : (
                    <div className={inputWrapperClassName}>
                        <DebounceInput
                            type={
                                type === InputType.PasswordInput && !isDisplayPassword
                                    ? INPUT_PASSWORD_TYPE
                                    : INPUT_TYPE
                            }
                            ref={forwardRef as ForwardedRef<DebounceInput<HTMLInputElement>>}
                            disabled={disabled}
                            autoComplete={autocomplete ? 'on' : 'off'}
                            placeholder={placeholder}
                            autoFocus={autofocus}
                            debounceTimeout={debounceTimeoutMs}
                            value={value}
                            onChange={onChangeCallback}
                        />
                        {disabled && <LockIcon />}
                        {crossIcon}
                        {isRenderPasswordIcon && (
                            <span
                                className={styles.passwordDisplayButton}
                                onPointerDown={displayPasswordHandler}
                                onPointerUp={hidingPasswordHandler}
                            >
                                {isDisplayPassword ? <OpenedEyeIcon /> : <ClosedEyeIcon />}
                            </span>
                        )}
                    </div>
                )}
            </div>
        );
    },
);

Input.displayName = 'Input';
