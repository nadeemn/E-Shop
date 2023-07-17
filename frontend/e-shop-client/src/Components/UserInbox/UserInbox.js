import {
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    TextField,
    ListItem,
    Fab,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ContactsIcon from "@mui/icons-material/Contacts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const chatSection = {
    width: "100%",
    height: "78vh",
};
const borderRight500 = {
    borderRight: "1px solid #e0e0e0",
};
const messageArea = {
    height: "65vh",
    overflowY: "auto",
};

export const UserInbox = () => {
    const [senderList, setSenderList] = useState([]);
    const [textChat, setTextChat] = useState([]);
    const [reply, setReply] = useState("");
    const [currentSeller, setCurrentSeller] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/retrieveUserChat", {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("user_token"),
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setSenderList(data);
            });
    }, []);

    const handleRetrieveChat = async (senderid) => {
        setCurrentSeller(senderid)
        const resposne = await fetch(
            "http://127.0.0.1:5000/api/retrieveUserChatMessage",
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("user_token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender: senderid,
                }),
            }
        );
        const data = await resposne.json();
        console.log(data);
        setTextChat(data);
    };

    const handleSendReply = async () => {
        const response = await fetch(
            "http://127.0.0.1:5000/api/userReply",
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("user_token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reply: reply,
                    recepient: currentSeller,
                })
            }
        
        );
        if (response.status === 200) {
                alert("message sent");
                handleRetrieveChat(currentSeller);
                setReply("");
        }
    };

    if (senderList.length > 0) {
        var senderslistitem = senderList.map((item, i) => (
            <ListItem
                button
                key={item.id}
                onClick={() => handleRetrieveChat(item.id)}
            >
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={item.name}>{item.name}</ListItemText>
            </ListItem>
        ));
    }

    if (textChat.length > 0) {
        var conversation = textChat.map((item, i) => (
            <ListItem key={i}>
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText
                            align={item._receiver_id === currentSeller ? "right" : "left"}
                            primary={item._message_body}
                        ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItemText
                           align={item._receiver_id === currentSeller ? "right" : "left"}
                            secondary={item._time_stamp}
                        ></ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
        ));
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" className="header-message">
                        Chat
                    </Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} sx={chatSection}>
                <Grid item xs={3} sx={borderRight500}>
                    <List>
                        <ListItemButton>
                            <ListItemIcon>
                                <ContactsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Contacts"></ListItemText>
                        </ListItemButton>
                    </List>
                    <Divider />
                    <List>{senderslistitem}</List>
                </Grid>
                <Grid item xs={9}>
                    <List sx={messageArea}>{conversation}</List>
                    <Divider />
                    <Grid container style={{ padding: "20px" }}>
                        <Grid item xs={11}>
                            <TextField
                                id="outlined-basic-email"
                                label="Type"
                                fullWidth
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                            />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add">
                                <SendIcon onClick={handleSendReply} />
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};
