import { Container, Stack, Typography, Box } from "@mui/material";
import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import './Footer.css';

export const Footer = () => {
    return (
        <Container
            maxWidth="false"
            sx={{
                background: "url(/footer.png) no-repeat",
                height: "500px",
                maxWidth: "1440px",
                color: "white",
            }}
        >
            <Stack
                direction="row"
                padding="35px 5px"
                justifyContent={"space-evenly"}
            >
                <Box>
                    <img alt="logo" src="/brand-logo.jpg"></img>
                    <Typography variant="h6" textAlign="center" mt={"20px"} mb={"20px"}>
                        <WhatsAppIcon style={{ verticalAlign: "text-bottom" }} /> Contact Us{" "}
                        <Typography variant="body1">+49 123-456789</Typography>
                    </Typography>
                    <Typography variant="h6" textAlign="center" mt={"20px"} mb={"20px"}>
                        <EmailIcon style={{ verticalAlign: "text-bottom" }} />
                        Email Us:
                        <Typography variant="body1">contact-service@prodigy.com</Typography>
                    </Typography>
                </Box>
                <Box textAlign="left">
                    <Typography
                        variant="h5"
                        borderBottom="3px solid white"
                        paddingBottom={"10px"}
                    >
                        Customer Services
                    </Typography>
                    <ul className="footer__list">
                        <li>About Us</li>
                        <li>Terms & Conditions</li>
                        <li>FAQ</li>
                        <li>Privacy Policy</li>
                        <li>E-waste Policy</li>
                        <li>Cancellation & Return Policy</li>
                    </ul>
                </Box>
            </Stack>
            <p>© 2023 All rights reserved. Team Prodigy</p>
        </Container>
    );
};
