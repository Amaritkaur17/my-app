import React, { useState, useEffect } from "react";
//import Header from "../../common/header/Login";
import { TabPanel, a11yProps } from "../../common/tabPanel/TabPanel";
import { Box, Tab, Tabs, Typography } from "@material-ui/core";
// import Register from "../register/Register";
import ContactUs from "../contactus/ContactUs";
//import Login from "../login/Login";
import AdminReport from "../adminReport/AdminReport";
import Dashboard from "../dashboard/Dashboard";
import { CommonHeader } from "../../common/header/CommonHeader";
import Login from "../../common/header/Login";
import "./Home.css";
import { FrontPage } from "./FrontPage";
import { Menu, TextField, MenuItem } from "@mui/material";
import SearchByBloodBank from "../search/SearchByBloodBank";
import RegisterBloodBank from "../register/RegisterBloodBank";
//import SearchByBloodGroup from "../search/SearchByBloodGroup";
/**
 * This component displays the Header component on top with DoctorList and Appointment Components in tabs
 * @param baseUrl
 * @param accessToken
 * @param setAccessToken
 * @param loggedInUserId
 * @param setLoggedInUserId
 * @returns {JSX.Element}
 * @constructor
 */
const Home = ({
  baseUrl,
  accessToken,
  setAccessToken,
  loggedInUserId,
  setLoggedInUserId,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // useEffect(() => {
  //   console.log("Access token in home" + accessToken);
  //   //setAccessToken(accessToken);
  // }, [accessToken]);
  // const [anchorEl, setAnchorEl] = useState(null);
  // const openMenu = Boolean(anchorEl);
  // const handleClick = (e) => {
  //   setAnchorEl(e.current.target);
  //   console.log(e.current.target);
  // };

  // const handleCLose = () => {
  //   setAnchorEl(null);
  // };

  const validateEmail = (email) => {
    let validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validEmailRegex)) {
      return false;
    }

    return true;
  };

  return (
    <React.Fragment>
      <CommonHeader />
      <Login
        baseUrl={baseUrl}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        loggedInUserId={loggedInUserId}
        setLoggedInUserId={setLoggedInUserId}
        validateEmail={validateEmail}
      />
      <div className="home-container">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            indicatorColor="primary"
            variant="fullWidth"
          >
            {/* //admin report // registration // search //contact us */}
            <Tab label="Home" {...a11yProps(0)} />
            <Tab label="Dashboard" {...a11yProps(1)} />
            <Tab label="Registration" {...a11yProps(2)} />
            <Tab label="Search" {...a11yProps(3)} />
            <Tab label="Admin Report" {...a11yProps(4)} />
            <Tab label="Contact Us" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <FrontPage
            baseUrl={baseUrl}
            accessToken={accessToken}
            loggedInUserId={loggedInUserId}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Dashboard
            baseUrl={baseUrl}
            accessToken={accessToken}
            loggedInUserId={loggedInUserId}
          />
          {/* Dashboard */}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RegisterBloodBank
            baseUrl={baseUrl}
            accessToken={accessToken}
            loggedInUserId={loggedInUserId}
            validateEmail={validateEmail}
          />
          {/* Register */}
        </TabPanel>
        <TabPanel
          value={value}
          index={3}
          // aria-controls="search-menu"
          // aria-haspopup="true"
          // aria-expanded={openMenu ? "true" : undefined}
          // onClick={handleClick}
        >
          <SearchByBloodBank
            baseUrl={baseUrl}
            accessToken={accessToken}
            loggedInUserId={loggedInUserId}
            setAccessToken={setAccessToken}
          />
          {/* Search */}
          {/* Drop-down items */}
          {/* <Menu
            id="search-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCLose}
          >
            <MenuItem onClick={handleCLose}>By Blood Bank</MenuItem>
            <MenuItem onClick={handleCLose}>By Blood Group</MenuItem>
          </Menu> */}
          {/* Search */}
        </TabPanel>
        <TabPanel value={value} index={4}>
          <AdminReport
            baseUrl={baseUrl}
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            loggedInUserId={loggedInUserId}
            setLoggedInUserId={setLoggedInUserId}
          />
          {/* Contact US */}
        </TabPanel>

        <TabPanel value={value} index={5}>
          <ContactUs
            baseUrl={baseUrl}
            accessToken={accessToken}
            loggedInUserId={loggedInUserId}
          />
          {/* Contact US */}
        </TabPanel>

        <footer>
          <div>
            Copyright © 2022,Designed & Developed by CDAC Chennai Govt. of
            India. All Rights Reserved.
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Home;

/*
import React from "react";
import {TabPanel, a11yProps} from "../../common/tabPanel/TabPanel.js";
import {Box, Tab, Tabs} from "@material-ui/core";
*/
/**
 * This component displays the Header component on top with DoctorList and Appointment Components in tabs
 * @param baseUrl
 * @param accessToken
 * @param setAccessToken
 * @param loggedInUserId
 * @param setLoggedInUserId
 * @returns {JSX.Element}
 * @constructor
 */

/*
const Home = ({baseUrl, accessToken, setAccessToken, loggedInUserId, setLoggedInUserId}) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <React.Fragment>
        <div className="home-container">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor="primary"
                      variant="fullWidth">
                    <Tab label="DOCTORS" {...a11yProps(0)} />
                    <Tab label="APPOINTMENT" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                Hello
            </TabPanel>
            <TabPanel value={value} index={1}>
                Hi
            </TabPanel>
        </div>
    </React.Fragment>;
}

*/

//export default Home;
