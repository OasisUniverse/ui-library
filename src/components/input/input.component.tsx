import React, { ChangeEvent, FC, useCallback } from 'react';
import { DebounceInput } from 'react-debounce-input';
import InputCrossIcon from 'src/shared/svg/input-cross-icon';
import styles from './input.module.scss';

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
    errorLabel?: string;
    errorLabelPosition?: LabelPosition;
    isResizable?: boolean;
    autofocus?: boolean;
    disabled?: boolean;
    pattern?: string;
    showPassword?: boolean;
    additionalElementsConfig?: JSX.Element[];
}

export const Input: FC<InputProps> = ({
    type = InputType.TextInput,
    onChange,
    label,
    labelPosition = LabelPosition.TopRight,
    errorLabel,
    debounceTimeoutMs,
    className = '',
    isResizable = false,
    autofocus = false,
    value = '',
    placeholder = '',
    autocomplete = false,
    isError = false,
    errorLabelPosition = LabelPosition.BottomRight,
    disabled = false,
    pattern,
    showPassword = false,
    additionalElementsConfig,
    ...props
}: InputProps) => {
    const errorElement = (
        <>
            {isError && errorLabel && (
                <span className={`${styles.errorLabel} ${errorLabelPosition ? styles[errorLabelPosition] : ''}`}>
                    {errorLabel}
                </span>
            )}
        </>
    );

    const labelElement = label && (
        <span className={`${styles.label} ${labelPosition && styles[labelPosition]}`}>{label}</span>
    );

    const additionalElements =
        additionalElementsConfig &&
        additionalElementsConfig.map((el) =>
            additionalElementsConfig.indexOf(el) !== additionalElementsConfig.length ? (
                <>
                    {el}
                    <span className={styles.separationLine}></span>
                </>
            ) : (
                el
            ),
        );

    const clearInput = () => onChange('');

    const crossIcon = value && !disabled && type !== InputType.TextArea && (
        <span className={styles.cross} onClick={clearInput}>
            <InputCrossIcon />
        </span>
    );

    const onChangeCallback = useCallback(
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
        [onChange],
    );

    const inputType = type === InputType.PasswordInput && !showPassword ? INPUT_PASSWORD_TYPE : INPUT_TYPE;

    const inputWrapperClassName = `${type !== InputType.TextArea ? styles.inputWrapper : ''} ${
        type === InputType.SearchInput ? styles.search : ''
    } ${value ? styles.active : ''} ${isError ? styles.error : ''}`;

    const inputClassName =
        type === InputType.TextInput
            ? ''
            : `${value ? styles.active : ''}  ${isError ? styles.error : ''} ${isResizable ? styles.resize : ''}`;
    return (
        <div className={`${styles.wrapper} ${disabled ? styles.disabled : ''} ${className}`}>
            {labelElement}
            {errorElement}
            {type === InputType.TextArea ? (
                <textarea
                    className={`${value && styles.active} ${isError && styles.error} ${isResizable && styles.resize}`}
                    autoComplete={autocomplete ? 'on' : 'off'}
                    placeholder={placeholder}
                    autoFocus={autofocus}
                    value={value}
                    onChange={onChangeCallback}
                />
            ) : (
                <div className={inputWrapperClassName}>
                    <DebounceInput
                        type={inputType}
                        element={'input'}
                        className={inputClassName}
                        disabled={disabled}
                        autoComplete={autocomplete ? 'on' : 'off'}
                        placeholder={placeholder}
                        autoFocus={autofocus}
                        debounceTimeout={debounceTimeoutMs}
                        value={value}
                        onChange={onChangeCallback}
                        pattern={pattern}
                        {...props}
                    />

                    {crossIcon}
                    {additionalElements}
                </div>
            )}
        </div>
    );
};

Input.displayName = 'Input';
