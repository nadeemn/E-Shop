import { Box, TextField, IconButton } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = async () => {
        console.log("Searching for:", searchTerm);
        navigate(`/search-result?term=${searchTerm}`);
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch();
    };

    return (
        <Box
            sx={{
                width: "550px",
                position: "relative",
            }}
        >
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Search"
                    type="text"
                    value={searchTerm}
                    size="small"
                    placeholder="Search essentials, groceries and more..."
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                ></TextField>
                <IconButton
                    type="submit"
                    sx={{ p: "10px", position: "absolute", right: "10px" }}
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </form>
        </Box>
    );
};
