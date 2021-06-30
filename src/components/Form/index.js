import axios from "axios";
import { useEffect, useState, useRef } from "react";
import classes from "./Form.module.css";
import FormControl from "../FormControl";
import Input from "../Input";
import inputValidator from "../../helpers/validationHelper";

const Form = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isBodyValid, setIsBodyValid] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const titleRef = useRef("");
  const bodyRef = useRef("");

  const userClickHandler = (event) => {
    const id = event.target.id;
    setSelectedUser(id);
    setErrorMessage(null);
  };

  const clearForm = () => {
    setErrorMessage(null);
    setSelectedUser(null);
    titleRef.current.value = "";
    bodyRef.current.value = "";
  };

  const submitForm = () => {
    axios
      .post("https://react-http-30eb3-default-rtdb.firebaseo.com/users.json", {
        userId: selectedUser,
        title: title,
        body: body,
      })
      .then(() => {
        clearForm();
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const submitHandler = () => {
    let errorMsg = null;
    if (!isTitleValid || !isBodyValid) {
      errorMsg = "Please enter all required fields";
    }

    if (isTitleValid) {
      const validity = inputValidator(title);
      if (!validity) {
        setIsTitleValid(false);
        errorMsg = "Please enter all required fields";
      }
    }

    if (isBodyValid) {
      const validity = inputValidator(body);
      if (!validity) {
        setIsBodyValid(false);
        errorMsg = "Please enter all required fields";
      }
    }

    if (selectedUser === null) {
      errorMsg = "Please select a user";
    }

    if (errorMsg) {
      setErrorMessage(errorMsg);
    } else {
      submitForm();
    }
  };

  const fetchUsers = () => {
    return axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(({ data }) => {
        const userResponse = [];
        data.map((user) => userResponse.push({ id: user.id, name: user.name }));
        setUserData(userResponse);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <FormControl
        users={userData}
        label="Please select a user"
        selectedUser={selectedUser}
        userClickHandler={userClickHandler}
        errorMessage={errorMessage}
      />
      <Input
        label="Title"
        inputId="title"
        placeholderText="Enter title"
        ref={titleRef}
        setValue={(val) => setTitle(val)}
        isValid={isTitleValid}
        setIsValid={setIsTitleValid}
      />
      <Input
        label="Body"
        inputId="body"
        placeholderText="Enter body"
        ref={bodyRef}
        setValue={(val) => setBody(val)}
        isValid={isBodyValid}
        setIsValid={setIsBodyValid}
      />
      <button aria-label="Submit" onClick={submitHandler}>Submit</button>
    </div>
  );
};

export default Form;
