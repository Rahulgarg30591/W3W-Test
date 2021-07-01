# Overview

The document contains steps to run the program and test.
I have tried to cover few unit tests along with some end to end tests using Puppeteer.
The code also covers some of the accessibility guidelines as per WCAG AA standard.

As per the requirement, I have created components namely, Input, FormControl and Form.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Assumption

Initially we are not displaying Title and Body text boxes before any user is selected. And that is why, we are using the error placeholder to display 'Please select a user' message to the user. This error message gets removed once the user is selected.

## Notes
1. The error message placeholder has been moved out of the FormControl and placed into the Form component unlike the figma design shared.
2. Few keyboard interactions have been added for the accessibility.

## Steps to run the program

### `npm install`

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

## Steps to run the E2E test (using puppeteer)

### `node .\src\E2E_Test\form-submit-tests.js`

This will run all the E2E test scenarios created and take screenshots of the screen (placed inside same folder)
Below are 4 scenarios tested
1. Success submit of the form
2. Submit without entering title and Body, which will not let us submit
3. Submit without Body, which will not let us submit
3. Submit without Title, which will not let us submit


## Program Screenshots

This is how the program looks when it is loaded

When any user is selected, the Title and Body Label and Textboxes are displayed

If Submit button is clicked without entering imformation in Title and Body (or any one of them as well), error is displayed as mandatory fields validation are applied

Once submited, initial load stage is achived

