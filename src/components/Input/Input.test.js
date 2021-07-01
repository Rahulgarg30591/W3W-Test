import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input component test suite', () => {
    test('input label and text nodes are visible', () => {
        const placeholderText="Enter text";
        const label="Input Label";
        const inputId="textNode";
        render(<Input placeholderText={placeholderText} label={label} inputId={inputId} />)
        const inputNode = screen.getByLabelText(label);
        expect(inputNode).toBeInTheDocument();
        const labelNode = screen.getByText(label);
        expect(labelNode).toBeInTheDocument();
    });
    test('show error message on empty input value', () => {
        const label="Input Label";
        const inputId="textNode";
        render(<Input label={label} inputId={inputId} validationType="mandatory" />)
        const inputNode = screen.getByLabelText(label);
        userEvent.click(inputNode);
    });
});