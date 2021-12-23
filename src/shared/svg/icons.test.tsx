import React from 'react';
import InputCrossIcon from './input-cross-icon';
import LockIcon from './lock-icon';
import ClosedEyeIcon from './closed-eye-icon';
import OpenedEyeIcon from './opened-eye-icon';
import UploadIcon from './upload-icon.component';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

let crossIcon: ShallowWrapper;
let lockIcon: ShallowWrapper;
let closedEyeIcon: ShallowWrapper;
let openedEyeIcon: ShallowWrapper;
let uploadIcon: ShallowWrapper;

describe('render all icons', () => {
    beforeAll(() => {
        crossIcon = shallow(<InputCrossIcon />);
        lockIcon = shallow(<LockIcon />);
        closedEyeIcon = shallow(<ClosedEyeIcon />);
        openedEyeIcon = shallow(<OpenedEyeIcon />);
        uploadIcon = shallow(<UploadIcon />);
    });
    it('renders crossIcon', () => {
        expect(crossIcon.exists()).toBeTruthy();
    });
    it('renders lockIcon', () => {
        expect(lockIcon.exists()).toBeTruthy();
    });
    it('renders closedEyeIcon', () => {
        expect(closedEyeIcon.exists()).toBeTruthy();
    });
    it('renders openedEyeIcon', () => {
        expect(openedEyeIcon.exists()).toBeTruthy();
    });
    it('renders uploadIcon', () => {
        expect(uploadIcon.exists()).toBeTruthy();
    });
});
