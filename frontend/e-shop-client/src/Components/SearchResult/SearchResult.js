import {
    Box,
    Stack,
    Skeleton,
    CardContent,
    Typography,
    Button,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const SearchResult = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const searchTerm = queryParams.get("term");
    const [isLoading, setIsLoading] = useState(true);
    const [searchResult, setSearchResult] = useState([]);

    var DemoContents = [];

    for (let i = 0; i < 8; i++) {
        DemoContents.push(
            <Box
                key={i}
                sx={{ margin: "20px 10px", cursor: "pointer", width: "20%" }}
            >
                <Skeleton
                    animation={"wave"}
                    variant="rectangular"
                    width={300}
                    height={300}
                ></Skeleton>
                <Skeleton animation={"wave"} width="60%" />
                <Skeleton animation={"wave"} width="20%" />
            </Box>
        );
    }

    if (searchResult.length > 0) {
        const sortedProducts = [...searchResult].sort((a, b) => {
            if (a._sponsored && !b._sponsored) {
                return -1;
            } else if (!a._sponsored && b._sponsored) {
                return 1;
            }
            return 0;
        });
        var actualData = sortedProducts.map((item) => (
            <Box
                key={item._id}
                className="product__display"
                sx={{
                    width: "23%",
                    height: "100%",
                    margin: "0 10px",
                    transition: "all 0.2s ease-in-out",
                    position: "relative",
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
                                width: "auto",
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
                            {item._sponsored ? (
                                <Button
                                    sx={{ position: "absolute", bottom: "45px", right: "0" }}
                                    size="small"
                                    variant="contained"
                                >
                                    Advertised
                                </Button>
                            ) : (
                                ""
                            )}
                        </CardContent>
                    </Stack>
                </Link>
            </Box>
        ));
    }

    const fetchProduct = useCallback(async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/searchProducts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ searchTerm: searchTerm }),
            });
            if (response.ok) {
                const data = await response.json();
                setSearchResult(data);
                setIsLoading(false);
                console.log(data);
            } else {
                throw new Error("Failed to fetch product");
            }
        } catch (error) {
            alert(error.message);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);
    return (
        <Stack
            sx={{ backgroundColor: "#eeebeb7d" }}
            marginBottom="20px"
            padding={"50px"}
        >
            <Box sx={{ border: "1px solid white", backgroundColor: "white" }}>
                <Stack
                    direction={"row"}
                    justifyContent={"flex-start"}
                    flexWrap={"wrap"}
                    margin={"50px"}
                >
                    {isLoading ? DemoContents : actualData}
                </Stack>
            </Box>
        </Stack>
    );
};
