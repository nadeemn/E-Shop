import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Divider,
    Stack,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Table,
    TableBody,
    Paper,
    Modal,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
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

function OrderPage() {
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [placeOrderOpen, setPlaceOrderOpen] = useState(false);
    console.log(placeOrderOpen);

    useEffect(() => {
        try {
            fetch("http://127.0.0.1:5000/api/getActiveOrder", {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("user_token"),
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    if (data) {
                        if (data.msg === "Token has expired") {
                            sessionStorage.removeItem("user_token");
                            alert("Please login, your session is expired");
                            navigate("/");
                        } else if (data.msg === "No items in the Cart") {
                            setOrderData([]);
                        } else {
                            console.log(data);
                            setOrderData(data.order_data);
                            setOrderList(data.order_list);
                        }
                    }
                });
        } catch (error) {
            alert(Error);
        }
    }, [navigate]);

    const handleOrderRemove = async (event, productId) => {
        const response = await fetch("http://127.0.0.1:5000/api/removeOrder", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("user_token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: productId,
                orderId: orderData._id,
            }),
        });
        const data = response.json();
        if (response.status === 200) {
            setOpen(true);
        } else {
            alert(data.msg);
        }
    };

    const handlePlaceOrder = async () => {
        const response = await fetch("http://127.0.0.1:5000/api/placeOrder", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("user_token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderId: orderData._id,
                total_price: total_amount,
            }),
        });
        const data = response.json();
        if (response.status === 200) {
            setPlaceOrderOpen(true);
        } else {
            alert(data.msg);
        }
    };

    if (orderList.length > 0) {
        var total_amount = 0;
        var data = orderList.map((item) => {
            if (item._discount && typeof item._expiry_date !== "undefined") {
                item._price = Number(
                    item._price - (item._discount_rate / 100) * item._price
                ).toFixed(2);
            }
            const itemTotal = item._price * item._quantity;
            total_amount += itemTotal;

            return (
                <TableRow key={item._id}>
                    <TableCell>
                        <Box>
                            <img
                                alt="order_product"
                                src={item._product_image}
                                width={"120px"}
                                height={"120px"}
                            ></img>
                            <Typography variant="body1" fontWeight={500}>
                                {item._name}
                            </Typography>
                        </Box>
                    </TableCell>
                    <TableCell>€{item._price}</TableCell>
                    <TableCell>{item._quantity}</TableCell>
                    <TableCell>€{itemTotal}</TableCell>
                    <TableCell>
                        <Button
                            startIcon={<ClearIcon />}
                            onClick={(event) => handleOrderRemove(event, item._id)}
                        >
                            Remove
                        </Button>
                    </TableCell>
                </TableRow>
            );
        });
    }

    return (
        <Box sx={{ padding: "80px", backgroundColor: "#647dab14" }}>
            {orderList.length > 0 ? (
                <Box>
                    <Typography variant="h5" sx={{ textAlign: "left" }}>
                        Order #{orderData._id}
                    </Typography>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "20px",
                            backgroundColor: "white",
                            margin: "20px 0",
                            borderRadius: "5px",
                        }}
                    >
                        <Box sx={{ padding: "15px 0" }}>
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                mb={"20px"}
                            >
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    sx={{ textAlign: "left", fontSize: "1.25rem" }}
                                >
                                    <strong>Overview</strong>
                                </Typography>
                                <Button variant="contained" onClick={handlePlaceOrder}>
                                    Place Order
                                </Button>
                            </Stack>

                            <Divider />
                        </Box>
                        <Paper elevation={4}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <strong>Product Details</strong>
                                            </TableCell>
                                            <TableCell align="left">
                                                <strong>Price/Item</strong>
                                            </TableCell>
                                            <TableCell align="left">
                                                <strong>Quantity</strong>
                                            </TableCell>
                                            <TableCell align="left">
                                                <strong>Total</strong>
                                            </TableCell>
                                            <TableCell align="left" sx={{ width: "15%" }}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>{data}</TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                        <Paper sx={{ margin: "30px 0" }} elevation={4}>
                            <Stack
                                direction={"row"}
                                sx={{ padding: "30px" }}
                                alignItems={"flex-start"}
                                justifyContent={"space-between"}
                            >
                                <Box sx={{ textAlign: "left" }}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ paddingBottom: "10px" }}
                                    >
                                        <strong>Customer Details</strong>
                                    </Typography>
                                    <Divider />
                                    <Box sx={{ margin: "10px 0" }}>
                                        <Typography variant="body1">
                                            Full Name: &nbsp;&nbsp;&nbsp;Nadeem Nazer
                                        </Typography>
                                        <Typography variant="body1">
                                            Address: &nbsp;&nbsp;&nbsp; Johann Gottlob Nathusius Ring
                                            7, 39106, Magdeburg, Germany
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ textAlign: "left" }}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ paddingBottom: "10px" }}
                                    >
                                        <strong>Bill Details</strong>
                                    </Typography>
                                    <Divider />
                                    <Box sx={{ margin: "10px 0" }}>
                                        <Typography variant="body1">
                                            <strong>Total Amount: &nbsp;&nbsp;&nbsp; </strong>€
                                            {total_amount}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </Paper>
                    </Paper>
                </Box>
            ) : (
                <Paper
                    sx={{
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="body1">No Active Order Available!</Typography>
                </Paper>
            )}
            {isOpen && (
                <Modal
                    open={isOpen}
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
                                sx={{ width: "3em", height: "3em" }}
                            />
                        </Typography>
                        <Typography
                            id="modal-modal-description"
                            variant="body1"
                            sx={{
                                marginBottom: "25px",
                                textAlign: "center",
                            }}
                        >
                            Item has been removed from the cart!
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
            <Box>
                {placeOrderOpen && (
                    <Modal
                        open={placeOrderOpen}
                        aria-labelledby="modal-modal-placeorder-title"
                        aria-describedby="modal-modal-placeorder-description"
                    >
                        <Box sx={style}>
                            <Typography
                                id="modal-modal-placeorder-title"
                                variant="h5"
                                sx={{
                                    marginBottom: "25px",
                                    textAlign: "center",
                                }}
                            >
                                <CheckCircleOutlineIcon
                                    color="success"
                                    sx={{ width: "3em", height: "3em" }}
                                />
                            </Typography>
                            <Typography
                                id="modal-modal-placeorder-description"
                                variant="body1"
                                sx={{
                                    marginBottom: "25px",
                                    textAlign: "center",
                                }}
                            >
                                Your Order has been placed!
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
        </Box>
    );
}

export default OrderPage;
