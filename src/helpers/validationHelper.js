import errorMessages from "../static/errorMessage";

const inputValidator = (input, validationType) => {
  const inputLength = input.trim().length;

  if (inputLength === 0) {
    return {
      isValid: false,
      errorMessage: errorMessages[validationType],
    }
  }

  return {
    isValid: true,
    errorMessage: ''
  };
};

export default inputValidator;
