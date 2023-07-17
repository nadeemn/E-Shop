import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Modal
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import SellIcon from "@mui/icons-material/Sell";
import { SignInForm } from "../SignInForm/SignInForm";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Search } from "../Search/Search";

export const Header = () => {
  const headerRef = useRef();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();

  const [isSignInForm, setIsSignInForm] = useState(true);

  const handleClose = () => {
    setIsSignInForm(true);
    setOpen(false);
  };

  const handleAddToCart = () => {
    navigate("/shopping-cart");
  };

  const handleSellerButton = () => {
    navigate("/seller-page");
  };

  const handleMyProfile = () => {
    navigate("/myprofile");
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/get", {
      methods: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp));
  }, []);

  return (
    <Stack
      spacing={2}
      direction={"row"}
      paddingBottom={3}
      paddingTop={3}
      sx={{
        height: "80px",
        boxSizing: "border-box",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderBottom: "1px solid #00000012",
        width: "100%",
      }}
    >
      <Box
        component="img"
        sx={{
          height: 50,
          width: 200,
          cursor: "pointer",
        }}
        alt="The house from the offer."
        src="/brand-logo.jpg"
        onClick={() => navigate("/")}
      ></Box>
      <Search />
      <Box sx={{ position: "relative", display: "flex" }}>
        <Stack spacing={2} direction={"row"}>
          {sessionStorage.getItem("user_token") ? (
            <Button
              variant="text"
              startIcon={<AccountCircleIcon />}
              onClick={handleMyProfile}
            >
              My Profile
            </Button>
          ) : (
            <Button
              variant="text"
              startIcon={<PersonOutlineIcon />}
              onClick={handleOpen}
            >
              Sign Up/Sign In
            </Button>
          )}

        </Stack>
        <Stack spacing={2} direction={"row"} sx={{ marginLeft: "20px" }}>
          <Button
            variant="text"
            onClick={handleSellerButton}
            startIcon={<SellIcon />}
          >
            Become a Seller
          </Button>
        </Stack>
        {sessionStorage.getItem("user_token") && <Stack spacing={2} direction={"row"} sx={{ marginLeft: "20px" }}>
          <Button
            variant="text"
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
          >
            Cart
          </Button>
        </Stack>}
      </Box>

      <Modal
        open={open}
        onClose={() => headerRef.current.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isSignInForm ? (
          <SignInForm
            formClose={handleClose}
            toggleSignUpForm={setIsSignInForm}
            ref={headerRef}
          />
        ) : (
          <SignUpForm formClose={handleClose} ref={headerRef} />
        )}
      </Modal>
    </Stack>
  );
};
