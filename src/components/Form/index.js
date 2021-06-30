import axios from "axios";
import { useState, useRef } from "react";
import classes from "./Form.module.css";
import FormControl from "../FormControl";
import Input from "../Input";
import inputValidator from "../../helpers/validationHelper";

const Form = () => {
  const selectUserLabel = "Please select the user";
  const errorMessageValue = "Please select a user";

  const [selectedUserId, setSelectedUserId] = useState(-1);
  const [errorMessage, setErrorMessage] = useState(errorMessageValue);

  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isBodyValid, setIsBodyValid] = useState(false);
  const [isShowTitleErrorMessage, setIsShowTitleErrorMessage] = useState(false);
  const [isShowBodyErrorMessage, setIsShowBodyErrorMessage] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const titleRef = useRef("");
  const bodyRef = useRef("");

  /**
   * Callback after form submission.
   */
  const clearForm = () => {
    setErrorMessage(null);
    setSelectedUserId(-1);
    titleRef.current.value = "";
    bodyRef.current.value = "";
  };

  /**
   * Submit Form function.
   */
  const submitForm = () => {
    axios.post("https://react-http-30eb3-default-rtdb.firebaseo.com/users.json", {
        userId: selectedUserId,
        title: title,
        body: body,
      })
      .then(clearForm)
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  /**
   * Before form submission, handler is applied to verify the submit request
   * And this function does the same.
   */
  const submitHandler = () => {
    let errorMsg = null;

    if (isTitleValid && isBodyValid) {
      submitForm();
    } else {
      setIsShowTitleErrorMessage(true);
      setIsShowBodyErrorMessage(true);
    }

    if (errorMsg) {
      setErrorMessage(errorMsg);
    } else {
    }
  };

  /**
   * This is a custom Validation Function that is in use.
   * @param {Number} id: Selected Used Id.
   */
  const validationFunction = (id) => {
    if (id === selectedUserId || id < 0) {
      setSelectedUserId(-1);
      setErrorMessage(errorMessageValue);
    } else {
      setSelectedUserId(id);
      setErrorMessage('');
    }
  }

  return (
    <form className={classes.formSection}>
      <FormControl
        label={selectUserLabel}
        validationFunction={validationFunction}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        errorMessage={errorMessage}
     / >
        
    
      {errorMessage && <div data-testid="errorMsg" className={classes.error}>{errorMessage}</div>}
      {selectedUserId < 0 ? null : 
        <div>
          <Input
            label="Title"
            inputId="title"
            placeholderText="Enter title"
            ref={titleRef}
            setValue={setTitle}
            isValid={isTitleValid}
            setIsValid={setIsTitleValid}
            isShowErrorMessage={isShowTitleErrorMessage}
            setIsShowErrorMessage={setIsShowTitleErrorMessage}
            validationType="mandatory"
          />
          <Input
            label="Body"
            inputId="body"
            placeholderText="Enter body"
            ref={bodyRef}
            setValue={(val) => setBody(val)}
            isValid={isBodyValid}
            setIsValid={setIsBodyValid}
            isShowErrorMessage={isShowBodyErrorMessage}
            setIsShowErrorMessage={setIsShowBodyErrorMessage}
            validationType="mandatory"
          />
          <button aria-label="Submit" onClick={submitHandler} type="button">Submit</button>
        </div>
      }
    </form>
  );
};

export default Form;
