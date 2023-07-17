import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Box,
    Typography,
    Button,
    ListItemIcon,
    Divider,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddProduct from "../AddProduct/AddProduct";
import ExpiredDiscount from "../ExpiredDiscounts/ExpiredDiscount";
import MyOffers from "../MyOffers/MyOffers";
import { MyInbox } from "../MyInbox/MyInbox";

function SellerProfile() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setMail] = useState("");
    const [activeContent, setActiveContent] = useState("main-content");

    const handleActiveContent = (content) => {
        setActiveContent(content);
    };

    const handleLogoutButton = () => {
        sessionStorage.removeItem("token");
        navigate("/seller-page");
    };

    const getSellerInfo = useCallback( async () => {
        const opts = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        };

        const resp = await fetch("http://127.0.0.1:5000/api/getSeller", opts);

        const data = await resp.json();
        if (resp.status !== 200) {
            alert(data.msg);
            if(data.msg === "Token has expired") {
                sessionStorage.removeItem("token");
                navigate("/seller-page");
            }
        }
        setName(data.name);
        setMail(data.email);
    }, [navigate]);

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            getSellerInfo();
        }
    }, [getSellerInfo]);

    return (
        <Stack
            spacing={2}
            direction="row"
            sx={{ backgroundColor: "#eeebeb7d" }}
            marginBottom="20px"
        >
            <Stack direction="column" width="25%" minHeight={"500px"}>
                <Box
                    sx={{
                        border: "1px solid white",
                        backgroundColor: "white",
                        margin: "20px",
                    }}
                >
                    <List sx={{ width: "100%" }}>
                        <ListItem sx={{ backgroundColor: "#286198d1", color: "white" }}>
                            <ListItemText primary="Dashboard"></ListItemText>
                            <ListItemIcon>
                                <DashboardIcon sx={{ color: "white" }} />
                            </ListItemIcon>
                        </ListItem>
                        <ListItemButton
                            onClick={() => handleActiveContent("profile-content")}
                        >
                            <ListItemText primary={"My Profile"}></ListItemText>
                        </ListItemButton>
                        <Divider />
                        <ListItemButton onClick={() => handleActiveContent("products")}>
                            <ListItemText primary={"My Products"}></ListItemText>
                        </ListItemButton>
                        <Divider />
                        <ListItemButton
                            onClick={() => handleActiveContent("my-offers")}
                        >
                            <ListItemText primary={"My Offers"}></ListItemText>
                        </ListItemButton>
                        <Divider />
                        <ListItemButton
                            onClick={() => handleActiveContent("expired-discounts")}
                        >
                            <ListItemText primary={"My Expired Discounts"}></ListItemText>
                        </ListItemButton>
                        <Divider />
                        <ListItemButton
                            onClick={() => handleActiveContent("my-inbox")}
                        >
                            <ListItemText primary={"My Inbox"}></ListItemText>
                        </ListItemButton>
                    </List>
                </Box>
            </Stack>
            <Stack
                direction="column"
                width="75%"
                padding="40px"
                sx={{ margin: "20px 20px 20px 10px !important" }}
                backgroundColor="white"
            >
                {sessionStorage.getItem("token") && activeContent === "main-content" ? (
                    <Typography
                        variant="h5"
                        sx={{ position: "relative", top: "10%" }}
                        textAlign={"left"}
                    >
                        You are logged in
                    </Typography>
                ) : (
                    ""
                )}
                {sessionStorage.getItem("token") &&
                    activeContent === "profile-content" ? (
                    <>
                        <Typography
                            variant="body1"
                            sx={{ position: "relative", top: "10%" }}
                            textAlign={"left"}
                        >
                            Name: {name}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ position: "relative", top: "10%" }}
                            textAlign={"left"}
                        >
                            Email Address: {email}
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={handleLogoutButton}
                            color="primary"
                            sx={{ width: "150px", top: "20%" }}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    ""
                )}
                {sessionStorage.getItem("token") && activeContent === "products" ? (
                    <AddProduct />
                ) : (
                    ""
                )}
                   {sessionStorage.getItem("token") &&
                    activeContent === "my-offers" ? (
                    <MyOffers />
                ) : (
                    ""
                )}
                {sessionStorage.getItem("token") &&
                    activeContent === "expired-discounts" ? (
                    <ExpiredDiscount />
                ) : (
                    ""
                )}
                {sessionStorage.getItem("token") &&
                    activeContent === "my-inbox" ? (
                    <MyInbox />
                ) : (
                    ""
                )}
            </Stack>
        </Stack>
    );
}

export default SellerProfile;
