import React, { useState, useEffect } from "react";
import { Box, TextField, MenuItem, Select } from "@mui/material";
import { FrontPage } from "../home/FrontPage";

export const BloodGroupSelect = ({
  bloodgroup,
  setBloodGroup,
  form,
  setForm,
}) => {
  useEffect(() => {
    // setForm((state) => ({ ...state, bloodgroup: bloodgroup }));
    const state = form;
    state["bloodgroup"] = bloodgroup;
    setForm({ ...state });
    console.log(form, bloodgroup);
  }, [bloodgroup]);

  // const [bloodgroup, setBloodGroup] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setBloodGroup(value);
    // setForm((values) => ({ ...values, bloodgroup: bloodgroup }));
    // setForm((state) => ({ ...state, bloodgroup: value }));

    console.log(bloodgroup);
    //setBloodGroup(event.target.value as string)
  };
  return (
    <Box width="500px">
      {/* <TextField
        className="dropdown"
        // label="Select BloodGroup"
        select
        value={bloodgroup}
        onChange={handleChange}
        fullwidth
        size="small"
        color="secondary" */}

      <Select
        labelId="select-bloodgroup-label"
        id="select-bloodgroup"
        value={bloodgroup}
        onChange={handleChange}
        // value={optionsState}
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
        <MenuItem value="ab-"> AB_NEGATIVE </MenuItem> {/* </TextField>{" "} */}
      </Select>
    </Box>
  );
};
