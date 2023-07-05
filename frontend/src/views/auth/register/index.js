import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import TextInput from "../../../components/reusable_hoc_components/text_input";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{minHeight:"50vh", maxWidth: 500, padding:"20px"}}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5" fontWeight={"bold"}>
                    Register
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput label={"Full Name"} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput label={"Email"} />
            </Grid>
            <Grid item xs={12}>
              <TextInput label={"Password"} />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Show Password" />
            </Grid>
            <Grid  item xs={12}>
                <Button variant="contained" disableElevation fullWidth>Register</Button>
            </Grid>

          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
