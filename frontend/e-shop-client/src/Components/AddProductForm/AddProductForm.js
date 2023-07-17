import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, forwardRef } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddProductForm.css";
import axios from "axios";

const AddProductForm = forwardRef((props, ref) => {
  const { formClose } = props;

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

  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [checked, setChecked] = useState(false);
  const [sponsorchecked, setSponsorChecked] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrlProduct, setImageUrlProduct] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedSubCategories, setSelectedSubCategories] = useState({});

  // Form Data
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState("");

  const mainCategories = [
    { id: 1, name: "Clothing" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Daily Essential" },
    { id: 4, name: "Accessories" },
    { id: 5, name: "Bags and Shoes" },
  ];

  const subCategories = {
    Clothing: [
      { id: 11, name: "Gender", options: ["Women", "Men"] },
      { id: 12, name: "Categories", options: ["Jeans", "Shirt", "Shorts"] },
    ],
    Electronics: [
      { id: 21, name: "Brand", options: ["Lenovo", "Apple", "Samsung"] },
      { id: 22, name: "Categories", options: ["Mobiles", "Laptops"] },
    ],
    Accessories: [
      { id: 31, name: "Gender", options: ["Women", "Men"] },
      { id: 32, name: "Categories", options: ["Watch", "Shades", "Wallet"] },
    ],
    "Bags and Shoes": [
      { id: 41, name: "Gender", options: ["Women", "Men"] },
      { id: 42, name: "Categories", options: ["Shoes", "Bags"] },
    ],
    "Daily Essential": [
      {
        id: 51,
        name: "Categories",
        options: ["Visual Care", "Diet & Nutrition", "Home Care", "Grocery"],
      },
    ],
  };

  const handleMainCategoryChange = (event) => {
    const main = event.target.value;
    setMainCategory(main);
  };

  useEffect(() => {
    if (mainCategory) {
      setSubCategory(subCategories[mainCategory] || []);
      setSelectedSubCategories({});
    }
    // eslint-disable-next-line
  }, [mainCategory]);

  const handleSubCategoryChange = (event, index) => {
    setSelectedSubCategories((prev) => ({
      ...prev,
      [index]: event.target.value,
    }));
  };

  console.log(selectedSubCategories);

  const handlecheckboxChange = (e) => setChecked(e.target.checked);

  const handleSponsorCheckbox = (e) => setSponsorChecked(e.target.checked);

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const productData = {
      product_name: name,
      product_category: mainCategory,
      product_price: price,
      product_stock: stock,
      product_subcategory: selectedSubCategories["Categories"],
      product_category_gender: selectedSubCategories["Gender"] || "",
      product_category_brand: selectedSubCategories["Brand"] || "",
      product_discount_option: checked,
      product_discount_rate: discount || "",
      product_discount_expiry: date || "",
      product_sponsor: sponsorchecked,
    };

    const productFormData = new FormData();
    productFormData.append("product_data", JSON.stringify(productData))
    productFormData.append("product_image", imageUrlProduct);
    if(checked) productFormData.append("product_discount_image", imageUrl);
   
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/addProduct", productFormData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("product added")
        window.location.reload()
      }
      else {
        alert('some error occured!!')
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box sx={style} tabIndex="-1" ref={ref}>
      <Typography
        id="modal-modal-title"
        variant="h5"
        sx={{ margin: "20px 15px" }}
      >
        Add Product
      </Typography>
      <form
        onSubmit={handleFormSubmit}
        id="modal-modal-description"
        style={{ textAlign: "left", display: "flex", flexDirection: "column" }}
      >
        <TextField
          id="product_name"
          name="product_name"
          onChange={(e) => setName(e.target.value)}
          size="small"
          label="Enter product name"
          sx={{ margin: "15px" }}
        />
        <FormControl sx={{ m: "15px", minWidth: 350 }} size="small">
          <InputLabel id="width-label">Select category</InputLabel>
          <Select
            value={mainCategory}
            name="product_category"
            label={"Categories"}
            onChange={handleMainCategoryChange}
            labelId="width-label"
          >
            {mainCategories.map((item) => (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {subCategory.length > 0 && (
          <Box>
            {subCategory.map((category, index) => (
              <FormControl
                sx={{ m: "15px", minWidth: 320 }}
                key={index}
                size="small"
              >
                <InputLabel id="label">Select {category.name}</InputLabel>
                <Select
                  labelId="label"
                  label={category.name}
                  name={category.name}
                  value={selectedSubCategories[category.name] || ""}
                  onChange={(event) =>
                    handleSubCategoryChange(event, category.name)
                  }
                >
                  {category.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Box>
        )}
        <TextField
          id="product_price"
          size="small"
          name="product_price"
          onChange={(e) => setPrice(e.target.value)}
          label="Enter product price"
          sx={{ margin: "15px" }}
        />
        <TextField
          id="product_stock"
          name="product_stock"
          onChange={(e) => setStock(e.target.value)}
          size="small"
          label="Stock"
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
            <Checkbox checked={sponsorchecked} onChange={handleSponsorCheckbox} />
          }
          label="Do you want to advertise this product?"
        ></FormControlLabel>
        <FormControlLabel
          sx={{ m: "5px" }}
          control={
            <Checkbox checked={checked} onChange={handlecheckboxChange} />
          }
          label="Do you want to add offer to this product?"
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
        {imageUrl && <img src={imageUrl} alt="Uploaded product" height="200" width="250" />}
        {imageUrlProduct && (
          <img src={imageUrlProduct} alt="Uploaded product" height="200" width="250" />
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
})

export default AddProductForm;
