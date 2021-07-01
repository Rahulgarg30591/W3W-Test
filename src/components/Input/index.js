import React, { useState, useEffect }  from 'react';
import classes from './Input.module.css'
import inputValidator from '../../helpers/validationHelper';

const Input = React.forwardRef((props, ref) => {
    const {
        label, inputId, placeholderText,
        isValid, setIsValid, setValue,
        isShowErrorMessage, setIsShowErrorMessage, validationType
    } = props;

    const [errorMessage, setErrorMessage] = useState(''); 

    /**
     * Input field Blur Handler.
     * @param {Event Object} Callback Event Object
     */
    const inputBlurHandler = ({ target }) => {
        const inputVal = target.value;
        const validationInfo = inputValidator(inputVal, validationType);
        setIsValid(validationInfo.isValid);
        setIsShowErrorMessage(!validationInfo.isValid);
        setValue(inputVal);
        setErrorMessage(validationInfo.errorMessage);
    }

    /**
     * Input field Focus Handler.
     * @param {Event Object} Callback Event Object
     */
    const inputFocusHandler = () => {
        setIsShowErrorMessage(false);
    }

    const inputValidity = isValid ? '' : classes.invalid; 

    return (
        <div>
            <label htmlFor={inputId}>{label}</label>
            <input 
                type="text" 
                id={inputId}
                ref={ref}
                className={`${classes.text} ${inputValidity}`}
                placeholder= {placeholderText}
                onBlur={inputBlurHandler} 
                onFocus={inputFocusHandler}
            />
            <span className={classes.error} data-testid="inputError">{isShowErrorMessage ? errorMessage : ''}</span>
            <hr />
        </div>
    )
})

export default Input;