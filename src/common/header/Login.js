import React, { useState } from "react";
import Modal from "react-modal";
import "./Login.css";
import "../common.css";
import { Button, Tabs, Tab, Box } from "@material-ui/core";
import { TabPanel, a11yProps } from "../tabPanel/TabPanel";
//import Login from "../../screens/login/Login";
//import Register from "../../screens/register/Register";
import SignIn from "../../screens/login/SignIn";
//import SignUp from "../../screens/login/SignUp";
import Register from "../../screens/register/Register";

//=================================CSS Styles ================================================//

const loginModalCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "50px",
  },
};

/**
 * Header component contains Login and Logout buttons. Login button opens Modal
 * @param baseUrl
 * @param accessToken
 * @param setAccessToken
 * @param loggedInUserId
 * @param setLoggedInUserId
 * @returns {JSX.Element}
 * @constructor
 */
const Header = ({
  baseUrl,
  accessToken,
  setAccessToken,
  loggedInUserId,
  setLoggedInUserId,
}) => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setLoginModalIsOpen(true);
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

  const validateEmail = (email) => {
    let validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validEmailRegex)) {
      return false;
    }

    return true;
  };

  const fetchLogin = async (email, password) => {
    let stringToEncode = email + ":" + password;
    let basicAuth = window.btoa(stringToEncode);
    const rawResponse = await fetch(baseUrl + "auth/login", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
      },
    });
    const response = await rawResponse.json();
    return { rawResponse, response };
  };

  const handleLogout = async () => {
    const rawResponse = await fetch(baseUrl + "api/auth/signout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (rawResponse.ok) {
      setAccessToken("");
      setLoggedInUserId("");
    }
  };

  function closeModal() {
    setLoginModalIsOpen(false);
  }

  function hideEmptyError(form) {
    Object.entries(form).forEach(([key, value]) => {
      const ele = document.getElementById(`${key}-empty-error`);
      ele.style.display = "none";
    });
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="header-panel">
      <div className="btn-panel" style={{ display: "flex" }}>
        {accessToken === "" ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            style={{ marginLeft: "auto" }}
          >
            Login
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            {" "}
            Logout{" "}
          </Button>
        )}
      </div>
      <Modal
        isOpen={loginModalIsOpen}
        onRequestClose={closeModal}
        style={loginModalCustomStyles}
        contentLabel="Login Modal"
      >
        <div className="heading">
          <h2>Login</h2>
        </div>
        <div className="tabs-container">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="SignIn" {...a11yProps(0)} />
              <Tab label="SignUp" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <SignIn
              baseUrl={baseUrl}
              validateEmail={validateEmail}
              showEmptyError={showEmptyError}
              hideEmptyError={hideEmptyError}
              fetchLogin={fetchLogin}
              setAccessToken={setAccessToken}
              setLoggedInUserId={setLoggedInUserId}
              closeModal={closeModal}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Register
              baseUrl={baseUrl}
              validateEmail={validateEmail}
              showEmptyError={showEmptyError}
              hideEmptyError={hideEmptyError}
              fetchLogin={fetchLogin}
              setAccessToken={setAccessToken}
              setLoggedInUserId={setLoggedInUserId}
              closeModal={closeModal}
            />
          </TabPanel>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
