import React, { Component } from "react";
import Header from "../../common/header/Header";
import { TabPanel, a11yProps } from "../../common/tabPanel/TabPanel";
import { Box, Tab, Tabs } from "@material-ui/core";
import Register from "../register/Register";
import ContactUs from "../contactus/ContactUs";
import Search from "../search/Search";
import Login from "../login/Login";
import AdminReport from "../adminReport/AdminReport";
import Dashboard from "../dashboard/Dashboard";

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

  return (
    <React.Fragment>
      <Header
        baseUrl={baseUrl}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        loggedInUserId={loggedInUserId}
        setLoggedInUserId={setLoggedInUserId}
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
          <Home
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
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Register
            baseUrl={baseUrl}
            accessToken={accessToken}
            loggedInUserId={loggedInUserId}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Search
            baseUrl={baseUrl}
            accessToken={accessToken}
            loggedInUserId={loggedInUserId}
          />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <AdminReport
            baseUrl={baseUrl}
            accessToken={accessToken}
            loggedInUserId={loggedInUserId}
          />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <ContactUs
            baseUrl={baseUrl}
            accessToken={accessToken}
            loggedInUserId={loggedInUserId}
          />
        </TabPanel>
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
