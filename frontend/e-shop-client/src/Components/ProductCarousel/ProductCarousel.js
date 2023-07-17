import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const ProductCarousel = (props) => {
    const [heading, setHeading] = useState("");
    const history = useNavigate();
    useEffect(() => {
        if (props.category === "daily") {
            setHeading("Daily Essentials");
        } else if (props.category === "top") {
            setHeading("Shop From Top Categories");
        } else if (props.category === "electronics") {
            setHeading("Top Electronic Brands");
        }
    }, [props.category]);

    const productNavigate = () => {
        if (props.category === "daily") {
            history("/daily-essentials");
        }
        if (props.category === "top") {
            history("/all-category");
        }
        if (props.category === "electronics") {
            history("/mobile")
        }
    };

    return (
        <Container maxWidth="lg" sx={{ paddingTop: "24px", paddingBottom: "24px" }}>
            <Stack
                direction="column"
                divider={<Divider orientation="horizontal"></Divider>}
                spacing={0}
            >
                <Stack direction="row" justifyContent="space-between">
                    <Typography
                        variant="h5"
                        sx={{ color: "#286198d1", borderBottom: "3px solid #286198d1" }}
                    >
                        {heading}
                    </Typography>
                    <Button
                        variant="text"
                        endIcon={<KeyboardArrowRightIcon />}
                        onClick={productNavigate}
                    >
                        View All
                    </Button>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    spacing={5}
                    padding="25px 0"
                >
                    {props.category === "electronics" ? (
                        <Container
                            maxWidth="false"
                            sx={{
                                background: "url(/iphone_block.png) no-repeat",
                                height: "250px",
                                maxWidth: "100%",
                                backgroundSize: "cover",
                            }}
                        ></Container>
                    ) : (
                        ""
                    )}
                    {props.category === "electronics" ? (
                        <Container
                            maxWidth="false"
                            sx={{
                                background: "url(/realme_block.png) no-repeat",
                                height: "250px",
                                maxWidth: "100%",
                                backgroundSize: "cover",
                            }}
                        ></Container>
                    ) : (
                        ""
                    )}
                    {props.category === "electronics" ? (
                        <Container
                            maxWidth="false"
                            sx={{
                                background: "url(xiaomi_block.png) no-repeat",
                                height: "250px",
                                maxWidth: "100%",
                                backgroundSize: "cover",
                            }}
                        ></Container>
                    ) : (
                        ""
                    )}
                    {props.category === "daily" ? (
                        <Box
                            sx={{
                                width: "25%",
                                height: "150px",
                                backgroundImage: "url(ariel.jpeg)",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                border: "1px solid #8080802e",
                                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
                            }}
                        ></Box>
                    ) : (
                        ""
                    )}
                    {props.category === "daily" ? (
                        <Box
                            sx={{
                                width: "25%",
                                height: "150px",
                                backgroundImage: "url(bars.jpg)",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                border: "1px solid #8080802e",
                                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
                            }}
                        ></Box>
                    ) : (
                        ""
                    )}
                    {props.category === "daily" ? (
                        <Box
                            sx={{
                                width: "25%",
                                height: "150px",
                                backgroundImage: "url(rice.jpg)",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                border: "1px solid #8080802e",
                                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
                            }}
                        ></Box>
                    ) : (
                        ""
                    )}
                    {props.category === "daily" ? (
                        <Box
                            sx={{
                                width: "25%",
                                height: "150px",
                                backgroundImage: "url(spec.jpg)",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                border: "1px solid #8080802e",
                                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
                            }}
                        ></Box>
                    ) : (
                        ""
                    )}
                    {props.category === "top" ? (
                        <Box
                            sx={{
                                position: "relative",
                                width: "25%",
                                height: "150px",
                                backgroundImage: "url(slim_jeans.jpg)",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                border: "1px solid #8080802e",
                                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
                            }}
                        ></Box>
                    ) : (
                        ""
                    )}
                    {props.category === "top" ? (
                        <Box
                            sx={{
                                width: "25%",
                                height: "150px",
                                backgroundImage: "url(redtape.jpg)",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                border: "1px solid #8080802e",
                                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
                            }}
                        ></Box>
                    ) : (
                        ""
                    )}
                    {props.category === "top" ? (
                        <Box
                            sx={{
                                width: "25%",
                                height: "150px",
                                backgroundImage: "url(z5.jpg)",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                border: "1px solid #8080802e",
                                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
                            }}
                        ></Box>
                    ) : (
                        ""
                    )}
                    {props.category === "top" ? (
                        <Box
                            sx={{
                                width: "25%",
                                height: "150px",
                                backgroundImage: "url(rice.jpg)",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                border: "1px solid #8080802e",
                                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
                            }}
                        ></Box>
                    ) : (
                        ""
                    )}
                </Stack>
            </Stack>
        </Container>
    );
};
