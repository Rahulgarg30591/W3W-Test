import { render, screen } from '@testing-library/react';
import FormControl from './FormControl';

describe('Form Control test suite', () => {
    test('users are not rendered', () => {
        const users = []
        render(<FormControl users={users} />);
        const element = screen.queryByTestId('userGroup');
        expect(element).toBeNull();
    });
    test('component renders users', () => {
        const users = [{id: 1, name: "Andy"}, {id: 2, name: "Mike"}]
        render(<FormControl users={users} />);
        const element = screen.getByText('Andy');
        expect(element).toBeInTheDocument();
    });
    test('user is selected', () => {
        const users = [{id: 1, name: "Andy"}, {id: 2, name: "Mike"}]
        render(<FormControl users={users} selectedUser="1"/>);
        const selectedElement = screen.getByText('Andy');
        expect(selectedElement.classList.contains('selected')).toBe(true);
        const unselectedElement = screen.getByText('Mike');
        expect(unselectedElement.classList.contains('unselected')).toBe(true);
    });
    test('error message is visible when error is present', () => {
        const users = [{id: 1, name: "Andy"}, {id: 2, name: "Mike"}]
        const error = "Please select a user";
        render(<FormControl users={users} errorMessage={error} />);
        const element = screen.getByText(error);
        expect(element.innerHTML).toBe(error);
    });
    test('error message is not visible when error is not present', () => {
        const users = [{id: 1, name: "Andy"}, {id: 2, name: "Mike"}]
        render(<FormControl users={users} />);
        const element = screen.queryByTestId('errorMsg');
        expect(element).toBeNull();
    });
})

