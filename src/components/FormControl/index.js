import classes from "./FormControl.module.css";
import { useEffect, useState } from "react";
import makeRequest from "../../helpers/httpHelper";
import apiUrl from "../../static/urlConfig";

const FormControl = (props) => {
  const { label, selectedUserId, validationFunction, setErrorMessage } = props;
  const [userData, setUserData] = useState([]);

  /**
   * Success Callback, getting data 
   * @param {Object} 
   */
  const successCallback = ({ data }) => {
    const userResponse = [];
    data.map((user) => userResponse.push({ id: user.id, name: user.name }));
    setUserData(userResponse);
    return userResponse;
  }

  /**
   * On load, User Fetching API call function..
   */
  const fetchUsers = () => {
    const requestObj = {
      url: apiUrl.getUsers,
      method: 'get'
    };
    makeRequest(requestObj,successCallback, (err) => setErrorMessage(err.message));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Click handler for user selection
   * @param {Event Object} Callback Event Object
   */
  const userClickHandler = (event) => {
    const id = parseInt(event.target.id, 10);
    validationFunction(id);
  };

  /**
   * Key down handler for keyboard interaction with user selection
   * @param {Event Object} Callback Event Object
   */
  const keyDownHandler = (event) => {
    if(event.keyCode && event.keyCode === 13) {
      userClickHandler(event);
    }
  }

  const userGroup = userData && userData.map((user) => (
    <div
      key={user.id}
      id={user.id}
      tabIndex="0"
      className={`${classes.selectors} ${
        selectedUserId !== -1 && selectedUserId === user.id
          ? classes.selected
          : classes.unselected
      }`}
      onClick={userClickHandler}
      onKeyDown={keyDownHandler}
    >
      {user.name}
    </div>
  ));

  return (
    <div>
      <label>{label}</label>
      {userGroup && userGroup.length > 0 && (
        <div id="userGroup" data-testid="userGroup" className={classes.group96}>{userGroup}</div>
      )}
    </div>
  );
};

export default FormControl;
