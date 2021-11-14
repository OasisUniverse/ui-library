import React, { useCallback } from 'react';
import BoundingArea, { BoundingAreaProps } from './bounding-area.component';
import { Meta, Story } from '@storybook/react';

export default {
    title: 'BoundingArea',
    component: BoundingArea,
} as Meta;

const callBack = useCallback(() => {
    return;
}, []);

const Template: Story<BoundingAreaProps> = (args) => <BoundingArea {...args} />;

export const Initial = Template.bind({});
Initial.args = {
    acceptReg: 'image/png, image/jpeg',
    uploadFileCallBack: callBack,
};
