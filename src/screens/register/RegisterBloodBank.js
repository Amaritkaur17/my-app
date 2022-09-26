import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField, MenuItem } from "@mui/material";
import { BloodGroupSelect } from "./BloodGroupSelect";
import "./Register.css";
import { Quantity } from "../search/Quantity";
import bloodGroups from "./bloodGroups";

//=================================CSS Styles ================================================//
const useRegisterStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0.75),
      width: "10px",
    },
    "& .MuiFormControl-root": {
      // display: "flex",
      // margin: "50px",
      // height: "100%",
      // width: "500px",
      // width: "50%",
      // margin: theme.spacing(1),
      margin: theme.spacing(5),
      minWidth: 440,
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(5),
    minWidth: 240,
  },
}));

const RegisterBloodBank = ({
  baseUrl,
  validateEmail,
  // showEmptyError,
  hideEmptyError,
  fetchLogin,
  closeModal,
  accessToken,
  setLoggedInUserId,
}) => {
  const registerClasses = useRegisterStyles();
  const classes = useStyles();

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    address: "",
    location: "",
    a_pos_quantity: "",
    b_pos_quantity: "",
    o_pos_quantity: "",
    ab_pos_quantity: "",
    a_neg_quantity: "",
    b_neg_quantity: "",
    o_neg_quantity: "",
    ab_neg_quantity: "",
    // bloodgroup: "",
  });
  const [registerError, setRegisterError] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
    contactNumberError: false,
    addressError: false,
    locationError: false,
  });
  const [registerErrorText, setRegisterErrorText] = useState({
    nameErrorErrorText: "",
    emailErrorText: "",
    passwordErrorText: "",
    conatactNumberErrorText: "",
    addressErrorText: "",
    locationErrorText: "",
  });

  //================================== Validation methods =====================================//
  /* checks that the number should be 10 digits */
  const validateMobileNo = (mobile) => {
    let validMobileRegex = /^[0-9]{10}$/;
    if (!mobile.match(validMobileRegex)) {
      return false;
    }

    return true;
  };

  function showEmptyError(form) {
    let errorFound = false;
    Object.entries(form).forEach(([key, value]) => {
      if (form[key] === "") {
        const ele = document.getElementById(`${key}-empty-error`);
        ele.style.display = "block";
        errorFound = true;
      }
    });

    return errorFound;
  }

  function validateRegister(registerForm) {
    let errorFound = showEmptyError(registerForm);
    let isValidEmail = validateEmail(registerForm["email"]);
    if (!isValidEmail) {
      const error = registerError;
      error["emailError"] = true;
      const errorText = registerErrorText;
      errorText["emailErrorText"] = "Enter valid Email";
      setRegisterError({ ...error });
      setRegisterErrorText({ ...errorText });
    }
    let isValidMobile = validateMobileNo(registerForm["contactNumber"]);
    if (!isValidMobile) {
      const error = registerError;
      error["contactNumberError"] = true;
      const errorText = registerErrorText;
      errorText["contactNumberErrorText"] = "Enter valid Contact No.";
      setRegisterError({ ...error });
      setRegisterErrorText({ ...errorText });
    }
    return isValidEmail && !errorFound;
  }

  //================================== API calls ====================================//
  const fetchRegister = async (registerForm) => {
    const body = {
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password,
      contactNumber: registerForm.contactNumber,
      address: registerForm.address,
      location: registerForm.location,

      bloodDetails: [
        {
          bloodGroup: "a+",
          quantity: registerForm.a_pos_quantity,
        },
        {
          bloodGroup: "b+",
          quantity: registerForm.b_pos_quantity,
        },
        {
          bloodGroup: "o+",
          quantity: registerForm.o_pos_quantity,
        },
        {
          bloodGroup: "ab+",
          quantity: registerForm.ab_pos_quantity,
        },
        {
          bloodGroup: "a-",
          quantity: registerForm.a_neg_quantity,
        },
        {
          bloodGroup: "b-",
          quantity: registerForm.b_neg_quantity,
        },
        {
          bloodGroup: "o-",
          quantity: registerForm.o_neg_quantity,
        },
        {
          bloodGroup: "ab-",
          quantity: registerForm.ab_neg_quantity,
        },
      ],
    };

    const rawResponseReg = await fetch(baseUrl + "bb/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(body),
    });
    const responseReg = await rawResponseReg.json();
    return { rawResponseReg, responseReg };
  };

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

        setRegisterForm({
          name: "",
          email: "",
          password: "",
          contactNumber: "",
          address: "",
          location: "",
          a_pos_quantity: "",
          b_pos_quantity: "",
          o_pos_quantity: "",
          ab_pos_quantity: "",
          a_neg_quantity: "",
          b_neg_quantity: "",
          o_neg_quantity: "",
          ab_neg_quantity: "",
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
      nameError: false,
      emailError: false,
      passwordError: false,
      conatctNumberError: false,
      addressError: false,
      locationError: false,
    });
    setRegisterErrorText({
      nameErrorText: "",
      emailErrorText: "",
      passwordErrorText: "",
      contactNumberErrorText: "",
      addressErrorText: "",
      locationErrorText: "",
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
      {/* ---------------------------name----------------------------------------------------------------- */}
      <FormControl>
        <InputLabel htmlFor="first-name">Blood Bank Name *</InputLabel>
        <Input
          id="name"
          name="name"
          aria-describedby="name"
          onChange={registerInputChangedHandler}
          error={registerError.nameError === true}
        />
        <FormHelperText id="name-error-text">
          {registerErrorText.nameErrorText}
        </FormHelperText>
        <FormHelperText id="name-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl>
      {/* -----------------------email------------------------------------------------------------------ */}
      <FormControl>
        <InputLabel htmlFor="reg-email">Email Id *</InputLabel>
        <Input
          id="email"
          name="email"
          aria-describedby="email"
          onChange={registerInputChangedHandler}
          error={registerError.emailError === true}
        />
        <FormHelperText id="email-error-text">
          {registerErrorText.emailErrorText}
        </FormHelperText>
        <FormHelperText id="email-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl>
      {/* ---------------------------password----------------------------------------------------------------- */}
      <FormControl>
        <InputLabel htmlFor="register-password">Password *</InputLabel>
        <Input
          id="password"
          name="password"
          type="password"
          aria-describedby="password"
          onChange={registerInputChangedHandler}
          error={registerError.passwordError === true}
        />
        <FormHelperText id="Password-error-text">
          {registerErrorText.PasswordErrorText}
        </FormHelperText>
        <FormHelperText id="Password-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl>
      {/* //---------------------------contactNumber---------------------------------------------------------- */}
      <FormControl>
        <InputLabel htmlFor="register-password">Contact Number *</InputLabel>
        <Input
          id="contactNumber"
          name="contactNumber"
          aria-describedby="contactNumber"
          onChange={registerInputChangedHandler}
          error={registerError.contactNumberError === true}
        />
        <FormHelperText id="contactNumber-error-text">
          {registerErrorText.contactNumberErrorText}
        </FormHelperText>
        <FormHelperText
          id="contactNumber-empty-error"
          className="floating-error"
        >
          Please fill out this field
        </FormHelperText>
      </FormControl>
      {/* ---------------------------  addresss  ---------------------------------------------------------------- */}
      <FormControl>
        <InputLabel htmlFor="register-password">Address *</InputLabel>
        <Input
          id="address"
          name="address"
          aria-describedby="address"
          onChange={registerInputChangedHandler}
          error={registerError.addressError === true}
        />
        <FormHelperText id="address-error-text">
          {registerErrorText.addressErrorText}
        </FormHelperText>
        <FormHelperText id="address-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl>
      {/* ---------------------------  location  ---------------------------------------------------------------- */}
      <FormControl>
        <InputLabel htmlFor="register-location">Location *</InputLabel>
        <Input
          id="location"
          name="location"
          aria-describedby="location"
          onChange={registerInputChangedHandler}
          error={registerError.locationError === true}
        />
        <FormHelperText id="location-error-text">
          {registerErrorText.locationErrorText}
        </FormHelperText>
        <FormHelperText id="location-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText>
      </FormControl>
      {/* ---------------------------Blood Group ----------------------------------------------------------------- */}
      {/* -------------------A+------------------------------------------------ */}
      <FormControl>
        <InputLabel htmlFor="register-location">Blood Group</InputLabel>
        <Input id="a+" name="a+" aria-describedby="a+" value="a+" />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="register-location">Quantity</InputLabel>
        <input
          type="number"
          id="a_pos_quantity"
          name="a_pos_quantity"
          onChange={registerInputChangedHandler}
        />
      </FormControl>
      {/* -------------------------------B+ --------------------------------------------- */}
      <FormControl>
        <InputLabel htmlFor="register-location">Blood Group</InputLabel>
        <Input id="b+" name="b+" aria-describedby="b+" value="b+" />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="register-location">Quantity</InputLabel>
        <input
          type="number"
          id="b_pos_quantity"
          name="b_pos_quantity"
          onChange={registerInputChangedHandler}
        />
      </FormControl>

      {/* --------------------------------- O + -------------------------------------- */}
      <FormControl>
        <InputLabel htmlFor="register-location">Blood Group</InputLabel>
        <Input id="o+" name="o+" aria-describedby="o+" value="o+" />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="register-location">Quantity</InputLabel>
        <input
          type="number"
          id="o_pos_quantity"
          name="o_pos_quantity"
          onChange={registerInputChangedHandler}
        />
      </FormControl>
      {/* --------------------------------- AB + -------------------------------------- */}
      <FormControl>
        <InputLabel htmlFor="register-location">Blood Group</InputLabel>
        <Input id="ab+" name="ab+" aria-describedby="ab+" value="ab+" />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="register-location">Quantity</InputLabel>
        <input
          type="number"
          id="ab_pos_quantity"
          name="ab_pos_quantity"
          onChange={registerInputChangedHandler}
        />
      </FormControl>
      {/* --------------------------------- A- -------------------------------------- */}
      <FormControl>
        <InputLabel htmlFor="register-location">Blood Group</InputLabel>
        <Input id="a-" name="a-" aria-describedby="a-" value="a-" />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="register-location">Quantity</InputLabel>
        <input
          type="number"
          id="a_neg_quantity"
          name="a_neg_quantity"
          onChange={registerInputChangedHandler}
        />
      </FormControl>
      {/* --------------------------------- b - -------------------------------------- */}
      <FormControl>
        <InputLabel htmlFor="register-location">Blood Group</InputLabel>
        <Input id="b-" name="b-" aria-describedby="b-" value="b-" />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="register-location">Quantity</InputLabel>
        <input
          type="number"
          id="b_neg_quantity"
          name="b_neg_quantity"
          onChange={registerInputChangedHandler}
        />
      </FormControl>
      {/* --------------------------------- O - -------------------------------------- */}
      <FormControl>
        <InputLabel htmlFor="register-location">Blood Group</InputLabel>
        <Input id="o-" name="o-" aria-describedby="o-" value="o-" />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="register-location">Quantity</InputLabel>
        <input
          type="number"
          id="o_neg_quantity"
          name="o_neg_quantity"
          onChange={registerInputChangedHandler}
        />
      </FormControl>
      {/* --------------------------------- ab- -------------------------------------- */}
      <FormControl>
        <InputLabel htmlFor="register-location">Blood Group</InputLabel>
        <Input id="ab-" name="ab-" aria-describedby="ab-" value="ab-" />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="register-location">Quantity</InputLabel>
        <input
          type="number"
          id="ab_neg_quantity"
          name="ab_neg_quantity"
          onChange={registerInputChangedHandler}
        />
      </FormControl>

      {/* ---------------------------register----------------------------------------------------------------- */}
      <br />
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

      <br />
      <br />
      <br />
    </form>
  );
};

export default RegisterBloodBank;
