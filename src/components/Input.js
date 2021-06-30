import React from 'react';
import classes from './Input.module.css'
import inputValidator from '../Helpers/ValidationHelper';

const Input = React.forwardRef((props, ref) => {
    const { label, inputId, placeholderText, isValid, setIsValid, setValue } = props;

    const inputBlurHandler = (event) => {
        const inputVal = event.target.value;
        setIsValid(inputValidator(inputVal));
        setValue(inputVal);
    }

    const inputFocusHandler = () => {
        setIsValid(true);
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
            <hr />
        </div>
    )
})

export default Input;