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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { UserInbox } from "../UserInbox/UserInbox";

function MyProfile() {
    const navigate = useNavigate();
    const [activeUser, setActiveUser] = useState([]);
    const [activeContent, setActiveContent] = useState("main-content");

    const handleActiveContent = (content) => {
        setActiveContent(content);
    };

    const handleLogoutButton = () => {
        sessionStorage.removeItem("user_token");
        navigate("/");
    };

    const getProfileInfo = async () => {
        const opts = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("user_token"),
            },
        };

        const resp = await fetch("http://127.0.0.1:5000/api/getUser", opts);

        const data = await resp.json();
        if (resp.status !== 200) {
            alert(data.msg);
        } else {
            setActiveUser(data)
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem("user_token")) {
            getProfileInfo();
        }
    }, []);

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
                        <ListItemButton onClick={() => handleActiveContent("my-inbox")}>
                            <ListItemText primary={"My Inbox"}></ListItemText>
                        </ListItemButton>
                        <Divider />
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
                {sessionStorage.getItem("user_token") && activeContent === "main-content" ? (
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
                {sessionStorage.getItem("user_token") &&
                    activeContent === "profile-content" ? (
                    <>
                        <Typography
                            variant="body1"
                            sx={{ position: "relative", top: "10%" }}
                            textAlign={"left"}
                        >
                            Name: {activeUser._first_name + " " +  activeUser._last_name}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ position: "relative", top: "10%" }}
                            textAlign={"left"}
                        >
                            Email Address: {activeUser._email}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ position: "relative", top: "10%" }}
                            textAlign={"left"}
                        >
                            My Delivery Address: {activeUser._address + ", " + activeUser._city + ", " + activeUser._country}
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
                {sessionStorage.getItem("user_token") && activeContent === "my-inbox" ? (
                    <UserInbox />
                ) : (
                    ""
                )}
            </Stack>
        </Stack>
    );
}

export default MyProfile;
