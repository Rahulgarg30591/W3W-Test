import { render, screen } from '@testing-library/react';
import Form from './index';
import Adapter from "enzyme-adapter-react-16";
import { mount, shallow, configure } from "enzyme";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';

jest.unmock('axios');

configure({ adapter: new Adapter() });
// import mockedAxios from 'axios';

configure({ adapter: new Adapter() });

describe('Form Control test suite', () => {
    /*test('mocking axios request', () => {
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
    });*/
    // it("renders correctly", () => {
    //     const formComponent = shallow(<Form />);
        
    // });
    // it('checks validation function', () => {

    // })
});

it('checks FormControl Component flow', async () => {
    const wrapper = mount(<Form />);
    const formParentComp  = wrapper.find('form');
    expect(formParentComp.length).toEqual(1);
    const labelComp  = wrapper.find('#errorMsg');
    expect(labelComp.length).toEqual(1);
    expect(labelComp.html()).toEqual('<div id="errorMsg" data-testid="errorMsg" class="error">Please select a user</div>');

    const inputFieldContainer = wrapper.find('#inputFieldContainer');
    expect(inputFieldContainer.length).toEqual(0);
    // const userGroupComp  = wrapper.find('#userGroup');
    // expect(userGroupComp.length).toEqual(0);

    // await whenStable();
    // wrapper.update(); 
    // const userGroupComp2  = wrapper.find('#userGroup');
    // expect(userGroupComp2.length).toEqual(1);
    // wrapper.update(); 
    // expect(userGroupComp2.children().length).toEqual(2);
    // expect(userGroupComp2.childAt(0).type()).toEqual('div');
});