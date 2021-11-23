import React from 'react';
import GlueImagesArea, { GlueImagesAreaProps } from './glue-images-area.component';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const initialProps: GlueImagesAreaProps = {
    uploadFileCallBack: jest.fn(),
    maxAreaSize: 500,
    layersConfig: [],
    uploadPhraseText: '',
    onDragOverClassName: 'onDragOverClassName',
};

let component: ShallowWrapper;

const defaultDropProps = {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
};

describe('<GlueImagesArea/> test list', () => {
    beforeAll(() => {
        component = shallow(<GlueImagesArea {...initialProps} />);
    });
    it('Place image to component', () => {
        const file = new Blob(['foo'], { type: 'image/jpg' });
        component.simulate('drop', {
            target: { files: [file] },
            dataTransfer: file,
            ...defaultDropProps,
        });
    });
    it('Place image to component and get an error with type', () => {
        const file = new Blob(['foo'], { type: 'bananalopalabomba' });
        component.simulate('drop', {
            target: { files: [file] },
            dataTransfer: file,
            ...defaultDropProps,
        });
        expect(initialProps.uploadFileCallBack).toHaveBeenCalledWith(undefined, 1);
    });
    it('Place image to component and get an error with size', () => {
        const file = {
            fileName: 'darthvader.png',
            type: 'image/jpg',
            size: 1024 * 1024 * 6,
        };
        component.simulate('drop', {
            target: { files: [file] },
            dataTransfer: file,
            ...defaultDropProps,
        });
        expect(initialProps.uploadFileCallBack).toHaveBeenCalledWith(undefined, 0);
    });
    it('Will not show preview if layersConfig is not empty', () => {
        const componentWithNotEmptyConfig = shallow(
            <GlueImagesArea
                {...initialProps}
                layersConfig={[
                    {
                        fileName: 'abvgd',
                        extension: '.jpg',
                        date: new Date(),
                        size: 3200,
                        src: 'https://url.com',
                    },
                ]}
            />,
        );
        expect(componentWithNotEmptyConfig.find('img').length).toEqual(1);
    });
    it('Test onDragEnter then onDragLeave', () => {
        component.simulate('dragEnter', defaultDropProps);
        expect(component.hasClass('onDragOverClassName')).toBeTruthy();
        component.simulate('dragLeave', defaultDropProps);
        expect(component.hasClass('onDragOverClassName')).toBeFalsy();
    });
    it("Shouldn't call default behavior", () => {
        component.simulate('dragOver', defaultDropProps);
        expect(defaultDropProps.preventDefault).toHaveBeenCalled();
        expect(defaultDropProps.stopPropagation).toHaveBeenCalled();
    });
    it('Should uploadFile', () => {
        const file = new Blob(['foo'], { type: 'image/jpg' });
        component.simulate('drop', {
            target: { files: [file] },
            dataTransfer: file,
            ...defaultDropProps,
        });
        expect(initialProps.uploadFileCallBack).toHaveBeenCalledWith(file, undefined);
    });
});
