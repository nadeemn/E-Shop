import React, { useState } from "react";
import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
const submitButton = {
    marginRight: 2,
};

function SellerRegisterForm(props) {

    const [formData, setFormData] = useState({});

    const handleChange = (event) => {
        setFormData({
            ...formData, [event.target.name] : event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("http://127.0.0.1:5000/api/addSeller", formData)
        .then((response) => {
            if(response.status === 200) {
                alert("registration successfull")
                window.location.reload();
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    return (
        <Box>
            <Typography
                variant="h5"
                sx={{
                    marginBottom: "25px",
                    textAlign: "center",
                }}
            >
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3} direction={"column"}>
                    <Box
                        sx={{
                            margin: "0 auto",
                            width: 400,
                        }}
                    >
                        <TextField
                            id="businessName"
                            label="Business Name"
                            variant="outlined"
                            helperText="Please enter your Business Name"
                            size="small"
                            name="_seller_name"
                            onChange={handleChange}
                            sx={{ marginBottom: 2 }}
                            fullWidth
                            required
                        />
                        <TextField
                            id="username"
                            label="Email"
                            variant="outlined"
                            helperText="Please enter your Business Email"
                            type="email"
                            size="small"
                            name="_seller_email"
                            onChange={handleChange}
                            sx={{ marginBottom: 2 }}
                            fullWidth
                            required
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            size="small"
                            variant="outlined"
                            helperText="Enter your password"
                            onChange={handleChange}
                            name="_seller_password"
                            sx={{ marginBottom: 2 }}
                            fullWidth
                            required
                        />
                        <Stack
                            spacing={3}
                            direction={"row"}
                            sx={{
                                justifyContent: "center",
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
                        </Stack>
                    </Box>
                </Stack>
            </form>
            <p style={{ textAlign: "center", margin: "2em" }}>
                Alread a member?
                <Button variant="text" onClick={() => props.setSignUp(false)}>
                    Sign In
                </Button>
            </p>
        </Box>
    );
}

export default SellerRegisterForm;
