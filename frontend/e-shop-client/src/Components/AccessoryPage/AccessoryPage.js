import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormLabel,
    RadioGroup,
    Stack,
    Radio,
    Typography,
    CardContent,
    Button,
    Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AccessoryPage() {
    const [accessoryData, setAccessoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFilterItems, setSelectedFilterItems] = useState({
        key1: [],
        key2: [],
    });
    const Categories = [
        {
            id: 1,
            name: "watch",
            label: "Watch",
            value: "Watch",
        },
        {
            id: 2,
            name: "sunglass",
            label: "Shades",
            value: "Shades",
        },
        {
            id: 3,
            name: "wallet",
            label: "Wallet",
            value: "Wallet",
        },
    ];

    const Gender = [
        {
            id: 4,
            name: "women",
            label: "Women",
            value: "Women",
        },
        {
            id: 5,
            name: "men",
            label: "Men",
            value: "Men",
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    "http://127.0.0.1:5000/api/getFilteredAccessories",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            accessory_checkbox_options: selectedFilterItems,
                        }),
                    }
                );
                const filteredItem = await response.json();
                setAccessoryData(filteredItem);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                alert("Error Fetching data:", error);
            }
        };

        const fetchAllData = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:5000/api/getAccessoryPrducts"
                );
                const data = await response.json();
                setAccessoryData(data);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                alert("Error Fetching data:", error);
            }
        };

        if (
            selectedFilterItems.key1.length > 0 ||
            selectedFilterItems.key2.length > 0
        ) {
            fetchData();
        } else if (
            selectedFilterItems.key1.length === 0 &&
            selectedFilterItems.key2.length === 0
        ) {
            fetchAllData();
        }
    }, [selectedFilterItems]);

    const handleChange = (event) => {
        const { value, checked } = event.target;

        setSelectedFilterItems((prev) => {
            const updatedFilter = { ...prev };
            if (checked) {
                updatedFilter.key1 = [...prev.key1, value];
            } else {
                updatedFilter.key1 = updatedFilter.key1.filter(
                    (option) => option !== value
                );
            }
            return updatedFilter;
        });
    };

    const handleSubCategoryChange = (event) => {
        const { value, checked } = event.target;

        setSelectedFilterItems((prev) => {
            const updatedFilter = { ...prev };
            if (checked) {
                updatedFilter.key2 = [...(prev.key2 || []), value];
            } else {
                updatedFilter.key2 = updatedFilter.key2.filter(
                    (option) => option !== value
                );
            }
            return updatedFilter;
        });
    };

    const handleSort = (event) => {
        const sortedItems = [...accessoryData];
        setIsLoading(true);
        if (event.target.value === "alphabet") {
            sortedItems.sort((a, b) => a._name.localeCompare(b._name));
            setAccessoryData(sortedItems);
        } else if (event.target.value === "price") {
            sortedItems.sort((a, b) => {
                const aPrice =
                a._discount && typeof a._expiry_date !== "undefined"
                    ? Number(a._price - (a._discount_rate / 100) * a._price).toFixed(2)
                    : a._price;

                const bPrice =
                    b._discount && typeof b._expiry_date !== "undefined"
                        ? Number(b._price - (b._discount_rate / 100) * b._price).toFixed(2)
                        : b._price;

                return aPrice - bPrice;
            });
            
            setAccessoryData(sortedItems);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    var GenderCheckboxes = Gender.map((item, i) => (
        <FormControlLabel
            key={i}
            control={
                <Checkbox onChange={handleChange} value={item.value} size="small" />
            }
            label={item.label}
        ></FormControlLabel>
    ));

    var CategoryCheckboxes = Categories.map((item, i) => (
        <FormControlLabel
            key={i}
            control={
                <Checkbox
                    onChange={handleSubCategoryChange}
                    value={item.value}
                    size="small"
                />
            }
            label={item.label}
        ></FormControlLabel>
    ));

    var DemoContents = [];

    for (let i = 0; i < 8; i++) {
        DemoContents.push(
            <Box key={i} sx={{ margin: "20px 10px", cursor: "pointer" }}>
                <Skeleton
                    animation={"wave"}
                    variant="rectangular"
                    width={250}
                    height={250}
                ></Skeleton>
                <Skeleton animation={"wave"} />
                <Skeleton animation={"wave"} width="60%" />
            </Box>
        );
    }

    if (accessoryData.length > 0) {
        var actualData = accessoryData.map((item) => (
            <Box
                key={item._id}
                className="product__display"
                sx={{
                    position: "relative",
                    width: "23%",
                    height: "100%",
                    margin: "0 10px",
                    transition: "all 0.2s ease-in-out",
                }}
            >
                <Link
                    style={{ textDecoration: "unset", color: "grey" }}
                    to={`/product-detail/?id=${item._id}`}
                    key={item._id}
                >
                    <Stack>
                        <Box
                            sx={{
                                width: "250px",
                                height: "300px",
                                backgroundImage: `url(${item._product_image})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                border: "1px solid #8080802e",
                                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.1)",
                            }}
                        ></Box>

                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                textAlign={"left"}
                                fontSize={"1.05rem"}
                                component="div"
                                fontWeight={"600"}
                            >
                                {item._name}
                            </Typography>
                            {item._discount && typeof item._expiry_date !== "undefined" ? (
                                <span
                                    style={{
                                        position: "absolute",
                                        top: "2px",
                                        left: "0",
                                        color: "white",
                                        backgroundColor: "red",
                                        padding: "5px",
                                    }}
                                >
                                    Save {item._discount_rate + "%"}{" "}
                                </span>
                            ) : (
                                ""
                            )}

                            {item._discount && typeof item._expiry_date !== "undefined" ? (
                                <Stack direction={"row"} spacing={1}>
                                    <Typography
                                        variant="body1"
                                        textAlign={"left"}
                                        fontSize={"0.95rem"}
                                        sx={{ color: "#f50535d1", textDecoration: "line-through" }}
                                    >
                                        €{item._price}
                                    </Typography>
                                    <Typography
                                        textAlign={"left"}
                                        variant="body1"
                                        fontSize={"0.95rem"}
                                        sx={{ color: "green" }}
                                    >
                                        €
                                        {Number(
                                            item._price - (item._discount_rate / 100) * item._price
                                        ).toFixed(2)}
                                    </Typography>
                                </Stack>
                            ) : (
                                <Typography
                                    textAlign={"left"}
                                    variant="body1"
                                    fontSize={"0.95rem"}
                                    sx={{ color: "#f50535d1" }}
                                >
                                    €{item._price}
                                </Typography>
                            )}
                        </CardContent>
                    </Stack>
                </Link>
            </Box>
        ));
    }

    return (
        <Stack
            spacing={2}
            direction="row"
            sx={{ backgroundColor: "#eeebeb7d" }}
            marginBottom="20px"
        >
            <Stack direction="column" width="20%" padding="10px">
                <Box sx={{ border: "1px solid white", backgroundColor: "white" }}>
                    <Stack
                        direction={"row"}
                        sx={{ margin: "30px" }}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{ textAlign: "left", color: "grey" }}
                        >
                            Filter By
                        </Typography>
                        <Button variant="text" onClick={() => window.location.reload()}>
                            Reset
                        </Button>
                    </Stack>

                    <Box sx={{ margin: "30px" }}>
                        <FormLabel
                            component="legend"
                            id="sort-by"
                            sx={{ textAlign: "left", color: "#286198d1" }}
                        >
                            Sort By
                        </FormLabel>
                        <RadioGroup aria-labelledby="sort-by" onChange={handleSort}>
                            <FormControlLabel
                                value="alphabet"
                                control={<Radio size="small" />}
                                label="A- Z"
                            />
                            <FormControlLabel
                                value="price"
                                control={<Radio size="small" />}
                                label="Price"
                            />
                        </RadioGroup>
                    </Box>
                    <Box sx={{ margin: "30px" }}>
                        <FormLabel
                            component="legend"
                            sx={{ textAlign: "left", color: "#286198d1" }}
                        >
                            Gender
                        </FormLabel>
                        <FormGroup>{GenderCheckboxes}</FormGroup>
                    </Box>
                    <Box sx={{ margin: "30px" }}>
                        <FormLabel
                            component="legend"
                            sx={{ textAlign: "left", color: "#286198d1" }}
                        >
                            Categories
                        </FormLabel>
                        <FormGroup>{CategoryCheckboxes}</FormGroup>
                    </Box>
                </Box>
            </Stack>
            <Stack direction="column" width="80%" padding="10px">
                <Box
                    sx={{
                        border: "1px solid white",
                        backgroundColor: "white",
                        minHeight: "100vh",
                    }}
                >
                    <Stack
                        direction="row"
                        flexWrap="wrap"
                        justifyContent="flex-start"
                        padding={"15px"}
                        margin={"25px 10px"}
                    >
                        {isLoading ? DemoContents : actualData}
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    );
}

export default AccessoryPage;
