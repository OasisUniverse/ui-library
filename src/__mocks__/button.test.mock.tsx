import React from 'react';
import { ButtonProps, ButtonSizes, ButtonType } from '../components';
import InputCrossIcon from '../shared/svg/input-cross.icon';

export const buttonTestMock: Map<string, ButtonProps> = new Map();

buttonTestMock
    .set('default', {
        text: 'default',
        onClick: () => null,
        disabled: false,
    })
    .set('default-large', {
        size: ButtonSizes.Large,
        type: ButtonType.Default,
        text: 'Default',
        onClick: () => null,
        disabled: false,
    })
    .set('default-small', {
        size: ButtonSizes.Small,
        type: ButtonType.Default,
        icon: <InputCrossIcon />,
        onClick: () => null,
        disabled: false,
    })
    .set('secondary', {
        size: ButtonSizes.Medium,
        type: ButtonType.Secondary,
        text: 'secondary',
        onClick: () => null,
        disabled: false,
    })
    .set('secondary-large', {
        size: ButtonSizes.Large,
        type: ButtonType.Secondary,
        text: 'Secondary',
        onClick: () => null,
        disabled: false,
    })
    .set('secondary-small', {
        size: ButtonSizes.Small,
        type: ButtonType.Secondary,
        icon: <InputCrossIcon />,
        onClick: () => null,
        disabled: false,
    })
    .set('outlined', {
        size: ButtonSizes.Medium,
        type: ButtonType.Outlined,
        text: 'outlined',
        onClick: () => null,
        disabled: false,
    })
    .set('outlined-large', {
        size: ButtonSizes.Large,
        type: ButtonType.Outlined,
        text: 'Outlined',
        onClick: () => null,
        disabled: false,
    })
    .set('outlined-small', {
        size: ButtonSizes.Small,
        type: ButtonType.Outlined,
        icon: <InputCrossIcon />,
        onClick: () => null,
        disabled: false,
    })
    .set('default-disabled', {
        text: 'default',
        onClick: () => null,
        disabled: true,
    })
    .set('secondary-disabled', {
        size: ButtonSizes.Large,
        type: ButtonType.Secondary,
        text: 'secondary',
        onClick: () => null,
        disabled: true,
    })
    .set('outlined-disabled', {
        type: ButtonType.Outlined,
        size: ButtonSizes.Small,
        icon: <InputCrossIcon />,
        onClick: () => null,
        disabled: true,
    })
    .set('icon-and-text', {
        icon: <InputCrossIcon />,
        text: 'some text',
        onClick: () => null,
        disabled: false,
    })
    .set('icon-and-text-reversed', {
        icon: <InputCrossIcon />,
        text: 'some text',
        reverseItems: true,
        onClick: () => null,
        disabled: false,
    });
