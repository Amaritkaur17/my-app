import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
//import Dropdown from "react-dropdown";
import { Box, TextField, MenuItem } from "@mui/material";
import { BloodGroupSelect } from "./BloodGroupSelect";
//import "react-dropdown/style.css";
import "./Register.css";

//=================================CSS Styles ================================================//
const useRegisterStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
    "& .MuiFormControl-root": {
      display: "flex",
      marginBottom: "15px",
    },
  },
}));

const Register = ({
  baseUrl,
  validateEmail,
  showEmptyError,
  hideEmptyError,
  // fetchLogin,
  closeModal,
  setAccessToken,
  setLoggedInUserId,
}) => {
  const registerClasses = useRegisterStyles();
  const [registerForm, setRegisterForm] = useState({
    userName: "",
    regEmail: "",
    regPassword: "",
    mobile: "",
    bloodgroup: "",
  });
  const [registerError, setRegisterError] = useState({
    userNameError: false,
    regEmailError: false,
    regPasswordError: false,
    mobileError: false,
  });
  const [registerErrorText, setRegisterErrorText] = useState({
    userNameErrorText: "",
    regEmailErrorText: "",
    regPasswordErrorText: "",
    mobileErrorText: "",
  });

  const [bloodgroup, setBloodGroup] = useState("");

  // useEffect(() => {
  //   // setRegisterForm((state) => ({ ...state, bloodgroup: bloodgroup }));
  //   // console.log(registerForm, bloodgroup);
  // }, [bloodgroup]);

  //================================== Validation methods =====================================//
  /* checks that the number should be 10 digits */
  const validateMobileNo = (mobile) => {
    let validMobileRegex = /^[0-9]{10}$/;
    if (!mobile.match(validMobileRegex)) {
      return false;
    }

    return true;
  };

  function validateRegister(registerForm) {
    //  let errorFound = showEmptyError(registerForm);
    let isValidEmail = validateEmail(registerForm["regEmail"]);
    if (!isValidEmail) {
      const error = registerError;
      error["regEmailError"] = true;
      const errorText = registerErrorText;
      errorText["regEmailErrorText"] = "Enter valid Email";
      setRegisterError({ ...error });
      setRegisterErrorText({ ...errorText });
    }
    let isValidMobile = validateMobileNo(registerForm["mobile"]);
    if (!isValidMobile) {
      const error = registerError;
      error["mobileError"] = true;
      const errorText = registerErrorText;
      errorText["mobileErrorText"] = "Enter valid Mobile No.";
      setRegisterError({ ...error });
      setRegisterErrorText({ ...errorText });
    }
    return isValidEmail;
    //&& !errorFound;
  }

  //===========================blood group drop down=======================//
  {
    /* 
  const options = [
    "A_POSITIVE",
    "B_POSITIVE",
    "O_POSITIVE",
    "AB_POSITIVE",
    "A_NEGATIVE",
    "B_NEGATIVE",
    "O_NEGATIVE",
    "AB_NEGATIVE",
  ];
  const defaultOption = options[0];
  // <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select your blood group" />;

*/
  }

  //================================== API calls ====================================//
  const fetchRegister = async (registerForm) => {
    const body = {
      username: registerForm.userName,
      // dob: "1903-08-06",
      mobile: registerForm.mobile,
      password: registerForm.regPassword,
      email: registerForm.regEmail,
      bloodGroup: registerForm.bloodgroup,
    };

    const rawResponseReg = await fetch(baseUrl + "api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const responseReg = await rawResponseReg.json();
    return { rawResponseReg, responseReg };
  };

  //   header := w.Header()
  // header.Add("Access-Control-Allow-Origin", "*")
  // header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
  // header.Add("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
  //==================================== Event Handlers ==========================//
  const handleRegister = async (e) => {
    e.preventDefault();
    let isValid = validateRegister(registerForm);

    if (isValid === true) {
      const { rawResponseReg, responseReg } = await fetchRegister(registerForm);
      if (rawResponseReg.ok) {
        const msg = document.getElementById("reg-alert");
        msg.classList.remove("hide-message");
        msg.classList.add("show-message");
        // const { rawResponse, response } = await fetchLogin(
        //   registerForm.regEmail,
        //   registerForm.regPassword
        // );
        // if (rawResponse.ok) {
        //   setAccessToken(response.accessToken);
        //   setLoggedInUserId(registerForm.regEmail);
        //   closeModal();
        // } else {
        //   const error = registerError;
        //   error["emailError"] = true;
        //   const errorText = registerErrorText;
        //   errorText["emailErrorText"] = response.message;
        //   setRegisterError({ ...error });
        //   setRegisterErrorText({ ...errorText });
        // }
        setRegisterForm({
          userName: "",
          regEmail: "",
          regPassword: "",
          mobile: "",
          bloodgroup: "",
        });
      } else {
        const error = registerError;
        error["emailError"] = true;
        const errorText = registerErrorText;
        errorText["emailErrorText"] = responseReg.message;
        setRegisterError({ ...error });
        setRegisterErrorText({ ...errorText });
      }
    }
  };

  function hideErrors() {
    setRegisterError({
      userNameError: false,
      regEmailError: false,
      regPasswordError: false,
      mobileError: false,
    });
    setRegisterErrorText({
      userNameErrorText: "",
      regEmailErrorText: "",
      regPasswordErrorText: "",
      mobileErrorText: "",
    });
  }

  const registerInputChangedHandler = (e) => {
    //   hideEmptyError(registerForm);
    hideErrors();
    const state = registerForm;
    state[e.target.name] = e.target.value;
    console.log("Changing values for registerForm", registerForm);
    setRegisterForm({ ...state });
  };

  return (
    <form className={registerClasses.root}>
      {/* <FormControl>
        <InputLabel htmlFor="first-name">First Name *</InputLabel>
        <Input
          id="first-name"
          name="firstName"
          aria-describedby="firstName"
          onChange={registerInputChangedHandler}
          error={registerError.firstNameError === true}
        />
        <FormHelperText id="firstName-error-text">
          {registerErrorText.firstNameErrorText}
        </FormHelperText>
        <FormHelperText id="firstName-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="last-name">Last Name *</InputLabel>
        <Input
          id="last-name"
          name="lastName"
          aria-describedby="lastName"
          onChange={registerInputChangedHandler}
          error={registerError.lastNameError === true}
        />
        <FormHelperText id="lastName-error-text">
          {registerErrorText.lastNameErrorText}
        </FormHelperText>
        <FormHelperText id="lastName-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl> */}
      <FormControl>
        <InputLabel htmlFor="user-name">User Name *</InputLabel>
        <Input
          id="user-name"
          name="userName"
          aria-describedby="userName"
          onChange={registerInputChangedHandler}
          error={registerError.userNameError === true}
        />
        <FormHelperText id="userName-error-text">
          {registerErrorText.userNameErrorText}
        </FormHelperText>
        <FormHelperText id="userName-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="reg-email">Email Id *</InputLabel>
        <Input
          id="reg-email"
          name="regEmail"
          aria-describedby="email"
          onChange={registerInputChangedHandler}
          error={registerError.regEmailError === true}
        />
        <FormHelperText id="regEmail-error-text">
          {registerErrorText.regEmailErrorText}
        </FormHelperText>
        <FormHelperText id="regEmail-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="register-password">Password *</InputLabel>
        <Input
          id="register-password"
          name="regPassword"
          type="password"
          aria-describedby="password"
          onChange={registerInputChangedHandler}
          error={registerError.regPasswordError === true}
        />
        <FormHelperText id="regPassword-error-text">
          {registerErrorText.regPasswordErrorText}
        </FormHelperText>
        <FormHelperText id="regPassword-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="register-password">Mobile No *</InputLabel>
        <Input
          id="mobile"
          name="mobile"
          aria-describedby="mobile"
          onChange={registerInputChangedHandler}
          error={registerError.mobileError === true}
        />
        <FormHelperText id="mobile-error-text">
          {registerErrorText.mobileErrorText}
        </FormHelperText>
        <FormHelperText id="mobile-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="first-name">Blood Group *</InputLabel>
        <br />
        <br />
        <BloodGroupSelect
          bloodgroup={bloodgroup}
          setBloodGroup={setBloodGroup}
          form={registerForm}
          setForm={setRegisterForm}
        />
        <FormHelperText id="mobile-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl>
      <Button
        id="register-btn"
        className="modal-action-btn"
        variant="contained"
        color="primary"
        onClick={handleRegister}
      >
        Register
      </Button>
      <Alert severity="success" className="hide-message" id="reg-alert">
        Registration Successful
      </Alert>
    </form>
  );
};

export default Register;
