import { ButtonProps, ButtonSizes, ButtonStyle } from '../components';

export const buttonTestMock: Map<string, ButtonProps> = new Map();

buttonTestMock
    .set('default', {
        size: ButtonSizes.DefaultSize,
        style: ButtonStyle.DefaultStyle,
        value: 'default',
        onClick: () => null,
        disabled: false,
    })
    .set('default-large', {
        size: ButtonSizes.LargeSize,
        style: ButtonStyle.DefaultStyle,
        value: 'Default',
        onClick: () => null,
        disabled: false,
    })
    .set('secondary', {
        size: ButtonSizes.DefaultSize,
        style: ButtonStyle.SecondaryStyle,
        value: 'secondary',
        onClick: () => null,
        disabled: false,
    })
    .set('secondary-large', {
        size: ButtonSizes.LargeSize,
        style: ButtonStyle.SecondaryStyle,
        value: 'Secondary',
        onClick: () => null,
        disabled: false,
    })
    .set('outlined', {
        size: ButtonSizes.DefaultSize,
        style: ButtonStyle.OutlinedStyle,
        value: 'outlined',
        onClick: () => null,
        disabled: false,
    })
    .set('outlined-large', {
        size: ButtonSizes.LargeSize,
        style: ButtonStyle.OutlinedStyle,
        value: 'Outlined',
        onClick: () => null,
        disabled: false,
    })
    .set('default-disabled', {
        size: ButtonSizes.DefaultSize,
        style: ButtonStyle.DefaultStyle,
        value: 'default',
        onClick: () => null,
        disabled: true,
    })
    .set('secondary-disabled', {
        size: ButtonSizes.DefaultSize,
        style: ButtonStyle.SecondaryStyle,
        value: 'secondary',
        onClick: () => null,
        disabled: true,
    })
    .set('outlined-disabled', {
        size: ButtonSizes.DefaultSize,
        style: ButtonStyle.OutlinedStyle,
        value: 'outlined',
        onClick: () => null,
        disabled: true,
    });
