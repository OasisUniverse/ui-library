import React from 'react';
import { Button, ButtonProps } from './button.component';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { buttonTestMock } from '../../__mocks__/button.test.mock';
import LoadingSpinner from '../../shared/svg/loading-spinner.icon';
import InputCrossIcon from '../../shared/svg/input-cross.icon';

Enzyme.configure({ adapter: new Adapter() });

let button: ShallowWrapper;

describe('<Button /> test list', () => {
    beforeAll(() => {
        button = shallow(<Button onClick={jest.fn()} {...buttonTestMock.get('default')} />);
        jest.clearAllMocks();
    });
    it('render all list', () => {
        Array.from(buttonTestMock, ([key, props]) => {
            const component = shallow(<Button key={key} {...props} />);
            expect(component.exists()).toBeTruthy();
            expect(component).toMatchSnapshot();
        });
    });

    it('not disabled', () => {
        expect((button.props() as ButtonProps).disabled).toBeFalsy();
    });
    it('disabled', () => {
        const button = shallow(<Button onClick={jest.fn()} {...buttonTestMock.get('default-disabled')} />);
        expect((button.props() as ButtonProps).disabled).toBeTruthy();
        expect(button.hasClass('disabled')).toBeTruthy();
    });
    it('has a large size', () => {
        button = shallow(<Button onClick={jest.fn()} {...buttonTestMock.get('default-large')} />);
        expect(button.hasClass('large')).toBeTruthy();
    });
    it('has an icon inside', () => {
        button = shallow(<Button onClick={jest.fn()} {...buttonTestMock.get('default-small')} />);
        expect(button.childAt(0).exists()).toBeTruthy();
    });
    it('has an icon and text inside', () => {
        button = shallow(<Button onClick={jest.fn()} {...buttonTestMock.get('icon-and-text')} />);
        expect(button.childAt(0).exists()).toBeTruthy();
        expect(button.childAt(1).exists()).toBeTruthy();
        expect(button.hasClass('buttonWithIcon')).toBeTruthy();
        button = shallow(<Button onClick={jest.fn()} {...buttonTestMock.get('icon-and-text-reversed')} />);
        expect(button.hasClass('reverseItems')).toBeTruthy();
    });
    it('has every size', () => {
        button = shallow(<Button onClick={jest.fn()} {...buttonTestMock.get('default')} />);
        expect(button.hasClass('medium')).toBeTruthy();
        button = shallow(<Button onClick={jest.fn()} {...buttonTestMock.get('default-large')} />);
        expect(button.hasClass('large')).toBeTruthy();
        button = shallow(<Button onClick={jest.fn()} {...buttonTestMock.get('default-small')} />);
        expect(button.hasClass('small')).toBeTruthy();
    });
    it('has every type', () => {
        button = shallow(<Button onClick={jest.fn()} {...buttonTestMock.get('default')} />);
        expect(button.hasClass('default')).toBeTruthy();
        button = shallow(<Button onClick={jest.fn()} {...buttonTestMock.get('secondary')} />);
        expect(button.hasClass('secondary')).toBeTruthy();
        button = shallow(<Button onClick={jest.fn()} {...buttonTestMock.get('outlined')} />);
        expect(button.hasClass('outlined')).toBeTruthy();
    });
    it('is loading', () => {
        button = shallow(<Button onClick={jest.fn()} {...buttonTestMock.get('loading-medium')} />);
        expect(button.hasClass('loading')).toBeTruthy();
        expect(button.find(LoadingSpinner).exists()).toBeTruthy();
    });
    it('is link and not loading', () => {
        button = shallow(<Button onClick={jest.fn()} {...buttonTestMock.get('not-loading-link')} />);
        expect(button.find('a').exists()).toBeTruthy();
        expect(button.find(InputCrossIcon).exists()).toBeTruthy();
        expect(button.find('a').text()).toEqual('<InputCrossIcon />some text1');
        expect(button.hasClass('buttonWithIcon')).toBeTruthy();
    });
});
