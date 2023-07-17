import {
    Stack,
    Box,
    List,
    ListItemText,
    ListItemButton,
    Divider,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    ListItem,
    ListItemIcon
} from "@mui/material";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

function ProductPage() {

    const navigate = useNavigate();
    const category = [
        {
            id: "1",
            label: "Clothing",
            value: "clothing",
        },
        {
            id: "2",
            label: "Mobiles & Laptops",
            value: "mobile",
        },
        {
            id: "3",
            label: "Accessories",
            value: "accessories",
        },
        {
            id: "4",
            label: "Bags & Shoes",
            value: "bags",
        },
        {
            id: "5",
            label: "Daily Essentials",
            value: "daily-essentials",
        },
    ];

    const handleProductSearch = (url) => navigate(`/${url}`) 

    var Categories = category.map((options, i) => (
        <div key={i}>
            <ListItemButton onClick={() => handleProductSearch(options.value)}>
                <ListItemText primary={options.label}></ListItemText>
            </ListItemButton>
            <Divider />
        </div>
    ));

    var CategoryCard = category.map((options, i) => (
        <Card key={i} sx={{ width: 345, height: 345, margin: "20px" }} onClick={() => handleProductSearch(options.value)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="280"
                    src={`${options.value}.jpg`}
                ></CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h6">
                        {options.label}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    ));

    return (
        <Stack
            spacing={2}
            direction="row"
            sx={{ backgroundColor: "#eeebeb7d" }}
            marginBottom="20px"
        >
            <Stack direction="column" width="20%" padding="10px">
                <Box sx={{ border: "1px solid white", backgroundColor: "white" }}>
                    <List sx={{ width: "100%" }}>
                        <ListItem sx={{ backgroundColor: "#286198d1", color: "white" }}>
                            <ListItemText primary="Categories"></ListItemText>
                            <ListItemIcon><MenuIcon sx={{ color: "white" }} /></ListItemIcon>
                        </ListItem>
                        {Categories}
                    </List>
                </Box>
            </Stack>
            <Stack direction="column" width="80%" padding="10px">
                <Box sx={{ border: "1px solid white", backgroundColor: "white" }}>
                    <Stack direction="row" flexWrap="wrap" justifyContent="space-evenly">
                        {CategoryCard}
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    );
}

export default ProductPage;
