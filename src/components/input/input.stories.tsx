import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Input, InputProps } from './input.component';
import { defaultInputProps, searchInputProps, textInputProps } from '../../__mocks__/input.mock';

export default {
    title: 'Input',
    component: Input,
} as Meta;

const Template: Story<InputProps> = (args: InputProps) => <Input {...args} />;

export const EventType = Template.bind({});

export const Presentation = (): JSX.Element => (
    <div style={{ background: '#1a1a22', padding: '50px' }}>
        <span style={{ fontSize: '30px', marginBottom: '15px', color: 'white' }}>Input</span>
        <div
            style={{
                boxSizing: 'border-box',
                display: 'grid',
                gridTemplateRows: 'auto',
                gridTemplateColumns: '1fr 1fr',
                gridGap: '20px',
            }}
        >
            {defaultInputProps.map((args, index) => (
                <div style={{ marginBottom: '25px', boxSizing: 'border-box' }} key={index}>
                    <Input {...args} />
                </div>
            ))}
        </div>
        <span style={{ fontSize: '30px', marginBottom: '15px' }}>SearchInput</span>
        <div
            style={{
                boxSizing: 'border-box',
                display: 'grid',
                gridTemplateRows: 'auto',
                gridTemplateColumns: '1fr 1fr',
                gridGap: '20px',
            }}
        >
            {searchInputProps.map((args, index) => (
                <div style={{ marginTop: '12.5px', marginBottom: '12.5px' }} key={index}>
                    <Input {...args} />
                </div>
            ))}
        </div>
        <span style={{ fontSize: '30px' }}>TextArea</span>
        <div
            style={{
                width: '100%',
                boxSizing: 'border-box',
                marginLeft: '-20px',
                display: 'grid',
                gridTemplateRows: 'auto',
                gridTemplateColumns: '1fr 1fr',
                gridGap: '20px',
            }}
        >
            {textInputProps.map((args, index) => (
                <div
                    style={{
                        marginTop: '12.5px',
                        marginBottom: '12.5px',
                        marginRight: '15px',
                        width: '100%',
                        padding: '5px 25px',
                    }}
                    key={index}
                >
                    <Input {...args} />
                </div>
            ))}
        </div>
    </div>
);

EventType.args = {
    value: '',
    onChange: (): void => {
        return;
    },

    placeholder: 'Введите текст...',
    autocomplete: true,
};
