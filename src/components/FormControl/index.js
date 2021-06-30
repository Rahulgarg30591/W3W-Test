import classes from "./FormControl.module.css";

const FormControl = (props) => {
  const { users, label, selectedUser, userClickHandler, errorMessage } = props;
  const userGroup = users && users.map((user) => (
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
      {errorMessage && <div data-testid="errorMsg" className={classes.error}>{errorMessage}</div>}
    </form>
  );
};

export default FormControl;
