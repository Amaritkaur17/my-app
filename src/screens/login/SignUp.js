import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//=================================CSS Styles ================================================//
const useSignUpStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 350,
    width: 250,
    padding: "0 30px",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 500,
    },
    "& .MuiFormControl-root": {
      display: "flex",
      marginBottom: "15px",
    },
  },
}));

const SignUp = ({
  validateUsername,
  validUsername,
  validateEmail,
  showEmptyError,
  hideEmptyError,
  fetchSignUp,
  closeModal,
  setAccessToken,
  setLoggedInUserId,
}) => {
  const SignUpClasses = useSignUpStyles();
  const [SignUpForm, setSignUpForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [SignUpError, setSignUpError] = useState({
    username: false,
    email: false,
    passwordError: false,
  });
  const [SignUpErrorText, setSignUpErrorText] = useState({
    usernameErrorText: "",
    emailErrorText: "",
    passwordErrorText: "",
  });

  function hideErrors() {
    setSignUpError({
      usernameError: false,
      emailError: false,
      passwordError: false,
    });
    setSignUpErrorText({
      usernameError: "",
      emailError: "",
      passwordErrorText: "",
    });
  }

  //================================= Validation methods ===========================//
  function validateSignUp(SignUpForm) {
    const email = SignUpForm["email"];

    let errorFound = showEmptyError(SignUpForm);

    let isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      const error = SignUpError;
      error["emailError"] = true;
      const errorText = SignUpErrorText;
      errorText["emailErrorText"] = "Enter valid Email";
      setSignUpError({ ...error });
      setSignUpErrorText({ ...errorText });
    }

    const username = SignUpForm["username"];
    let isValidUsername = validateUsername(username);
    if (!isValidUsername) {
      const error = SignUpError;
      error["usernameError"] = true;
      const errorText = SignUpErrorText;
      errorText["SignUpErrorText"] = "No username found";
      setSignUpError({ ...error });
      setSignUpErrorText({ ...errorText });
    }

    return isValidEmail && !errorFound && isValidUsername;
  }

  //================================ Event Handlers =======================================//
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { username, email, password } = SignUpForm;
    let isValid = validateSignUp(SignUpForm);

    if (isValid === true) {
      const { rawResponse, response } = await fetchSignUp(
        username,
        email,
        password
      );
      if (rawResponse.ok) {
        setAccessToken(response.accessToken);
        setLoggedInUserId(username);
        setSignUpForm({
          username: "",
          email: "",
          password: "",
        });
        closeModal();
      } else {
        const error = SignUpError;
        error["usernameError"] = true;
        const errorText = SignUpErrorText;
        errorText["emailErrorText"] = response.message;
        setSignUpError({ ...error });
        setSignUpErrorText({ ...errorText });
      }
    }
  };

  const SignUpInputChangedHandler = (e) => {
    hideEmptyError(SignUpForm);
    hideErrors();
    const state = SignUpForm;
    state[e.target.name] = e.target.value;

    setSignUpForm({ ...state });
  };

  return (
    <form className={SignUpClasses.root}>
      <FormControl>
        <InputLabel htmlFor="SignUp-username">Username *</InputLabel>
        <Input
          id="SignUp-username"
          name="username"
          type="username"
          aria-describedby="username"
          onChange={SignUpInputChangedHandler}
          error={SignUpError.usernameError === true}
        />
        <FormHelperText id="username-error-text">
          {SignUpErrorText.usernameErrorText}
        </FormHelperText>
        <FormHelperText id="username-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="login-email">Email *</InputLabel>
        <Input
          id="login-email"
          name="email"
          aria-describedby="email"
          onChange={SignUpInputChangedHandler}
          error={SignUpError.emailError === true}
        />
        <FormHelperText id="email-error-text">
          {SignUpErrorText.emailErrorText}
        </FormHelperText>
        <FormHelperText id="email-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="SignUp-password">Password *</InputLabel>
        <Input
          id="SignUp-password"
          name="password"
          type="password"
          aria-describedby="password"
          onChange={SignUpInputChangedHandler}
          error={SignUpError.passwordError === true}
        />
        <FormHelperText id="password-error-text">
          {SignUpErrorText.passwordErrorText}
        </FormHelperText>
        <FormHelperText id="password-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl>
      <Button
        id="SignUp-btn"
        className="modal-action-btn"
        variant="contained"
        color="primary"
        onClick={handleSignUp}
      >
        SignUp
      </Button>
    </form>
  );
};

export default SignUp;
