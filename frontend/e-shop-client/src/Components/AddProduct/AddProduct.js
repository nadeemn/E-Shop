import {
    Box,
    Button,
    Modal,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AddProductForm from "../AddProductForm/AddProductForm";
import EditIcon from "@mui/icons-material/Edit";
import { EditProductForm } from "../EditProductForm/EditProductForm";

function AddProduct() {
    const productRef = useRef();
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [isProductForm, setIsProductForm] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [productData, setProductData] = useState([]);
    const [editProductId, setEditProductId] = useState("");

    const handleModalOpen = () => {
        setIsProductForm(true);
        setOpen(true);
    };

    const handleClose = () => {
        setIsProductForm(false);
        setOpen(false);
    };

    const handleEditClose = () => {
        setEditForm(false);
        setEditOpen(false);
    };

    const handleEditButton = (id) => {
        setEditForm(true);
        setEditOpen(true);
        setEditProductId(id);
    };

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/getSellerProduct", {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setProductData(data);
            });
    }, []);

    useEffect(() => {
        console.log(productData);
    }, [productData]);

    if (productData.length > 0) {
        var data = productData.map((item, i) => (
            <TableRow key={i}>
                <TableCell sx={{ width: "20%" }}>
                    <img
                        src={item._product_image}
                        alt="product-pic"
                        height="100"
                        width="100"
                    />
                </TableCell>
                <TableCell sx={{ width: "20%" }}>
                    <Typography color={"#6678bc"} variant="body1">
                        {item._name}
                    </Typography>
                </TableCell>
                <TableCell sx={{ width: "20%" }}>
                    <Typography color={"#6678bc"} variant="body1">
                        {item._category}, {item._sub_category}
                    </Typography>
                </TableCell>
                <TableCell sx={{ width: "10%" }}>
                    <Typography>{item._price} €</Typography>
                </TableCell>
                <TableCell sx={{ width: "10%" }}>
                    <Typography>{item._stock} No</Typography>
                </TableCell>
                <TableCell sx={{ width: "20%" }}>
                    <Stack direction={"row"}>
                        <Button
                            size="small"
                            sx={{ mr: "10px" }}
                            variant="outlined"
                            endIcon={<EditIcon />}
                            onClick={() => handleEditButton(item._id)}
                        >
                            Edit
                        </Button>
                    </Stack>
                </TableCell>
            </TableRow>
        ));
    }

    return (
        <Box sx={{ textAlign: "left" }}>
            <Button variant="outlined" onClick={handleModalOpen}>
                Add Product
            </Button>
            {isProductForm ? (
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ overflow: "scroll" }}
                >
                    <AddProductForm formClose={handleClose} ref={productRef} />
                </Modal>
            ) : (
                ""
            )}
            {editForm ? (
                <Modal
                    open={editOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ overflow: "scroll" }}
                >
                    <EditProductForm
                        productId={editProductId}
                        ref={productRef}
                        formClose={handleEditClose}
                    />
                </Modal>
            ) : (
                ""
            )}

            <Stack sx={{ margin: "50px 0" }}>
                {productData.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 750 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>Product</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Product Name</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Categories</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Price</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Stock</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Actions</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{data}</TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography>No products were added..</Typography>
                )}
            </Stack>
        </Box>
    );
}

export default AddProduct;
