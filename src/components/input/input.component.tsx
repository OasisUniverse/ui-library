import React, { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import InputCrossIcon from 'src/shared/svg/input-cross-icon';
import styles from './input.module.scss';
import ClosedEyeIcon from '../../shared/svg/closed-eye-icon';
import OpenedEyeIcon from '../../shared/svg/opened-eye-icon';
import LockIcon from '../../shared/svg/lock-icon';

const INPUT_TYPE = 'text';
const INPUT_PASSWORD_TYPE = 'password';

export enum InputType {
    TextInput,
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

export const Input: FC<InputProps> = ({
    type = InputType.TextInput,
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
}: InputProps) => {
    const isRenderDisplayPasswordIcon = useMemo(
        () => type === InputType.PasswordInput && !disabled && value,
        [type, disabled, value],
    );
    const [isDisplayPassword, setDisplayPassword] = useState<boolean>(false);
    const displayPasswordHandler = () => {
        setDisplayPassword(true);
    };
    const hidingPasswordHandler = () => {
        setDisplayPassword(false);
    };

    const labelElement = label && (
        <span className={`${styles.label} ${labelPosition && styles[labelPosition]}`}>{label}</span>
    );

    const clearInput = () => onChange('');

    const isRenderCrossIcon = useMemo(() => {
        return value && !disabled && type !== InputType.TextArea && type !== InputType.PasswordInput;
    }, [type, value, disabled]);

    const crossIcon = isRenderCrossIcon && (
        <span className={styles.cross} onClick={clearInput}>
            <InputCrossIcon />
        </span>
    );

    const isActiveStyle = useMemo(() => value && !disabled && styles.active, [value, disabled]);

    const isErrorStyle = useMemo(() => isError && !disabled && styles.error, [isError, disabled]);

    const onChangeCallback = useCallback(
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
        [onChange],
    );

    const inputWrapperClassName = `${disabled ? styles.disabled : ''} ${disabled ? styles.disabled : ''} ${
        type !== InputType.TextArea ? styles.inputWrapper : ''
    } ${type === InputType.SearchInput ? styles.search : ''} ${value ? isActiveStyle : ''} ${
        isError ? isErrorStyle : ''
    }`;
    return (
        <div className={`${styles.wrapper} ${className}`}>
            {labelElement}
            {type === InputType.TextArea ? (
                <textarea
                    className={`${isActiveStyle} ${disabled ? styles.disabled : ''} ${isErrorStyle} ${
                        isResizable && styles.resize
                    }`}
                    autoComplete={autocomplete ? 'on' : 'off'}
                    placeholder={placeholder}
                    autoFocus={autofocus}
                    value={value}
                    onChange={onChangeCallback}
                />
            ) : (
                <div className={inputWrapperClassName}>
                    <DebounceInput
                        type={type === InputType.PasswordInput && !isDisplayPassword ? INPUT_PASSWORD_TYPE : INPUT_TYPE}
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
                    {isRenderDisplayPasswordIcon && (
                        <span
                            className={`${styles.passwordDisplayButton}`}
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
};
