import React, { useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import SellerLoginForm from "../SellerLoginForm/SellerLoginForm";
import SellerRegisterForm from "../SellerRegisterForm/SellerRegisterForm";

function SellerLogin() {
    const [Signup, setSignUp] = useState(false);
    return (
        <Box
            sx={{
                padding: "50px",
                margin: "45px",
                backgroundColor: "#9893e61c",
            }}
        >
            <Box
                sx={{
                    padding: "25px",
                }}
            >
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-around"}
                >
                    <Box
                        sx={{
                            textAlign: "left",
                        }}
                    >
                        <Typography variant="h3">The best place</Typography>
                        <Typography variant="h3" color={"#3b71ca"}>
                            for your business
                        </Typography>
                    </Box>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "50px",
                            maxWidth: "50%"
                        }}
                    >
                        {!Signup ? (
                            <SellerLoginForm setSignUp={setSignUp}></SellerLoginForm>
                        ) : (
                            <SellerRegisterForm setSignUp={setSignUp} />
                        )}
                    </Paper>
                </Stack>
            </Box>
        </Box>
    );
}

export default SellerLogin;
