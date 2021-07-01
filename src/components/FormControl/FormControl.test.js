import { render, screen } from '@testing-library/react';
import FormControl from './index';
import Adapter from "enzyme-adapter-react-16";
import { mount, shallow, configure } from "enzyme";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';

jest.unmock('axios');

configure({ adapter: new Adapter() });

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
  });


describe('Form Control test suite', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    //jest.mock('axios', () => jest.fn(() => Promise.resolve({ data: 'data' })));
    // test('users are not rendered', () => {
    //     const users = []
    //     render(<FormControl users={users} />);
    //     const element = screen.queryByTestId('userGroup');
    //     expect(element).toBeNull();
    // });
    // test('component renders users', () => {
    //     const users = [{id: 1, name: "Andy"}, {id: 2, name: "Mike"}]
    //     render(<FormControl users={users} />);
    //     const element = screen.getByText('Andy');
    //     expect(element).toBeInTheDocument();
    // });
    // test('user is selected', () => {
    //     const users = [{id: 1, name: "Andy"}, {id: 2, name: "Mike"}]
    //     render(<FormControl users={users} selectedUser="1"/>);
    //     const selectedElement = screen.getByText('Andy');
    //     expect(selectedElement.classList.contains('selected')).toBe(true);
    //     const unselectedElement = screen.getByText('Mike');
    //     expect(unselectedElement.classList.contains('unselected')).toBe(true);
    // });
    // test('error message is visible when error is present', () => {
    //     const users = [{id: 1, name: "Andy"}, {id: 2, name: "Mike"}]
    //     const error = "Please select a user";
    //     render(<FormControl users={users} errorMessage={error} />);
    //     const element = screen.getByText(error);
    //     expect(element.innerHTML).toBe(error);
    // });
    // test('error message is not visible when error is not present', () => {
    //     const users = [{id: 1, name: "Andy"}, {id: 2, name: "Mike"}]
    //     render(<FormControl users={users} />);
    //     const element = screen.queryByTestId('errorMsg');
    //     expect(element).toBeNull();
    // });

    it('checks FormControl Component flow', async () => {
        const labelVal = "test";
        var mock = new MockAdapter(axios);
        mock.onAny('https://jsonplaceholder.typicode.com/users').reply(200, [
            { id: 1, name: "John Smith" },
            { id: 2, name: "Smith John" }
        ]);

        const wrapper = mount(
            <FormControl
                label={labelVal}
                selectedUserId={-1}
                validationFunction={jest.fn()}
                setErrorMessage={jest.fn()}
            />
        );
        const labelComp  = wrapper.find('label');
        expect(labelComp.length).toEqual(1);
        expect(labelComp.html()).toEqual('<label>test</label>');

        const userGroupComp  = wrapper.find('#userGroup');
        expect(userGroupComp.length).toEqual(0);

        await whenStable();
        wrapper.update(); 
        const userGroupComp2  = wrapper.find('#userGroup');
        expect(userGroupComp2.length).toEqual(1);
        wrapper.update(); 
        expect(userGroupComp2.children().length).toEqual(2);
        expect(userGroupComp2.childAt(0).type()).toEqual('div');
    });
})