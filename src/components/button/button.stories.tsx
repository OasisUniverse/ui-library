import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button, ButtonProps, ButtonSizes, ButtonType } from './button.component';
import { buttonTestMock } from '../../__mocks__/button.test.mock';

export default {
    title: 'Button',
    component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args: ButtonProps) => <Button {...args} />;

export const Initial = Template.bind({});

Initial.args = {
    text: 'Text',
    size: ButtonSizes.Medium,
    type: ButtonType.Default,
    onClick: () => null,
};

const presentationStyle = {
    width: 'auto',
    background: '#1a1a22',
    padding: '50px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'auto',
    gap: '50px',
};

export const Presentation = (): JSX.Element => (
    <div style={presentationStyle}>
        {Array.from(buttonTestMock, ([, props]) => (
            <Button {...props} />
        ))}
    </div>
);
