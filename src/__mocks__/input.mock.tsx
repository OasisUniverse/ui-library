import { InputProps, InputType, LabelPosition } from '../components';

export const defaultInputProps: InputProps[] = [
    {
        value: '',
        onChange: (): void => {
            return;
        },

        label: 'Label',
        labelPosition: LabelPosition.BottomRight,
        placeholder: 'Введите текст',
        autocomplete: true,
    },
    {
        type: InputType.PasswordInput,
        value: '',
        onChange: (): void => {
            return;
        },
        label: 'Label',
        labelPosition: LabelPosition.TopRight,
        placeholder: 'Введите пароль',
        autocomplete: true,
    },
    {
        type: InputType.PasswordInput,
        value: '',
        onChange: (): void => {
            return;
        },
        label: 'some value',
        labelPosition: LabelPosition.BottomLeft,
        placeholder: 'Введите пароль',
        autocomplete: true,
    },
    {
        type: InputType.PasswordInput,
        value: '',
        onChange: (): void => {
            return;
        },
        label: 'Возмущение c кнопкой',
        labelPosition: LabelPosition.TopRight,
        placeholder: 'Введите пароль',
        autocomplete: true,
    },
    {
        type: InputType.PasswordInput,
        value: '',
        onChange: (): void => {
            return;
        },
        isError: true,
        label: 'Label',
        labelPosition: LabelPosition.TopLeft,
        placeholder: 'Введите пароль',
        autocomplete: true,
    },
    {
        type: InputType.PasswordInput,
        value: 'password',
        onChange: (): void => {
            return;
        },
        label: 'Label',
        labelPosition: LabelPosition.BottomRight,
        placeholder: 'Новый пароль',
        autocomplete: true,
    },
    {
        value: '',
        onChange: (): void => {
            return;
        },

        label: 'Label',
        labelPosition: LabelPosition.BottomRight,
        placeholder: 'Введите текст',
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
        autocomplete: true,
    },
    {
        value: 'Какой-то текст...',
        onChange: (): void => {
            return;
        },

        placeholder: 'Введите текст...',
        isError: true,
        labelPosition: LabelPosition.TopLeft,
    },
    {
        onChange: (): void => {
            return;
        },

        placeholder: 'Введите текст...',
        isError: true,
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
