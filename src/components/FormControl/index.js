import axios from "axios";
import classes from "./FormControl.module.css";
import { useEffect, useState } from "react";
import makeRequest from "../../helpers/httpHelper";

const FormControl = (props) => {
  const { label, selectedUser, validationFunction } = props;
  const [userData, setUserData] = useState([]);
  const [networkErrorMessage, setNetworkErrorMessage] = useState('');

  /**
   * Success Callback, getting data 
   * @param {Object} 
   */
  const successCallback = ({ data }) => {
    const userResponse = [];
    data.map((user) => userResponse.push({ id: user.id, name: user.name }));
    setUserData(userResponse);
  }

  /**
   * On load, User Fetching API call function..
   */
  const fetchUsers = () => {
    const requestObj = {
      url: "https://jsonplaceholder.typicode.com/users",
      method: 'get'
    };
    makeRequest(requestObj,successCallback, (err) => setNetworkErrorMessage(err.message));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const userClickHandler = (event) => {
    const id = parseInt(event.target.id, 10);
    validationFunction(id);
  };

  const userGroup = userData && userData.map((user) => (
    <div
      key={user.id}
      id={user.id}
      data-role="selector"
      className={`${classes.selectors} ${
        selectedUser !== null && selectedUser === user.id.toString()
          ? classes.selected
          : classes.unselected
      }`}
      onClick={userClickHandler}
    >
      {user.name}
    </div>
  ));

  return (
    <form className={classes.formControl}>
      <label>{label}</label>
      {userGroup && userGroup.length > 0 && (
        <div data-testid="userGroup" className={classes.group96}>{userGroup}</div>
      )}
      {networkErrorMessage && <span className={classes.error}>{networkErrorMessage}</span>}
    </form>
  );
};

export default FormControl;
