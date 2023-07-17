import {
    Container,
    Typography,
    TableContainer,
    Paper,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function ExpiredDiscount() {
    const [discoutProducts, setDiscountProducts] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/getExpiredDiscounts", {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setDiscountProducts(data);
            });
    }, []);

    if (discoutProducts.length > 0) {
        var data = discoutProducts.map((item) => (
            <TableRow key={item._discount_id} className="hi">
                <TableCell>
                    <img
                        src={item._discount_image}
                        alt="discount_product"
                        width={"100"}
                        height={"100"}
                    ></img>
                </TableCell>
                <TableCell>
                    <img
                        src={item._product_image}
                        alt="discount_product"
                        width={"100"}
                        height={"100"}
                    ></img>
                </TableCell>
                <TableCell>
                    <Typography color={"#6678bc"} variant="body1">
                        {item._name}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography>{item._discount_rate}%</Typography>
                </TableCell>
                <TableCell>
                    <Typography sx={{ textDecoration: "line-through" }}>
                        {item._price}€,
                        </Typography>
                     <Typography>  {Number(item._price - (item._discount_rate / 100) * item._price).toFixed(2)}</Typography> 
                   
                </TableCell>
                <TableCell>
                    <Typography>{item._expiry_date}</Typography>
                </TableCell>
            </TableRow>
        ));
    }
    return (
        <Container>
            <Typography variant="h5">My Expired Offers</Typography>
            <TableContainer component={Paper} sx={{ m: "25px 0" }}>
                <Table sx={{ minWidth: 750 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>Discount Image</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Product Image</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Product Name</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Discount Rate</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Discounted Price</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Discount Expiry Date</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{data}</TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default ExpiredDiscount;
