import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import locations from "./locations";
import Button from "@material-ui/core/Button";
import { DataGrid } from "@mui/x-data-grid";
import "./styles.css";
import { render } from "@testing-library/react";
import { json } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(5),
    minWidth: 240,
  },
}));

// ========================================== use state of dropdown ================================================
const SearchByBloodBank = ({
  baseUrl,
  accessToken,
  loggedInUserId,
  setAccessToken,
}) => {
  const classes = useStyles();
  console.log("Access token" + JSON.stringify(accessToken));
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [tableData, setTableData] = useState([]);
  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
    console.log(event.target.value);
  };
  useEffect(() => {
    console.log("access token  in searchbyjsdhksd" + accessToken);
    //setAccessToken(accessToken);
  }, [accessToken]);
  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
    console.log(event.target.value);
  };

  const fetchBloodGroupByLocation = async () => {
    const rawResponseReg = await fetch(
      `http://localhost:8080/bb/location/${location}/${address}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    const responseReg = await rawResponseReg.json();

    return responseReg;
  };

  const handleSearch = async () => {
    const responseReg = await fetchBloodGroupByLocation();
    let rowData = [];
    responseReg.forEach((item) => {
      for (const [key, value] of Object.entries(item.bloodGroupIntegerMap)) {
        const data = {
          id: Math.floor(Math.random() * 100),
          name: item.name,
          email: item.email,
          contactNumber: item.contactNumber,
          bloodGroup: key,
          quantity: value,
        };

        console.log(`${key}: ${value}`);
        console.log(data);
        const prevTableData = rowData;
        console.log("Table data" + JSON.stringify(rowData));
        rowData.push(data);
        //       setTableData([...rowData, data]);
        console.log("Table data" + JSON.stringify(rowData));
      }
    });
    setTableData(rowData);

    // console.log("Mera data", responseReg);
  };
  // };

  // =================================================================
  //   bloodGroupIntegerMap
  // :
  // {A_POSITIVE: 10, B_POSITIVE: 10}
  // contactNumber
  // :
  // "1212121212"
  // email
  // :
  // "Nimani@blood_bank.com"
  // name
  // :
  // "Nimani Blood Bank"
  //================================= table=========================================================================

  const columns = [
    { field: "name", headerName: "Blood Bank Name", width: 300 },
    { field: "contactNumber", headerName: "Contact Number", width: 150 },
    { field: "email", headerName: "Email Id", width: 300 },
    { field: "bloodGroup", headerName: "Blood Group", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 100 },
  ];

  // =================================================================================================================
  // render() {
  return (
    <div className="App">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label"> Location </InputLabel>{" "}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={location}
          onChange={handleChangeLocation}
        >
          {" "}
          {locations.map((location) => (
            <MenuItem
              value={location.locationName}
              key={location.locationShortCode}
            >
              {" "}
              {location.locationName}{" "}
            </MenuItem>
          ))}{" "}
        </Select>{" "}
      </FormControl>{" "}
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label"> Address </InputLabel>{" "}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={address}
          onChange={handleChangeAddress}
          disabled={!location}
        >
          {" "}
          {location
            ? locations
                .find(({ locationName }) => locationName === location)
                .addresses.map((address) => (
                  <MenuItem value={address.name} key={address.shortCode}>
                    {" "}
                    {address.name}{" "}
                  </MenuItem>
                ))
            : []}{" "}
        </Select>{" "}
      </FormControl>{" "}
      <div>
        <br />
        <br />
        <Button
          id="search-btn"
          className="modal-action-btn"
          variant="contained"
          color="primary"
          onClick={handleSearch}
        >
          Search{" "}
        </Button>{" "}
      </div>
      <div style={{ height: 700, width: "70%" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          pageSize={10}
          //    checkboxSelection
          // onSelectionModelChange={({ selectionModel }) => {
          //   const rowIds = selectionModel.map((rowId) =>
          //     parseInt(String(rowId), 10)
          //   );
          //   // const rowsToDelete = DataTable.filter((row) =>
          //   //   rowIds.includes(row.id)
          //   // );
          //   // setDeletedRows(rowsToDelete);
          //   // console.log(deletedRows);
          // }}
        />{" "}
      </div>{" "}
    </div>
  );
  // }
};
// };

export default SearchByBloodBank;
