import React, { forwardRef, useState } from "react";
import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const submitButton = {
  marginRight: 2,
};

export const SignUpForm = forwardRef((props, ref) => {
  const { formClose } = props;
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5000/api/addUser", formData)
      .then((response) => {
        if (response.status === 200) {
          alert("Registration Succesfull");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={style} ref={ref} tabIndex="-1">
      <Typography
        id="modal-modal-title"
        variant="h5"
        sx={{
          marginBottom: "25px",
          textAlign: "center",
        }}
      >
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction={"row"} sx={{ flexWrap: "wrap" }}>
          <TextField
            id="firstname"
            label="First Name"
            helperText="Please enter your First Name"
            variant="outlined"
            size="small"
            sx={{ margin: 1, width: "47%" }}
            name="_first_name"
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            id="lastname"
            label="Last Name"
            variant="outlined"
            helperText="Please enter your Last Name"
            size="small"
            sx={{ margin: 1, width: "47%" }}
            name="_last_name"
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            id="username"
            label="Email"
            variant="outlined"
            helperText="Please enter your Email"
            type="email"
            size="small"
            sx={{ margin: 1, width: "47%" }}
            name="_email"
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            size="small"
            variant="outlined"
            sx={{ margin: 1, width: "47%" }}
            helperText="Enter your password"
            name="_password"
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            size="small"
            sx={{ margin: 1 }}
            helperText="Please enter your Address"
            name="_address"
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            id="city"
            label="City"
            variant="outlined"
            size="small"
            sx={{ margin: 1, width: "47%" }}
            name="_city"
            onChange={handleChange}
            helperText="Enter the City"
            fullWidth
            required
          />
          <TextField
            id="state"
            label="State / Province"
            variant="outlined"
            size="small"
            sx={{ margin: 1, width: "47%" }}
            name="_state"
            onChange={handleChange}
            helperText="Enter the State"
            fullWidth
            required
          />
          <TextField
            id="postalcode"
            label="ZIP / Postal code"
            variant="outlined"
            size="small"
            sx={{ margin: 1, width: "47%" }}
            name="_postal_code"
            onChange={handleChange}
            helperText="Enter the Postcal Code"
            fullWidth
            required
          />
          <TextField
            id="country"
            label="Country"
            variant="outlined"
            size="small"
            sx={{ margin: 1, width: "47%" }}
            name="_country"
            onChange={handleChange}
            helperText="Enter the Country"
            fullWidth
            required
          />
        </Stack>
        <Stack
          spacing={3}
          direction={"row"}
          sx={{
            justifyContent: "center",
            marginTop: '25px'
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ submitButton }}
          >
            Register
          </Button>
          <Button variant="outlined" onClick={formClose}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Box>
  );
});
