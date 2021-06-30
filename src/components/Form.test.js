import { render, screen } from '@testing-library/react';
import Form from './Form';
import mockedAxios from 'axios';

describe('Form Control test suite', () => {
    test('mocking axios request', () => {
        const data = {
            data: [
                {
                    id: "1",
                    name: "Andy"
                },
                {
                    id: "2",
                    name: "Mike"
                }
            ]
        };
        mockedAxios.get.mockResolvedValueOnce(data);
        render(<Form />)
    });
});