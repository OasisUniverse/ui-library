import { InputProps, InputType, LabelPosition } from '../components';

export const inputTestMockMap: Map<string, InputProps> = new Map();

inputTestMockMap
    .set('label-position', {
        type: InputType.DefaultInput,
        onChange: () => null,
        label: 'text',
        labelPosition: LabelPosition.BottomLeft,
    })
    .set('it-has-autofocus', {
        type: InputType.DefaultInput,
        onChange: () => null,
        autofocus: true,
    })
    .set('it-has-placeholder', {
        type: InputType.DefaultInput,
        onChange: () => null,
        placeholder: 'test',
    })
    .set('it-catches-error', {
        type: InputType.DefaultInput,
        onChange: () => null,
        isError: true,
        disabled: false,
    })
    .set('it-disabled', {
        type: InputType.DefaultInput,
        onChange: () => null,
        disabled: true,
    })
    .set('it-has-cross-icon', {
        type: InputType.DefaultInput,
        onChange: () => null,
        value: 'test',
        disabled: false,
    })
    .set('it-has-active-style', {
        type: InputType.DefaultInput,
        onChange: () => null,
        value: 'test',
        disabled: false,
    })
    .set('it-has-error-style', {
        type: InputType.DefaultInput,
        onChange: () => null,
        isError: true,
    })
    .set('it-resizable', {
        type: InputType.TextArea,
        onChange: () => null,
        isResizable: true,
    })
    .set('textarea-can-be-autocompleted', {
        type: InputType.TextArea,
        onChange: () => null,
        autocomplete: true,
    })
    .set('input-can-be-autocompleted', {
        type: InputType.DefaultInput,
        onChange: () => null,
        autocomplete: true,
    })
    .set('it-render-password-icon', {
        type: InputType.PasswordInput,
        onChange: () => null,
        disabled: false,
        value: 'test',
    });
