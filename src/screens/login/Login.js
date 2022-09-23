// import React, { useState } from "react";
// import {
//   Button,
//   FormControl,
//   FormHelperText,
//   Input,
//   InputLabel,
// } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";

// //=================================CSS Styles ================================================//
// const useLoginStyles = makeStyles((theme) => ({
//   root: {
//     background: "white",
//     border: 0,
//     borderRadius: 3,
//     boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//     color: "white",
//     height: 350,
//     width: 250,
//     padding: "0 30px",
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: 500,
//     },
//     "& .MuiFormControl-root": {
//       display: "flex",
//       marginBottom: "15px",
//     },
//   },
// }));

// const Login = ({
//   validateUsername,
//   validUsername,
//   validateEmail,
//   showEmptyError,
//   hideEmptyError,
//   fetchLogin,
//   closeModal,
//   setAccessToken,
//   setLoggedInUserId,
// }) => {
//   const loginClasses = useLoginStyles();
//   const [loginForm, setLoginForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [loginError, setLoginError] = useState({
//     username: false,
//     emailError: false,
//     passwordError: false,
//   });
//   const [loginErrorText, setLoginErrorText] = useState({
//     usernameErrorText: "",
//     emailErrorText: "",
//     passwordErrorText: "",
//   });

//   function hideErrors() {
//     setLoginError({
//       usernameError: false,
//       emailError: false,
//       passwordError: false,
//     });
//     setLoginErrorText({
//       usernameError: "",
//       emailErrorText: "",
//       passwordErrorText: "",
//     });
//   }

//   //================================= Validation methods ===========================//
//   function validateLogin(loginForm) {
//     const email = loginForm["email"];

//     let errorFound = showEmptyError(loginForm);
//     let isValidEmail = validateEmail(email);
//     if (!isValidEmail) {
//       const error = loginError;
//       error["emailError"] = true;
//       const errorText = loginErrorText;
//       errorText["emailErrorText"] = "Enter valid Email";
//       setLoginError({ ...error });
//       setLoginErrorText({ ...errorText });
//     }

//     const username = loginForm["username"];
//     let isValidUsername = validateUsername(username);
//     if (!isValidUsername) {
//       const error = loginError;
//       error["usernameError"] = true;
//       const errorText = loginErrorText;
//       errorText["uernameErrorText"] =
//         "Enter valid Username having min 3 characters & max 9 characters";
//       setLoginError({ ...error });
//       setLoginErrorText({ ...errorText });
//     }

//     return isValidEmail && !errorFound && isValidUsername;
//   }

//   //================================ Event Handlers =======================================//
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { username, email, password } = loginForm;
//     let isValid = validateLogin(loginForm);

//     if (isValid === true) {
//       const { rawResponse, response } = await fetchLogin(
//         username,
//         email,
//         password
//       );
//       if (rawResponse.ok) {
//         setAccessToken(response.accessToken);
//         setLoggedInUserId(email);
//         setLoginForm({
//           username: "",
//           email: "",
//           password: "",
//         });
//         closeModal();
//       } else {
//         const error = loginError;
//         error["emailError"] = true;
//         const errorText = loginErrorText;
//         errorText["emailErrorText"] = response.message;
//         setLoginError({ ...error });
//         setLoginErrorText({ ...errorText });
//       }
//     }
//   };

//   const loginInputChangedHandler = (e) => {
//     hideEmptyError(loginForm);
//     hideErrors();
//     const state = loginForm;
//     state[e.target.name] = e.target.value;

//     setLoginForm({ ...state });
//   };

//   return (
//     <form className={loginClasses.root}>
//       <FormControl>
//         <InputLabel htmlFor="login-username">Username *</InputLabel>
//         <Input
//           id="login-username"
//           name="username"
//           type="username"
//           aria-describedby="username"
//           onChange={loginInputChangedHandler}
//           error={loginError.usernameError === true}
//         />
//         <FormHelperText id="username-error-text">
//           {loginErrorText.usernameErrorText}
//         </FormHelperText>
//         <FormHelperText id="username-empty-error" className="floating-error">
//           Please fill out this field
//         </FormHelperText>
//       </FormControl>
//       <FormControl>
//         <InputLabel htmlFor="login-email">Email *</InputLabel>
//         <Input
//           id="login-email"
//           name="email"
//           aria-describedby="email"
//           onChange={loginInputChangedHandler}
//           error={loginError.emailError === true}
//         />
//         <FormHelperText id="email-error-text">
//           {loginErrorText.emailErrorText}
//         </FormHelperText>
//         <FormHelperText id="email-empty-error" className="floating-error">
//           Please fill out this field
//         </FormHelperText>
//       </FormControl>
//       <FormControl>
//         <InputLabel htmlFor="login-password">Password *</InputLabel>
//         <Input
//           id="login-password"
//           name="password"
//           type="password"
//           aria-describedby="password"
//           onChange={loginInputChangedHandler}
//           error={loginError.passwordError === true}
//         />
//         <FormHelperText id="password-error-text">
//           {loginErrorText.passwordErrorText}
//         </FormHelperText>
//         <FormHelperText id="password-empty-error" className="floating-error">
//           Please fill out this field
//         </FormHelperText>
//       </FormControl>
//       <Button
//         id="login-btn"
//         className="modal-action-btn"
//         variant="contained"
//         color="primary"
//         onClick={handleLogin}
//       >
//         Login
//       </Button>
//     </form>
//   );
// };

// export default Login;