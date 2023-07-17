import React from "react";
import { Container } from "@mui/material";
import { ProductCarousel } from "../ProductCarousel/ProductCarousel";

function Homepage() {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ padding: "60px !important" }}
        className="landingpage__banner"
      >
        <img width="100%" alt="bannerimage" src="/banner.jpg"></img>
      </Container>
      <ProductCarousel category="top"></ProductCarousel>
      <ProductCarousel category="daily"></ProductCarousel>
      <ProductCarousel category="electronics"></ProductCarousel>
    </>
  );
}

export default Homepage;
