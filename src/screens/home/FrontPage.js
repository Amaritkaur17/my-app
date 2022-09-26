import React, { useState, useEffect } from "react";
import "./FrontPage.css";
import locations from "../search/locations";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(5),
    // minWidth: 5000,
    margin: theme.spacing(5),
    minWidth: 440,
  },
}));
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

export const FrontPage = ({
  baseUrl,
  accessToken,
  setAccessToken,
  loggedInUserId,
  setLoggedInUserId,
}) => {
  const registerClasses = useRegisterStyles();
  const classes = useStyles();
  console.log("Access token" + JSON.stringify(accessToken));

  // ------------------------------------------useState-----------------------------------------------

  const [requestForm, setRequestForm] = useState({
    location: "",
    address: "",
    bloodgroup: "",
    quantity: "",
    user_id: "",
  });

  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [bloodgroup, setBloodGroup] = useState("");
  //-------------------------------requestform---------------------------------------------
  const requestInputChangedHandler = (e) => {
    const state = requestForm;
    state[e.target.name] = e.target.value;
    console.log("Changing values for requestForm", requestForm);
    setRequestForm({ ...state });
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleBloodGroupChange = (event) => {
    setBloodGroup(event.target.value);
  };
  ///---------------------------------------------handle request---------------------------------------------------

  //---------------------------------------fetch --------------------------------------------------------------
  const fetchUserId = async () => {
    const rawResponse = await fetch(
      `${baseUrl}bb/users/getUserIdFromAccessToken/${accessToken}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    const response = await rawResponse.text();
    return { rawResponse, response };
  };
  const fetchRegister = async (requestForm) => {
    const { rawResponse, response } = await fetchUserId();
    console.log("User Id---------", response);
    const body = {
      address: address,
      location: location,
      bloodGroup: bloodgroup,
      quantity: requestForm.quantity,
      user_id: response,
    };
    const rawResponseReg = await fetch(baseUrl + "bb/user/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(body),
    });
    //   const responseReg = await rawResponseReg.json();

    return { rawResponseReg };
  };

  ///---------------------------------------------request handle--------------------------------------------
  const handleRequest = async (e) => {
    e.preventDefault();

    const { rawResponseReg } = await fetchRegister(requestForm);
    if (rawResponseReg.ok) {
      const msg = document.getElementById("reg-alert");
      msg.classList.remove("hide-message");
      msg.classList.add("show-message");

      // setRequestForm({
      //   location: "",
      //   address: "",
      //   bloodgroup: "",
      //   quantity: "",
      //   user_id: "",
      // });
    }
  };

  // --------------------------------------------------- return ---------------------------------------------------

  return (
    <form className={registerClasses.root}>
      {/* ---------------------------------------location--------------------------------------- */}
      <FormControl>
        <InputLabel htmlFor="register-location">Location *</InputLabel>
        <Select
          labelId="select-location-label"
          id="location"
          name="location"
          value={location}
          onChange={handleLocationChange}
          displayEmpty
          className="dropdown"
        >
          <MenuItem value="Nashik"> Nashik </MenuItem>{" "}
          <MenuItem value="Mumbai"> Mumbai </MenuItem>{" "}
          <MenuItem value="Pune"> Pune </MenuItem> {/* </TextField>{" "} */}
        </Select>
        {/* <FormHelperText id="location-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText> */}
      </FormControl>
      {/* -----------------------------------------------------address------------------------------------------ */}
      <FormControl>
        <InputLabel htmlFor="register-password">Address *</InputLabel>
        <Select
          labelId="select-address-label"
          value={address}
          displayEmpty
          className="dropdown"
          id="address"
          name="address"
          aria-describedby="address"
          onChange={handleAddressChange}
        >
          <MenuItem value="Dwarka"> Dwarka </MenuItem>{" "}
          <MenuItem value="Mumbai"> Mumbai </MenuItem>{" "}
          <MenuItem value="Pune"> Pune </MenuItem> {/* </TextField>{" "} */}
        </Select>

        {/* <FormHelperText id="address-empty-error" className="floating-error">
            Please fill out this field
          </FormHelperText> */}
      </FormControl>
      {/* -------------------------------- blood group ------------------------------------------------- */}
      <FormControl>
        <InputLabel htmlFor="blood-group">Blood Group</InputLabel>

        <Select
          labelId="select-bloodgroup-label"
          id="bloodgroup"
          name="bloodgroup"
          value={bloodgroup}
          onChange={handleBloodGroupChange}
          displayEmpty
          className="dropdown"
        >
          <MenuItem value="a+"> A_POSITIVE </MenuItem>{" "}
          <MenuItem value="b+"> B_POSITIVE </MenuItem>{" "}
          <MenuItem value="o+"> O_POSITIVE </MenuItem>{" "}
          <MenuItem value="ab+"> AB_POSITIVE </MenuItem>{" "}
          <MenuItem value="a-"> A_NEGATIVE </MenuItem>{" "}
          <MenuItem value="b-"> B_NEGATIVE </MenuItem>{" "}
          <MenuItem value="o-"> O_NEGATIVE </MenuItem>{" "}
          <MenuItem value="ab-"> AB_NEGATIVE </MenuItem>{" "}
          {/* </TextField>{" "} */}
        </Select>
      </FormControl>
      {/* ----------------------------Quantity------------------------------------------------- */}
      <FormControl>
        <InputLabel htmlFor="register-location">Quantity</InputLabel>
        <input
          type="number"
          id="quantity"
          name="quantity"
          form={requestForm}
          setForm={setRequestForm}
          onChange={requestInputChangedHandler}
        />
        {/* <FormHelperText id="location-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText> */}
      </FormControl>
      {/* ------------------------------------userid---------------------------------------------------- */}
      <FormControl>
        <InputLabel htmlFor="register-location">User Id</InputLabel>
        <input
          type="number"
          id="user_id"
          name="user_id"
          onChange={requestInputChangedHandler}
        />
        {/* <FormHelperText id="location-empty-error" className="floating-error">
          Please fill out this field
        </FormHelperText> */}
      </FormControl>
      {/* ---------------------button-------------------------------------------------------- */}
      <Button
        id="search-btn"
        className="modal-action-btn"
        variant="contained"
        color="primary"
        onClick={handleRequest}
      >
        Search{" "}
      </Button>{" "}
      <Alert severity="success" className="hide-message" id="reg-alert">
        Request Sent Successfully!
      </Alert>
    </form>
  );
};
/* <section class="general info">
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item">
              <img
                class="d-block w-100"
                src="slider.jpg"
                alt="Ministry of Railways"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100"
                src="Slider1.jpg"
                alt="Ministry of Social Justice and Empowerment"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100"
                src="slider2.jpg"
                alt="Ministry of Tribal Affairs"
              />
            </div>
          </div>
        </div>
      </section> */
