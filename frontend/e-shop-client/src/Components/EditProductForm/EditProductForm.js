import {
    Box,
    TextField,
    Button,
    Stack,
    FormControlLabel,
    Checkbox,
    Typography,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export const EditProductForm = forwardRef((props, ref) => {

    const { productId } = props;
    const { formClose } = props;
    
    const [editData, setEditData] = useState()
    const [checked, setChecked] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUrlProduct, setImageUrlProduct] = useState(null);
    const [date, setDate] = useState(new Date());
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [discount, setDiscount] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/getSingleProduct?id=${productId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setEditData(data);
            });
    }, [productId]);

    console.log(editData)
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

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleProductFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrlProduct(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handlecheckboxChange = (e) => setChecked(e.target.checked);

    const handleFormSubmit = async(event) => {
        event.preventDefault();
        const productData = {
            product_id: productId,
            product_price: price,
            product_stock: stock,
            product_discount_option: checked,
            product_discount_rate: discount || "",
            product_discount_expiry: date || "",
          };

          const productFormData = new FormData();
          productFormData.append("product_data", JSON.stringify(productData))
          if (imageUrlProduct) productFormData.append("product_image", imageUrlProduct);
          if (checked) productFormData.append("product_discount_image", imageUrl);

          try {
            const response = await axios.post("http://127.0.0.1:5000/api/editProduct", productFormData, {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json",
              },
            });
            if (response.status === 200) {
              alert("product edited")
              window.location.reload()
            }
            else {
              alert('some error occured!!')
            }
          } catch (error) {
            alert(error);
          }
    }

    return (
        <Box sx={style} tabIndex="-1" ref={ref}>

            <Typography
                id="modal-modal-title"
                variant="h5"
                sx={{ margin: "20px 15px" }}
            >
                Edit Product
            </Typography>
            <form
                onSubmit={handleFormSubmit}
                id="modal-modal-description"
                style={{ textAlign: "left", display: "flex", flexDirection: "column" }}
            >
                <TextField
                    id="product_price"
                    size="small"
                    name="product_price"
                    onChange={(e) => setPrice(e.target.value)}
                    label="Update the product price"
                    sx={{ margin: "15px" }}
                />
                <TextField
                    id="product_stock"
                    name="product_stock"
                    onChange={(e) => setStock(e.target.value)}
                    size="small"
                    label="Update the Stock"
                    sx={{ margin: "15px" }}
                />
                <label htmlFor="upload-product-image">
                    <Button
                        sx={{ m: "18px" }}
                        variant="outlined"
                        component="span"
                        startIcon={<FileUploadIcon />}
                    >
                        Upload Product Image
                    </Button>
                    <input
                        id="upload-product-image"
                        name=""
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleProductFileUpload}
                    />
                </label>

                <FormControlLabel
                    sx={{ m: "5px" }}
                    control={
                        <Checkbox checked={checked} onChange={handlecheckboxChange} />
                    }
                    label="Update or add offer to this product?"
                ></FormControlLabel>
                {checked && (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <TextField
                            id="product_discount_rate"
                            size="small"
                            label="Enter Discount rate"
                            onChange={(e) => setDiscount(e.target.value)}
                            sx={{ margin: "15px" }}
                        />
                        <Box sx={{ margin: "15px" }}>
                            <label htmlFor="discount-expiry-date">Discount Expiry date</label>
                            <DatePicker
                                id="discount-expiry-date"
                                selected={date}
                                onChange={(date) => setDate(date)}
                            />
                        </Box>

                        <label htmlFor="upload-discount-image">
                            <Button
                                sx={{ m: "18px" }}
                                variant="outlined"
                                component="span"
                                startIcon={<FileUploadIcon />}
                            >
                                Upload Discount Image
                            </Button>
                            <input
                                id="upload-discount-image"
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={handleFileUpload}
                            />
                        </label>
                    </Box>
                )}
                {imageUrl && (
                    <img src={imageUrl} alt="Uploaded product" height="200" width="250" />
                )}
                {imageUrlProduct && (
                    <img
                        src={imageUrlProduct}
                        alt="Uploaded product"
                        height="200"
                        width="250"
                    />
                )}
                <Stack
                    direction={"row"}
                    justifyContent={"space-evenly"}
                    sx={{ margin: "20px auto" }}
                >
                    <Button
                        type="submit"
                        sx={{ marginRight: "15px" }}
                        variant="contained"
                    >
                        Submit
                    </Button>
                    <Button type="submit" variant="contained" onClick={formClose}>
                        Cancel
                    </Button>
                </Stack>
            </form>
        </Box>
    );
});
