import React, { useState } from "react";
import { Box, TextField, MenuItem } from "@mui/material";

export const BloodGroupSelect = () => {
  const [bloodgroup, setBloodGroup] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBloodGroup(event.target.value);
    //setBloodGroup(event.target.value as string)
  };
  return (
    <Box width="500px">
      <TextField
        label="Select BloodGroup"
        select
        value={bloodgroup}
        onChange={handleChange}
        fullwidth
        size="small"
        color="secondary"
        helperText="Please select your Blood Group"
      >
        <MenuItem value="a+">A_POSITIVE</MenuItem>
        <MenuItem value="b+">B_POSITIVE</MenuItem>
        <MenuItem value="o+">O_POSITIVE</MenuItem>
        <MenuItem value="ab+">AB_POSITIVE</MenuItem>
        <MenuItem value="a-">A_NEGATIVE</MenuItem>
        <MenuItem value="b-">B_NEGATIVE</MenuItem>
        <MenuItem value="o-">O_NEGATIVE</MenuItem>
        <MenuItem value="ab-">AB_NEGATIVE</MenuItem>
      </TextField>
    </Box>
  );
};
