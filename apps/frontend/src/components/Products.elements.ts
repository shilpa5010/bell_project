import styled from "@emotion/styled";
import { Card, CardContent, Typography } from "@mui/material";

export const ProductContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
});

export const ProductCard = styled(Card)({
  width: "200px",
  borderRadius: "8px",
  border: "1px solid #100e0e",
});

export const ProductCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const ProductName = styled(Typography)({
  fontWeight: "bold",
});

export const ProductPrice = styled(Typography)({
  color: "gray",
});

export const CardTitle = styled("div")({
  display: "flex",
  alignItems: "center",
});
