import React, { useState } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import "./Search.css";

export const Quantity = () => {
  const [quantity, setQuantity] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
    //setBloodGroup(event.target.value as string)
  };
  return (
    <Box width="500px">
      <TextField
        className="dropdown"
        // label="Select"
        select
        value={quantity}
        onChange={handleChange}
        fullwidth
        size="small"
        color="secondary"
        // helperText="Please select your Blood Group"
      >
        <MenuItem value="1">1 packet</MenuItem>
        <MenuItem value="2">2 packet</MenuItem>
        <MenuItem value="3">3 packet</MenuItem>
        <MenuItem value="4">4 packet</MenuItem>
        <MenuItem value="5">5 packet</MenuItem>
        <MenuItem value="6">6 packet</MenuItem>
        <MenuItem value="7">7 packet</MenuItem>
        <MenuItem value="8">8 packet</MenuItem>
        <MenuItem value="9">9 packet</MenuItem>
        <MenuItem value="10">10 packet</MenuItem>
      </TextField>
    </Box>
  );
};
