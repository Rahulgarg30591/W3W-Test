
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { render, screen } from '@testing-library/react';
import Form from './index';
import mockedAxios from 'axios';

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
    it("renders correctly", () => {
        const formComponent = shallow(<Form />);
        
    });
    it('checks validation function', () => {

    })
});

/*const validationFunction = (id) => {
    if (id === selectedUserId || id < 0) {
      setSelectedUserId(-1);
      setErrorMessage(errorMessageValue);
    } else {
      setSelectedUserId(id);
    }
    clearForm();
  }*/

