import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Modal,
    Rating,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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

function ProductDetail() {
    const [open, setOpen] = useState(false);
    const queryParams = new URLSearchParams(window.location.search);
    const token = sessionStorage.getItem("user_token");
    const term = queryParams.get("id");
    const [message, setMessage] = useState("");

    const [queryProduct, setQueryProduct] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [rating, setRating] = useState();

    const displayCounter = quantity > 0;

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        setQuantity(quantity - 1);
    };

    const isTokenAvailable = () => {
        return token !== null;
    };

    const handleRating = (event) => {
        setRating(event.target.value);
    };

    const submitRating = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:5000/api/addRating?id=${term}&rating=${rating}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("user_token"),
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            alert(error);
        }
    };

    const getQueryProduct = async (id) => {
        if (sessionStorage.getItem("user_token")) {
            const resp = await fetch(
                `http://127.0.0.1:5000/api/getProduct?id=${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("user_token"),
                        "Content-Type": "application/json",
                    },
                }
            );
            if (resp.status !== 200) {
                const data = await resp.json();
                if (data.msg === "Token has expired") {
                    alert(data.msg);
                    sessionStorage.removeItem("user_token");
                    window.location.reload();
                }
            } else {
                const data = await resp.json();
                setQueryProduct(data);
            }
        } else {
            const resp = await axios.get(
                `http://127.0.0.1:5000/api/Product?id=${id}`
            );
            setQueryProduct(resp.data);
        }
    };

    useEffect(() => {
        if (term) {
            getQueryProduct(term);
        }
    }, [term]);

    console.log(queryProduct);

    const handleSendMessage = async () => {
        const response = await fetch(
            `http://127.0.0.1:5000/api/sendMessage?id=${term}`,
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("user_token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: message,
                }),
            }
        );
        if (response.status === 200) {
            alert("message send");
        }
    };

    const handleAddToCart = async () => {
        const opts = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("user_token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                quantity: quantity,
                id: term,
            }),
        };

        const resp = await fetch("http://127.0.0.1:5000/api/AddToCart", opts);
        const data = await resp.json();
        console.log(data);
        if (resp.status !== 200) {
            alert(data.msg);
        } else {
            setOpen(true);
        }
    };

    if (queryProduct.length > 0) {
        var query = queryProduct.map((item) => (
            <Stack direction={"row"} justifyContent={"space-around"} key={item._id}>
                <Box sx={{position:"relative"}}>
                    <img src={item._product_image} width={500} alt="query_product"></img>
                    {item._discount && typeof item._expiry_date !== "undefined" ? (
                        <img
                            src={item._discount_image}
                            width={100}
                            height={100}
                            style={{ position: "absolute", right: "0" }}
                            alt="discounted tag"
                        ></img>
                    ) : (
                        ""
                    )}
                </Box>
                <Stack direction={"column"} sx={{ textAlign: "left", padding: "25px" }}>
                    <Typography variant="h5">
                        {item._name}
                        <span style={{ padding: "15px", color: "green", fontSize: "18px" }}>
                            {item._discount && typeof item._expiry_date !== "undefined"
                                ? "Save " + item._discount_rate + "%"
                                : ""}
                        </span>
                    </Typography>
                    {item._discount && typeof item._expiry_date !== "undefined" ? (
                        <div>
                            <Typography
                                variant="h6"
                                sx={{ color: "#f50535d1", textDecoration: "line-through" }}
                            >
                                €{item._price}
                            </Typography>
                            <Typography variant="h6" sx={{ color: "#f50535d1" }}>
                                €
                                {Number(
                                    item._price - (item._discount_rate / 100) * item._price
                                ).toFixed(2)}
                            </Typography>
                        </div>
                    ) : (
                        <Typography variant="h6" sx={{ color: "#f50535d1" }}>
                            €{item._price}
                        </Typography>
                    )}

                    <br />
                    <Typography color={`${item._stock > 0 ? "green" : "red"}`}>
                        Availability : {`${item._stock > 0 ? "In Stock" : "Sold Out"}`}
                    </Typography>
                    <br />
                    <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                        sx={{ alignItems: "center" }}
                    >
                        <Typography variant="body1">Quantity : </Typography>
                        <Button onClick={handleIncrement} sx={{ marginLeft: "10px" }}>
                            +
                        </Button>
                        {displayCounter && <Button disabled>{quantity}</Button>}
                        {displayCounter && <Button onClick={handleDecrement}>-</Button>}
                    </ButtonGroup>
                    <br />
                    <Divider></Divider>
                    <br />
                    <Typography variant="body1">
                        Mill Oil is an innovative oil filled radiator with the most modern
                        technology. If you are looking for something that can make your
                        interior look awesome, and at the same time give you the pleasant
                        warm feeling during the winter.
                    </Typography>
                    <br />
                    <Rating readOnly value={item.rating}></Rating>
                    <br />
                    <br />
                    {sessionStorage.getItem("user_token") && item.item_purchased ? (
                        <Stack direction={"row"} alignItems={"center"}>
                            <Box sx={{ width: "100%" }}>
                                <Typography variant="body1">
                                    <strong>Seller Information</strong>
                                </Typography>
                                <Typography variant="body1">
                                    Seller Name: {item.seller_name}
                                </Typography>
                                <Typography variant="body1">
                                    Seller Email: {item.seller_email}
                                </Typography>
                            </Box>

                            <TextField
                                id="rating"
                                size="small"
                                type="number"
                                onChange={handleRating}
                                sx={{ width: "15%" }}
                                inputProps={{ min: 1, max: 5 }}
                            ></TextField>
                            <Button
                                variant="outlined"
                                sx={{ m: "0 10px" }}
                                onClick={submitRating}
                            >
                                Rate
                            </Button>
                        </Stack>
                    ) : (
                        ""
                    )}
                    <Stack direction={"row"}>
                        <Button
                            disabled={!(isTokenAvailable() && quantity > 0)}
                            variant="outlined"
                            sx={{ margin: "20px 20px 20px 0" }}
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </Button>
                    </Stack>
                    {sessionStorage.getItem("user_token") ? (
                        <Stack
                            sx={{ margin: "10px 0" }}
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"flex-start"}
                        >
                            <label htmlFor="sendMessage">Send Message to the seller:</label>
                            <TextField
                                sx={{ margin: "10px" }}
                                id="sendMessage"
                                label="Send"
                                size="small"
                                onChange={(e) => setMessage(e.target.value)}
                                multiline
                                maxRows={4}
                                fullWidth
                            />
                            <Button
                                variant="outlined"
                                type="submit"
                                onClick={handleSendMessage}
                            >
                                Send
                            </Button>
                        </Stack>
                    ) : (
                        ""
                    )}
                </Stack>
            </Stack>
        ));
    }

    return (
        <Box
            sx={{
                padding: "80px",
                margin: "50px 180px",
                backgroundColor: "#eeebeb7d",
            }}
        >
            {query}
            {open && (
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h5"
                            sx={{
                                marginBottom: "25px",
                                textAlign: "center",
                            }}
                        >
                            <CheckCircleOutlineIcon
                                color="success"
                                sx={{ width: "5em", height: "5em" }}
                            />
                        </Typography>
                        <Typography
                            id="modal-modal-description"
                            variant="h5"
                            sx={{
                                marginBottom: "25px",
                                textAlign: "center",
                            }}
                        >
                            Your item has been successfully added to your cart!
                        </Typography>
                        <Button
                            type="submit"
                            onClick={() => window.location.reload()}
                            variant="contained"
                            color="success"
                            sx={{
                                margin: "0 auto",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            Ok
                        </Button>
                    </Box>
                </Modal>
            )}
        </Box>
    );
}

export default ProductDetail;
