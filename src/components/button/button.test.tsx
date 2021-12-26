import React from 'react';
import { Button, ButtonProps } from './button.component';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { buttonTestMock } from '../../__mocks__/button.test.mock';

const defaultProps: ButtonProps = {
    onClick: jest.fn(),
};

Enzyme.configure({ adapter: new Adapter() });

let button: ShallowWrapper;

describe('<Button /> test list', () => {
    beforeAll(() => {
        button = shallow(<Button {...defaultProps} {...buttonTestMock.get('default')} />);
    });
    it('disabled', () => {
        button = shallow(<Button {...defaultProps} {...buttonTestMock.get('default-disabled')} />);
        expect(button.prop('disabled')).toBeTruthy();
        expect(button.hasClass('disabled')).toBeTruthy();
    });
    it('has a large size', () => {
        button = shallow(<Button {...defaultProps} {...buttonTestMock.get('default-large')} />);
        expect(button.hasClass('large')).toBeTruthy();
    });
    it('has an icon inside', () => {
        button = shallow(<Button {...defaultProps} {...buttonTestMock.get('default-small')} />);
        expect(button.childAt(0).exists()).toBeTruthy();
    });
    it('has an icon and text inside', () => {
        button = shallow(<Button {...defaultProps} {...buttonTestMock.get('icon-and-text')} />);
        expect(button.childAt(0).exists()).toBeTruthy();
        expect(button.childAt(1).exists()).toBeTruthy();
        expect(button.hasClass('buttonWithIcon')).toBeTruthy();
        button = shallow(<Button {...defaultProps} {...buttonTestMock.get('icon-and-text-reversed')} />);
        expect(button.hasClass('reverseItems')).toBeTruthy();
    });
    it('has every size', () => {
        button = shallow(<Button {...defaultProps} {...buttonTestMock.get('default')} />);
        expect(button.hasClass('medium')).toBeTruthy();
        button = shallow(<Button {...defaultProps} {...buttonTestMock.get('default-large')} />);
        expect(button.hasClass('large')).toBeTruthy();
        button = shallow(<Button {...defaultProps} {...buttonTestMock.get('default-small')} />);
        expect(button.hasClass('small')).toBeTruthy();
    });
    it('has every type', () => {
        button = shallow(<Button {...defaultProps} {...buttonTestMock.get('default')} />);
        expect(button.hasClass('default')).toBeTruthy();
        button = shallow(<Button {...defaultProps} {...buttonTestMock.get('secondary')} />);
        expect(button.hasClass('secondary')).toBeTruthy();
        button = shallow(<Button {...defaultProps} {...buttonTestMock.get('outlined')} />);
        expect(button.hasClass('outlined')).toBeTruthy();
    });
});
