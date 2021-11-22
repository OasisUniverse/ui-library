import React from 'react';
import GlueImagesArea, { GlueImagesAreaProps, UploadFileErrors } from './glue-images-area.component';
import { Meta, Story } from '@storybook/react';

export default {
    title: 'GlueImagesArea',
    component: GlueImagesArea,
} as Meta;

const Template: Story<GlueImagesAreaProps> = (args) => <GlueImagesArea {...args} />;

export const Initial = Template.bind({});
Initial.args = {
    uploadFileCallBack: (loadedImage?: File, error?: UploadFileErrors) => {
        loadedImage ? console.log(loadedImage) : console.log(error);
    },
    layersConfig: [],
    maxAreaSize: 600,
    uploadPhraseText: 'Перетащите в область или кликните по ней, чтобы загрузить файл',
};
