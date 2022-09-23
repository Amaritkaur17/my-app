import React, { useState } from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Register from "./register/Register";
import Search from "./search/Search";
import ContactUs from "./contactus/ContactUs";
import AdminReport from "./adminReport/AdminReport";

const Controller = () => {
  const baseUrl = "http://localhost:8080/";
  const [accessToken, setAccessToken] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");

  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                baseUrl={baseUrl}
                accessToken={accessToken}
                setAccessToken={setAccessToken}
                loggedInUserId={loggedInUserId}
                setLoggedInUserId={setLoggedInUserId}
              />
            }
          />

          <Route
            exact
            path="/all"
            element={
              <Dashboard
                baseUrl={baseUrl}
                accessToken={accessToken}
                setAccessToken={setAccessToken}
                loggedInUserId={loggedInUserId}
                setLoggedInUserId={setLoggedInUserId}
              />
            }
          />
          <Route
            exact
            path="/"
            element={
              <AdminReport
                baseUrl={baseUrl}
                accessToken={accessToken}
                setAccessToken={setAccessToken}
                loggedInUserId={loggedInUserId}
                setLoggedInUserId={setLoggedInUserId}
              />
            }
          />

          <Route
            exact
            path="/r"
            element={
              <Register
                baseUrl={baseUrl}
                accessToken={accessToken}
                setAccessToken={setAccessToken}
                loggedInUserId={loggedInUserId}
                setLoggedInUserId={setLoggedInUserId}
              />
            }
          />

          <Route
            exact
            path="/location/{location}"
            element={
              <Search
                baseUrl={baseUrl}
                accessToken={accessToken}
                setAccessToken={setAccessToken}
                loggedInUserId={loggedInUserId}
                setLoggedInUserId={setLoggedInUserId}
              />
            }
          />

          <Route
            exact
            path="/r"
            element={
              <ContactUs
                baseUrl={baseUrl}
                accessToken={accessToken}
                setAccessToken={setAccessToken}
                loggedInUserId={loggedInUserId}
                setLoggedInUserId={setLoggedInUserId}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default Controller;
