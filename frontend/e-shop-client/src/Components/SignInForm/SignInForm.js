import React, { useEffect } from "react";
import { useState, forwardRef } from "react";
import { Box, Typography, Stack, TextField, Button } from "@mui/material";

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

const textField = {
  marginBottom: 2,
};

const submitButton = {
  marginRight: 2,
};

export const SignInForm = forwardRef((props, ref) => {
  const { formClose, toggleSignUpForm } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleToggleForm = () => {
    toggleSignUpForm(false);
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if(token) {
      window.location.reload()
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    };

    try {
      const resp = await fetch("http://127.0.0.1:5000/api/login", opts);
      const data = await resp.json();
      if (resp.status !== 200) {
        alert(data.msg);
      }
      sessionStorage.setItem("user_token", data.access_token);
      setToken(data.access_token);
      return true;
    } catch (error) {
      alert(error);
    }
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
        Sign in to your account
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
              id="username"
              label="Username"
              variant="outlined"
              size="small"
              sx={{ textField }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            />
          </Box>
          <Box
            sx={{
              marginRight: "auto !important",
              marginLeft: "auto !important",
              width: 400,
            }}
          >
            <TextField
              id="password"
              label="Password"
              type="password"
              size="small"
              variant="outlined"
              sx={{ textField }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
          </Box>

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
              Sign In
            </Button>
            <Button variant="outlined" onClick={formClose}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
      <p style={{ textAlign: "center", margin: "2em" }}>
        Not a member?
        <Button variant="text" onClick={handleToggleForm}>
          Sign up
        </Button>
      </p>
    </Box>
  );
});
