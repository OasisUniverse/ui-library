import React from 'react';
import GlueImagesArea, {GlueImagesAreaProps} from './glue-images-area.component.tsx';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const initialProps: GlueImagesAreaProps = {
    uploadFileCallBack: () => {
        return;
    },
    acceptReg: 'image/jpg, image/png',
    layersConfig: [],
};

let component: ShallowWrapper;

const defaultDropProps = {
    preventDefault: () => null,
    stopPropagation: () => null,
};

describe('<BoundingArea/> test list', () => {
    beforeAll(() => {
        component = shallow(<GlueImagesArea {...initialProps} />);
    });
    afterEach(() => {
        jest.clearAllMocks();
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
    });
    it('Place image to component and get an error with size', () => {
        const file = new File([''], 'darthvader.png');
        Object.defineProperty(file, 'size', { value: 1024 * 1024 + 1 });
        component.simulate('drop', {
            target: { files: [file] },
            dataTransfer: file,
            ...defaultDropProps,
        });
    });
    it('should not show preview if no image has been selected', () => {
        expect(component.find('img').length).toEqual(0);
    });
    it("shouldn't drag when drag leave", () => {
        const setIsDrag = jest.fn();
        const handleDragLeave = jest.spyOn(React, 'useState');
        handleDragLeave.mockImplementationOnce(() => [true, setIsDrag]);
        const file = new File([new ArrayBuffer(1)], 'file.jpg');
        component.simulate('dragLeave', { target: { files: [file] } });
        expect(handleDragLeave).toBeFalsy();
    });
});
