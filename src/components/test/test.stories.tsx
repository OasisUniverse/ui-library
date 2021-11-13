import React from 'react';
import Test from './test.component';
import { Meta, Story } from '@storybook/react';

export default {
    title: 'Test',
    component: Test,
} as Meta;

const Template: Story = () => <Test />;

export const EventType = Template.bind({});

EventType.args = {};
