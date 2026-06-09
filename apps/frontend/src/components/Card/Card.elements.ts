import styled from "@emotion/styled";
import Card from "@mui/material/Card";

export const CardContainer = styled(Card)({
  maxWidth: 345,
});

export const CardTitleRow = styled("div")({
  display: "flex",
  alignItems: "center",
  width: "100%",
});

export const ProductImage = styled("img")({
  width: "100%",
  aspectRatio: "4 / 3",
  objectFit: "cover",
});
