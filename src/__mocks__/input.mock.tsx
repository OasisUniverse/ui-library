import React from 'react';
import { Button } from 'src/components/button/button.component';
import { InputProps, InputType, LabelPosition } from '../components';

export const defaultInputProps: InputProps[] = [
    {
        value: '',
        onChange: (): void => {
            return;
        },

        label: 'Случайная подсказка',
        labelPosition: LabelPosition.BottomRight,
        placeholder: 'Введите текст...',
        autocomplete: true,
    },
    {
        type: InputType.PasswordInput,
        value: '',
        onChange: (): void => {
            return;
        },
        additionalElementsConfig: [
            <Button key={Math.random()} text={'Забыли?'} onClick={(e) => console.log('pressed!', e.currentTarget)} />,
        ],
        label: 'Стрелочка и кнопочка',
        labelPosition: LabelPosition.TopRight,
        placeholder: 'Пароль',
        autocomplete: true,
    },
    {
        type: InputType.PasswordInput,
        value: '',
        onChange: (): void => {
            return;
        },
        additionalElementsConfig: [
            <Button key={Math.random()} text={'Забыли?'} onClick={(e) => console.log('pressed!', e.currentTarget)} />,
        ],
        label: 'some text',
        labelPosition: LabelPosition.BottomLeft,
        placeholder: 'Пароль',
        autocomplete: true,
    },
    {
        type: InputType.PasswordInput,
        value: '',
        onChange: (): void => {
            return;
        },
        additionalElementsConfig: [
            <Button key={Math.random()} text={'Забыли?'} onClick={(e) => console.log('pressed!', e.currentTarget)} />,
        ],
        label: 'Возмущение c кнопкой',
        labelPosition: LabelPosition.TopRight,
        placeholder: 'Пароль',
        autocomplete: true,
    },
    {
        type: InputType.PasswordInput,
        value: '',
        onChange: (): void => {
            return;
        },
        additionalElementsConfig: [
            <Button key={Math.random()} text={'Забыли?'} onClick={(e) => console.log('pressed!', e.currentTarget)} />,
        ],
        isError: true,
        label: 'Стрелочка и кнопочка !',
        labelPosition: LabelPosition.TopLeft,
        errorLabel: 'Неверный логин или пароль',
        errorLabelPosition: LabelPosition.BottomRight,
        placeholder: 'Пароль',
        autocomplete: true,
    },
    {
        type: InputType.PasswordInput,
        value: 'password',
        onChange: (): void => {
            return;
        },
        additionalElementsConfig: [
            <Button key={Math.random()} text={'Забыли?'} onClick={(e) => console.log('pressed!', e.currentTarget)} />,
        ],
        label: 'Кнопочка',
        labelPosition: LabelPosition.BottomRight,
        placeholder: 'Новый пароль',
        autocomplete: true,
    },
    {
        value: '',
        onChange: (): void => {
            return;
        },

        label: 'Вторичная кнопка',
        labelPosition: LabelPosition.BottomRight,
        placeholder: 'Введите текст...',
        autocomplete: true,
    },
    {
        value: '',
        onChange: (): void => {
            return;
        },

        placeholder: 'Введите текст...////////////////////////////////',
        label: 'Заголовок',
        labelPosition: LabelPosition.TopRight,
        autocomplete: false,
    },
    {
        value: 'Какой-то текст...///////////////////////////////////////////////////////////////////',
        onChange: (): void => {
            return;
        },

        label: 'Напишите комментарий:',
        labelPosition: LabelPosition.TopLeft,
        placeholder: 'Введите текст...',
        autocomplete: true,
    },
    {
        value: 'Какой-то текст...',
        onChange: (): void => {
            return;
        },

        placeholder: 'Введите текст...',
        isError: true,
    },
    {
        value: 'Какой-то текст...',
        onChange: (): void => {
            return;
        },

        placeholder: 'Введите текст...',
        className: 'hello',
        isError: true,
        errorLabel: 'Заполните поле',
        errorLabelPosition: LabelPosition.BottomRight,
        autocomplete: true,
    },
    {
        value: 'Какой-то текст...',
        onChange: (): void => {
            return;
        },

        placeholder: 'Введите текст...',
        isError: true,
        errorLabel: 'Любой текст',
        labelPosition: LabelPosition.TopLeft,
    },
    {
        onChange: (): void => {
            return;
        },

        placeholder: 'Введите текст...',
        isError: true,
        errorLabel: 'Любой текст',
    },
    {
        value: 'hello',
        onChange: (): void => {
            return;
        },

        placeholder: 'Введите текст...',
    },
];
export const searchInputProps: InputProps[] = [
    {
        type: InputType.SearchInput,
        value: '',
        onChange: (): void => {
            return;
        },
        placeholder: 'Input without debounce...',
        autocomplete: true,
    },
    {
        type: InputType.SearchInput,
        value: '',
        onChange: (): void => {
            return;
        },

        placeholder: 'Введите текст...',
        label: 'Введите запрос:',
        labelPosition: LabelPosition.TopLeft,
        autocomplete: false,
    },
    {
        type: InputType.SearchInput,
        value: 'Input without debounce timeout',
        onChange: (): void => {
            return;
        },

        placeholder: 'Введите текст...',
    },
    {
        type: InputType.SearchInput,
        value: '',
        onChange: (): void => {
            return;
        },
        autocomplete: false,
        placeholder: 'Debounce input-1',
        debounceTimeoutMs: 300,
    },
    {
        type: InputType.SearchInput,
        value: '',
        onChange: (): void => {
            return;
        },
        autocomplete: true,
        placeholder: 'Введите текст...',
        debounceTimeoutMs: 300,
    },
];
export const textInputProps: InputProps[] = [
    {
        type: InputType.TextArea,
        value: '',
        onChange: (): void => {
            return;
        },

        placeholder: 'Введите текст...',
        autocomplete: true,
    },
    {
        type: InputType.TextArea,
        value: '',
        onChange: (): void => {
            return;
        },
        autocomplete: false,
    },
    {
        type: InputType.TextArea,
        value: '',
        onChange: (): void => {
            return;
        },

        placeholder: 'Введите текст...',
        label: 'Заголовок',
    },
    {
        type: InputType.TextArea,
        value: '',
        onChange: (): void => {
            return;
        },

        label: 'Заголовок',
        autocomplete: false,
    },
    {
        type: InputType.TextArea,
        value: 'Going to the calm mind doesn’t gain living anymore than inventing creates playful meditation. One unprepared moonlight i give you: trap each other. Man, paradox and an abstruse inward mind. Zen doesn’t sincerely absorb any doer — but the source is what contacts. As i have discovered you, so you must emerge one another. The meditation is a psychic monkey. Shangri-la is not the holographic density of the wind. Who can acquire the affirmation and attitude of a lotus if he has the one core of the individual.',
        onChange: (): void => {
            return;
        },

        placeholder: 'Введите текст...',
        isResizable: true,
    },
    {
        type: InputType.TextArea,
        value: 'Lorem ipsum',
        onChange: (): void => {
            return;
        },

        placeholder: 'Введите текст...',
        isError: true,
        isResizable: true,
        autocomplete: false,
    },
    {
        type: InputType.TextArea,
        value: 'Какой-то текст...',
        onChange: (): void => {
            return;
        },

        placeholder: 'Введите текст...',
        isResizable: true,
    },
];
