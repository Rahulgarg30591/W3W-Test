const minLength = 5;
const maxLength = 50;

const inputValidator = (input) => {
  const inputLength = input.trim().length;
  if (inputLength === 0 || inputLength < minLength || inputLength > maxLength) {
    return false;
  }
  return true;
};

export default inputValidator;
