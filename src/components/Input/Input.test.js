import { render, screen } from '@testing-library/react';
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
});