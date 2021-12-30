import { InputProps, InputType, LabelPosition } from '../components';

export const inputTestMockMap: Map<string, InputProps> = new Map();

inputTestMockMap
    .set('label-position', {
        type: InputType.DefaultInput,
        onChange: () => {
            return;
        },
        label: 'text',
        labelPosition: LabelPosition.BottomLeft,
    })
    .set('it-has-autofocus', {
        type: InputType.DefaultInput,
        onChange: () => {
            return;
        },
        autofocus: true,
    })
    .set('it-has-placeholder', {
        type: InputType.DefaultInput,
        onChange: () => {
            return;
        },
        placeholder: 'test',
    })
    .set('it-catches-error', {
        type: InputType.DefaultInput,
        onChange: () => {
            return;
        },
        isError: true,
        disabled: false,
    })
    .set('it-disabled', {
        type: InputType.DefaultInput,
        onChange: () => {
            return;
        },
        disabled: true,
    })
    .set('it-has-cross-icon', {
        type: InputType.DefaultInput,
        onChange: () => {
            return;
        },
        value: 'test',
        disabled: false,
    })
    .set('it-has-active-style', {
        type: InputType.DefaultInput,
        onChange: () => {
            return;
        },
        value: 'test',
        disabled: false,
    })
    .set('it-has-error-style', {
        type: InputType.DefaultInput,
        onChange: () => {
            return;
        },
        isError: true,
    })
    .set('it-resizable', {
        type: InputType.TextArea,
        onChange: () => {
            return;
        },
        isResizable: true,
    })
    .set('textarea-can-be-autocompleted', {
        type: InputType.TextArea,
        onChange: () => {
            return;
        },
        autocomplete: true,
    })
    .set('input-can-be-autocompleted', {
        type: InputType.DefaultInput,
        onChange: () => {
            return;
        },
        autocomplete: true,
    })
    .set('it-render-password-icon', {
        type: InputType.PasswordInput,
        onChange: () => {
            return;
        },
        disabled: false,
        value: 'test',
    })
    .set('label-on-bottom-right', {
        value: '',
        onChange: () => {
            return;
        },
        label: 'Label',
        labelPosition: LabelPosition.BottomRight,
        placeholder: 'Введите текст',
        autocomplete: true,
    })
    .set('password-with-label', {
        type: InputType.PasswordInput,
        value: '',
        onChange: () => {
            return;
        },
        label: 'Label',
        labelPosition: LabelPosition.TopRight,
        placeholder: 'Введите пароль',
        autocomplete: true,
    })
    .set('password-with-labelTR', {
        type: InputType.PasswordInput,
        value: '',
        onChange: () => {
            return;
        },
        label: 'Label',
        labelPosition: LabelPosition.TopRight,
        placeholder: 'Введите пароль',
        autocomplete: true,
    })
    .set('password-with-labelBL', {
        type: InputType.PasswordInput,
        value: '',
        onChange: () => {
            return;
        },
        label: 'Label',
        labelPosition: LabelPosition.BottomLeft,
        placeholder: 'Введите пароль',
        autocomplete: true,
    })
    .set('password-with-error', {
        type: InputType.PasswordInput,
        value: '',
        onChange: () => {
            return;
        },
        isError: true,
        label: 'Label',
        labelPosition: LabelPosition.TopLeft,
        placeholder: 'Введите пароль',
        autocomplete: true,
    })
    .set('password-with-value', {
        type: InputType.PasswordInput,
        value: 'password',
        onChange: () => {
            return;
        },
        label: 'Label',
        labelPosition: LabelPosition.BottomRight,
        placeholder: 'Новый пароль',
        autocomplete: true,
    })
    .set('default-with-placeholder', {
        value: '',
        onChange: () => {
            return;
        },
        label: 'Label',
        labelPosition: LabelPosition.BottomRight,
        placeholder: 'Введите текст',
        autocomplete: true,
    })
    .set('default-with-long-value', {
        value: '',
        onChange: () => {
            return;
        },
        placeholder: 'Введите текст...////////////////////////////////',
        label: 'Заголовок',
        labelPosition: LabelPosition.TopRight,
        autocomplete: false,
    })
    .set('default-with-longer-value', {
        value: 'Какой-то текст...///////////////////////////////////////////////////////////////////',
        onChange: () => {
            return;
        },
        label: 'Напишите комментарий:',
        labelPosition: LabelPosition.TopLeft,
        placeholder: 'Введите текст...',
        autocomplete: true,
    })
    .set('default-with-error-and-value', {
        value: 'Какой-то текст...',
        onChange: () => {
            return;
        },
        placeholder: 'Введите текст...',
        isError: true,
    })
    .set('default-with-error-and-value', {
        value: 'Какой-то текст...',
        onChange: () => {
            return;
        },
        placeholder: 'Введите текст...',
        isError: true,
    })
    .set('search-input', {
        type: InputType.SearchInput,
        value: '',
        onChange: () => {
            return;
        },
        placeholder: 'looking for something?',
        autocomplete: true,
    })
    .set('search-input-with-label', {
        type: InputType.SearchInput,
        value: '',
        onChange: () => {
            return;
        },
        placeholder: 'Введите текст...',
        label: 'Введите запрос:',
        labelPosition: LabelPosition.TopLeft,
        autocomplete: false,
    })
    .set('search-input-with-value', {
        type: InputType.SearchInput,
        value: 'how to...',
        onChange: () => {
            return;
        },
        placeholder: 'Введите текст...',
    })
    .set('search-input-with-value', {
        type: InputType.SearchInput,
        value: 'how to...',
        onChange: () => {
            return;
        },
        placeholder: 'Введите текст...',
    })
    .set('search-input-with-debounce-300ms', {
        type: InputType.SearchInput,
        value: '',
        onChange: () => {
            return;
        },
        autocomplete: true,
        placeholder: 'Введите текст...',
        debounceTimeoutMs: 300,
    })
    .set('textarea-default-state', {
        type: InputType.TextArea,
        value: '',
        onChange: () => {
            return;
        },
        placeholder: 'Введите текст...',
        autocomplete: true,
    })
    .set('textarea-with-label', {
        type: InputType.TextArea,
        value: '',
        onChange: () => {
            return;
        },
        label: 'Заголовок',
        autocomplete: false,
    })
    .set('textarea-with-large=text', {
        type: InputType.TextArea,
        value: 'Going to the calm mind doesn’t gain living anymore than inventing creates playful meditation. One unprepared moonlight i give you: trap each other. Man, paradox and an abstruse inward mind. Zen doesn’t sincerely absorb any doer — but the source is what contacts. As i have discovered you, so you must emerge one another. The meditation is a psychic monkey. Shangri-la is not the holographic density of the wind. Who can acquire the affirmation and attitude of a lotus if he has the one core of the individual.',
        onChange: () => {
            return;
        },
        placeholder: 'Введите текст...',
        isResizable: true,
    })
    .set('textarea-resizable-and-error', {
        type: InputType.TextArea,
        value: 'Lorem ipsum',
        onChange: () => {
            return;
        },
        placeholder: 'Введите текст...',
        isError: true,
        isResizable: true,
        autocomplete: false,
    })
    .set('textarea-resizable', {
        type: InputType.TextArea,
        value: 'Какой-то текст...',
        onChange: () => {
            return;
        },
        placeholder: 'Введите текст...',
        isResizable: true,
    });
