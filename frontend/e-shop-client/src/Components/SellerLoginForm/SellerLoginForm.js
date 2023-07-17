import { useEffect, useState } from "react";
import React from "react";
import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const textField = {
    marginBottom: 2,
};

const submitButton = {
    marginRight: 2,
};

function SellerLoginForm(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token")
        if (storedToken) {
            setToken(storedToken)
        }
    }, [])

    useEffect(() => {
        console.log(token)
        if (token) {
            navigate("/seller-page/profile")
        }
    }, [token, navigate])

    const login = async (username, password) => {
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
            const resp = await fetch("http://127.0.0.1:5000/api/seller-login", opts);
            const data = await resp.json();
            if(resp.status !==200) {
                alert(data.msg);
            }
            sessionStorage.setItem("token", data.access_token);
            setToken(data.access_token);
            return true;
        } catch (error) {
            alert(error.msg);
        }
    }
    const handleSellerLogin = async (e) => {
        e.preventDefault();
        login(username, password)
    };

    return (
        <Box>
            {token && token !== "" && token !== undefined ? (
                <Typography variant="body1" sx={{wordBreak: "break-word"}}>
                    You are logged in with this token {token}
                </Typography>
            ) : (
                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            marginBottom: "25px",
                            textAlign: "center",
                        }}
                    >
                        Sign in to your account
                    </Typography>
                    <form onSubmit={handleSellerLogin}>
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
                                    autoComplete="off"
                                    value={password}
                                    sx={{ textField }}
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
                            </Stack>
                        </Stack>
                    </form>
                    <p style={{ textAlign: "center", margin: "2em" }}>
                        Not a member?
                        <Button variant="text" onClick={() => props.setSignUp(true)}>
                            Sign up
                        </Button>
                    </p>
                </Box>
            )}

        </Box>
    );
}

export default SellerLoginForm;
