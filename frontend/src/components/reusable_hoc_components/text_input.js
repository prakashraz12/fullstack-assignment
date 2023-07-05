import { Box, TextField, Typography } from "@mui/material";
import React from "react";

const TextInput = ({
  label,
  onBlur,
  onChange,
  name,
  onClick,
  multiline,
  rows,
  value,
  onFocus,
}) => {
  return (
    <>
      <Box>
        <Typography variant="body1" component={"h6"}>
          {label}
        </Typography>
        <TextField
          value={value}
          onChange={onChange}
          onClick={onClick}
          onBlur={onBlur}
          onFocus={onFocus}
          name={name}
          multiline={multiline}
          rows={rows}
          fullWidth
          size="small"
        />
      </Box>
    </>
  );
};

export default TextInput;
