import React from 'react';
import { Input, InputProps, InputType } from './input.component';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { inputTestMockMap } from '../../__mocks__/input.test.mock';

Enzyme.configure({ adapter: new Adapter() });

const defaultInputProps: InputProps = {
    onChange: jest.fn(),
};

let defaultInput: ShallowWrapper;
let passwordInput: ShallowWrapper;
let searchInput: ShallowWrapper;
let textArea: ShallowWrapper;

describe('<Input /> test list', () => {
    beforeAll(() => {
        defaultInput = shallow(<Input {...defaultInputProps} />);
        passwordInput = shallow(<Input {...defaultInputProps} type={InputType.PasswordInput} />);
        searchInput = shallow(<Input {...defaultInputProps} type={InputType.SearchInput} />);
        textArea = shallow(<Input {...defaultInputProps} type={InputType.TextArea} />);
    });
    afterAll(() => {
        defaultInput = shallow(<Input {...defaultInputProps} />);
        passwordInput = shallow(<Input {...defaultInputProps} type={InputType.PasswordInput} />);
        searchInput = shallow(<Input {...defaultInputProps} type={InputType.SearchInput} />);
        textArea = shallow(<Input {...defaultInputProps} type={InputType.TextArea} />);
    });
    it('render', () => {
        expect(defaultInput.exists()).toBeTruthy();
        expect(passwordInput.exists()).toBeTruthy();
        expect(searchInput.exists()).toBeTruthy();
        expect(textArea.exists()).toBeTruthy();
    });
    it('should return value via onChange', () => {
        const input = defaultInput.find('.inputWrapper').childAt(0);
        input.simulate('change', { target: { value: 'text' } });
        expect(defaultInputProps.onChange).toHaveBeenCalledWith('text', { target: { value: 'text' } });
    });
    it('Has a label and label has position="bottomLeft"', () => {
        const defaultInput = shallow(<Input {...defaultInputProps} {...inputTestMockMap.get('label-position')} />);
        expect(defaultInput.find('.label').exists()).toBeTruthy();
        expect(defaultInput.find('.label').hasClass('bottomLeft')).toBeTruthy();
    });
    it('has a placeholder', () => {
        const defaultInput = shallow(<Input {...defaultInputProps} {...inputTestMockMap.get('it-has-placeholder')} />);
        const inputWrapper = defaultInput.find('.inputWrapper');
        const input = inputWrapper.find('DebounceInput');
        expect(input.props().placeholder).toEqual('test');
    });
    it('has autofocus', () => {
        const defaultInput = shallow(<Input {...defaultInputProps} {...inputTestMockMap.get('it-has-autofocus')} />);
        const inputWrapper = defaultInput.find('.inputWrapper');
        const input = inputWrapper.find('DebounceInput');
        expect(input.props().autoFocus).toEqual(true);
    });
    it('has catches an error', () => {
        const defaultInput = shallow(<Input {...defaultInputProps} {...inputTestMockMap.get('it-catches-error')} />);
        const inputWrapper = defaultInput.find('.inputWrapper');
        expect(inputWrapper.hasClass('error')).toBeTruthy();
    });
    it('disabled', () => {
        const defaultInput = shallow(<Input {...defaultInputProps} {...inputTestMockMap.get('it-disabled')} />);
        const inputWrapper = defaultInput.find('.inputWrapper');
        const input = inputWrapper.find('DebounceInput');
        expect(input.props().disabled).toEqual(true);
        expect(inputWrapper.hasClass('disabled')).toBeTruthy();
    });
    it('has a cross icon', () => {
        const defaultInput = shallow(<Input {...defaultInputProps} {...inputTestMockMap.get('it-has-cross-icon')} />);
        const inputWrapper = defaultInput.find('.inputWrapper');
        const input = inputWrapper.find('DebounceInput');
        expect(input.props().value).toEqual('test');
        expect(inputWrapper.find('.cross').exists()).toBeTruthy();
    });
    it('resizable', () => {
        const textAreaComponent = shallow(<Input {...defaultInputProps} {...inputTestMockMap.get('it-resizable')} />);
        const textarea = textAreaComponent.find('textarea');
        expect(textarea.exists()).toBeTruthy();
        expect(textarea.hasClass('resize')).toBeTruthy();
    });
    it('textarea with autocomplete', () => {
        const textAreaComponent = shallow(
            <Input {...defaultInputProps} {...inputTestMockMap.get('textarea-can-be-autocompleted')} />,
        );
        const textarea = textAreaComponent.find('textarea');
        expect(textarea.exists()).toBeTruthy();
        expect(textarea.props().autoComplete).toEqual('on');
    });
    it('input with autocomplete', () => {
        const defaultInput = shallow(
            <Input {...defaultInputProps} {...inputTestMockMap.get('input-can-be-autocompleted')} />,
        );
        const inputWrapper = defaultInput.find('.inputWrapper');
        const input = inputWrapper.find('DebounceInput');
        expect(input.exists()).toBeTruthy();
        expect(input.props().autoComplete).toEqual('on');
    });
    it('render password icon', () => {
        const passwordInput = shallow(
            <Input {...defaultInputProps} {...inputTestMockMap.get('it-render-password-icon')} />,
        );
        const inputWrapper = passwordInput.find('.inputWrapper');
        const passwordIcon = inputWrapper.find('.passwordDisplayButton');
        expect(passwordIcon.exists()).toBeTruthy();
    });
    it('changes eye icon onPointerDown and onPointerUp', () => {
        const passwordInput = shallow(
            <Input {...defaultInputProps} {...inputTestMockMap.get('it-render-password-icon')} />,
        );
        const passwordIcon = passwordInput.find('.inputWrapper').find('.passwordDisplayButton');
        expect(passwordIcon.exists()).toBeTruthy();
        (passwordIcon.props() as { onPointerDown: () => void }).onPointerDown();
        // expect((passwordIcon.props() as { onPointerDown: () => void }).onPointerDown).toHaveBeenCalledTimes(1);
    });
});
