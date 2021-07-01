import { useState, useRef } from "react";
import classes from "./Form.module.css";
import FormControl from "../FormControl";
import Input from "../Input";
import makeRequest from "../../helpers/httpHelper";
import apiUrl from "../../static/urlConfig";

const Form = () => {
  const selectUserLabel = "Please select the user";
  const errorMessageValue = "Please select a user";

  const [selectedUserId, setSelectedUserId] = useState(-1);
  const [errorMessage, setErrorMessage] = useState(errorMessageValue);

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isBodyValid, setIsBodyValid] = useState(true);
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
    setErrorMessage("");
    setIsTitleValid(true);
    setIsBodyValid(true);
    setIsShowTitleErrorMessage(false);
    setIsShowBodyErrorMessage(false);
    if (titleRef.current) {
      titleRef.current.value = "";
    }
    if (bodyRef.current) {
      bodyRef.current.value = "";
    }
  };

  /**
   * Success Callback
   */
   const successCallback = () => {
      setSelectedUserId(-1);
      clearForm();
  }

  /**
   * Submit Form function.
   */
  const submitForm = () => {
    const requestObj = {
      url: apiUrl.postData,
      method: 'post',
      data: {
        userId: selectedUserId,
        title: title,
        body: body,
      }
    };
    makeRequest(requestObj, successCallback, (err) => setErrorMessage(err.message));
  };

  /**
   * Before form submission, handler is applied to verify the submit request
   * And this function does the same.
   */
  const submitHandler = () => {
    if (isTitleValid && isBodyValid) {
      if(title.trim().length === 0 || body.trim().length === 0) {
        setErrorMessage('Please enter the mandatory fields');
        setIsShowTitleErrorMessage(true);
        setIsShowBodyErrorMessage(true);
      } else {
        submitForm();
      }
    } else {
      setErrorMessage('Please enter the mandatory fields');
      setIsShowTitleErrorMessage(true);
      setIsShowBodyErrorMessage(true);
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
    }
    clearForm();
  }

  /**
   * Escapr key down handler for keyboard interaction with user selection
   * @param {Event Object} Callback Event Object
   */
  const keyDownHandler = (event) => {
    if (event.keyCode === 27) {
      setSelectedUserId(-1);
    }
  }

  return (
    <form className={classes.formSection} onKeyDown={keyDownHandler}>
      <FormControl
        label={selectUserLabel}
        validationFunction={validationFunction}
        selectedUserId={selectedUserId}
        setErrorMessage={setErrorMessage}
      />
      {errorMessage && <div id="errorMsg" data-testid="errorMsg" className={classes.error}>{errorMessage}</div>}
      {selectedUserId < 0 ? null : 
        <div id="inputFieldContainer">
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
          <button id="submit" aria-describedby="errorMsg" onClick={submitHandler} type="button">Submit</button>
        </div>
      }
    </form>
  );
};

export default Form;
