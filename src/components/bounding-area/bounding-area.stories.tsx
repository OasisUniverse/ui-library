import React from 'react';
import BoundingArea, { BoundingAreaProps, UploadFileErrors } from './bounding-area.component';
import { Meta, Story } from '@storybook/react';
import { Config } from '../../interfaces';

export default {
    title: 'BoundingArea',
    component: BoundingArea,
} as Meta;

const Template: Story<BoundingAreaProps> = (args) => <BoundingArea {...args} />;

export const Initial = Template.bind({});
Initial.args = {
    uploadFileCallBack: (loadedImage?: Omit<Config, 'src'>, error?: UploadFileErrors) => {
        loadedImage ? console.log(loadedImage) : console.log(error);
    },
    acceptReg: 'image/jpg, image/png',
    layersConfig: [],
};
