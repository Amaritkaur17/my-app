import React, { useState } from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import ContactUs from "./contactus/ContactUs";
import AdminReport from "./adminReport/AdminReport";
import ShowDetails from "./search/ShowDetails";
import SearchByBloodBank from "./search/SearchByBloodBank";
import RegisterBloodBank from "./register/RegisterBloodBank";

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
            path=""
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
              <RegisterBloodBank
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
              <SearchByBloodBank
                baseUrl={baseUrl}
                accessToken={accessToken}
                loggedInUserId={loggedInUserId}
                setAccessToken={setAccessToken}
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
          {/* </Routes> */}

          <Route
            exact
            path="/ShowDetails.js"
            element={
              <ShowDetails
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
