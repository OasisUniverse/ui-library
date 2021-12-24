import React from 'react';
import { Button, ButtonProps } from './button.component';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { buttonTestMock } from '../../__mocks__/button.test.mock';

const defaultProps: ButtonProps = {
    onClick: jest.fn(),
};

Enzyme.configure({ adapter: new Adapter() });

let defaultButton: ShallowWrapper;
let secondaryButton: ShallowWrapper;
let outlinedButton: ShallowWrapper;

describe('<Button /> test list', () => {
    beforeAll(() => {
        defaultButton = shallow(<Button {...defaultProps} {...buttonTestMock.get('default')} />);
        secondaryButton = shallow(<Button {...defaultProps} {...buttonTestMock.get('secondary')} />);
        outlinedButton = shallow(<Button {...defaultProps} {...buttonTestMock.get('outlined')} />);
    });
    it('render default button with props', () => {
        expect(defaultButton.hasClass('defaultStyle')).toBeTruthy();
        expect(defaultButton.hasClass('defaultSize')).toBeTruthy();
        defaultButton = shallow(<Button {...defaultProps} {...buttonTestMock.get('default-large')} />);
        expect(defaultButton.hasClass('largeSize')).toBeTruthy();
        defaultButton = shallow(<Button {...defaultProps} {...buttonTestMock.get('default-disabled')} />);
        expect(defaultButton.hasClass('disabled')).toBeTruthy();
    });
    it('render secondary button with props', () => {
        expect(secondaryButton.hasClass('secondaryStyle')).toBeTruthy();
        expect(secondaryButton.hasClass('defaultSize')).toBeTruthy();
        secondaryButton = shallow(<Button {...defaultProps} {...buttonTestMock.get('secondary-large')} />);
        expect(secondaryButton.hasClass('largeSize')).toBeTruthy();
        secondaryButton = shallow(<Button {...defaultProps} {...buttonTestMock.get('secondary-disabled')} />);
        expect(secondaryButton.hasClass('disabled')).toBeTruthy();
    });
    it('render outlined button with props', () => {
        expect(outlinedButton.hasClass('outlinedStyle')).toBeTruthy();
        expect(outlinedButton.hasClass('defaultSize')).toBeTruthy();
        outlinedButton = shallow(<Button {...defaultProps} {...buttonTestMock.get('outlined-large')} />);
        expect(outlinedButton.hasClass('largeSize')).toBeTruthy();
        outlinedButton = shallow(<Button {...defaultProps} {...buttonTestMock.get('outlined-disabled')} />);
        expect(outlinedButton.hasClass('disabled')).toBeTruthy();
    });
});
