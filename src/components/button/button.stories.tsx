import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button, ButtonProps, ButtonSizes, ButtonStyle } from './button.component';
import { buttonTestMock } from '../../__mocks__/button.test.mock';

export default {
    title: 'Button',
    component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args: ButtonProps) => <Button {...args} />;

export const Initial = Template.bind({});

Initial.args = {
    value: 'Text',
    size: ButtonSizes.DefaultSize,
    style: ButtonStyle.DefaultStyle,
    onClick: () => null,
};

const presentationStyle = {
    width: 'auto',
    background: '#1a1a22',
    padding: '50px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'auto',
    gap: '50px',
};

export const Presentation = (): JSX.Element => (
    <div style={presentationStyle}>
        {Array.from(buttonTestMock, ([key, props]) => (
            <Button key={key} {...props} />
        ))}
    </div>
);
