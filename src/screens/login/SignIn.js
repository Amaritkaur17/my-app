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
const useSignInStyles = makeStyles((theme) => ({
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

const SignIn = ({
  validateUsername,
  validUsername,
  validateEmail,
  showEmptyError,
  hideEmptyError,
  fetchSignIn,
  closeModal,
  setAccessToken,
  setLoggedInUserId,
}) => {
  const SignInClasses = useSignInStyles();
  const [SignInForm, setSignInForm] = useState({
    username: "",

    password: "",
  });
  const [SignInError, setSignInError] = useState({
    username: false,

    passwordError: false,
  });
  const [SignInErrorText, setSignInErrorText] = useState({
    usernameErrorText: "",

    passwordErrorText: "",
  });

  function hideErrors() {
    setSignInError({
      usernameError: false,

      passwordError: false,
    });
    setSignInErrorText({
      usernameError: "",

      passwordErrorText: "",
    });
  }

  //================================= Validation methods ===========================//
  function validateSignIn(SignInForm) {
    let errorFound = showEmptyError(SignInForm);

    const username = SignInForm["username"];
    let isValidUsername = validateUsername(username);
    if (!isValidUsername) {
      const error = SignInError;
      error["usernameError"] = true;
      const errorText = SignInErrorText;
      errorText["SignInErrorText"] = "No username found";
      setSignInError({ ...error });
      setSignInErrorText({ ...errorText });
    }

    return !errorFound && isValidUsername;
  }

  //================================ Event Handlers =======================================//
  const handleSignIn = async (e) => {
    e.preventDefault();
    const { username, password } = SignInForm;
    let isValid = validateSignIn(SignInForm);

    if (isValid === true) {
      const { rawResponse, response } = await fetchSignIn(username, password);
      if (rawResponse.ok) {
        setAccessToken(response.accessToken);
        setLoggedInUserId(username);
        setSignInForm({
          username: "",
          password: "",
        });
        closeModal();
      } else {
        const error = SignInError;
        error["usernameError"] = true;
        const errorText = SignInErrorText;
        //  errorText["emailErrorText"] = response.message;
        setSignInError({ ...error });
        setSignInErrorText({ ...errorText });
      }
    }
  };

  const SignInInputChangedHandler = (e) => {
    hideEmptyError(SignInForm);
    hideErrors();
    const state = SignInForm;
    state[e.target.name] = e.target.value;

    setSignInForm({ ...state });
  };

  return (
    <form className={SignInClasses.root}>
      <FormControl>
        <InputLabel htmlFor="SignIn-username">Username *</InputLabel>
        <Input
          id="SignIn-username"
          name="username"
          type="username"
          aria-describedby="username"
          onChange={SignInInputChangedHandler}
          error={SignInError.usernameError === true}
        />
        <FormHelperText id="username-error-text">
          {SignInErrorText.usernameErrorText}
        </FormHelperText>
        <FormHelperText id="username-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="SignIn-password">Password *</InputLabel>
        <Input
          id="SignIn-password"
          name="password"
          type="password"
          aria-describedby="password"
          onChange={SignInInputChangedHandler}
          error={SignInError.passwordError === true}
        />
        <FormHelperText id="password-error-text">
          {SignInErrorText.passwordErrorText}
        </FormHelperText>
        <FormHelperText id="password-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl>
      <Button
        id="SignIn-btn"
        className="modal-action-btn"
        variant="contained"
        color="primary"
        onClick={handleSignIn}
      >
        SignIn
      </Button>
    </form>
  );
};

export default SignIn;
