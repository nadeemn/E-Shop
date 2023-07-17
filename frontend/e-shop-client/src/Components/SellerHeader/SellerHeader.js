import { Stack, Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const SellerHeader = () => {
    const navigate = useNavigate();

    return (
        <Stack
            spacing={2}
            direction={"row"}
            padding={5}
            sx=
            {{
                height: "80px",
                boxSizing: "border-box",
                alignItems: "center",
                justifyContent: "flex-start",
                borderBottom: "1px solid #00000012",
                width: "100%",
                textAlign:"left"
            }}
        >
            <Box
                component="img"
                sx={{
                    height: 50,
                    width: 200,
                    cursor: "pointer",
                }}
                alt="The house from the offer."
                src="/brand-logo.jpg"
                onClick={() => navigate("/")}
            ></Box>
        </Stack>
    );
};
