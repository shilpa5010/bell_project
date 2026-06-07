import React, { useEffect, useState } from "react";
import { ProductContainer, CardTitle } from "./Products.elements";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  type: string;
};

type WishlistItem = {
  id: number;
};

export const Products: React.FC = () => {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [currentTab, setCurrentTab] = React.useState("all");

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/products`).then(
        (res) => res.json() as Promise<Product[]>,
      ),
      fetch(`${API_BASE_URL}/wishlist`)
        .then((res) => res.json() as Promise<Product[]>)
        .catch(() => []),
    ])
      .then(([productsData, wishlistProducts]) => {
        setProducts(productsData);
        setWishlistIds(wishlistProducts?.map((item) => item.id) || []);
      })
      .catch((err) => console.error("Failed to fetch product data:", err));
  }, []);

  const handleWishlist = (product: Product) => {
    const productId = product.id;

    // Optimistic UI: toggle immediately so icon color updates on click.
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );

    fetch(`${API_BASE_URL}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    })
      .then((res) => res.json() as Promise<WishlistItem[]>)
      //   .then((data))
      .catch((err) => console.error("Failed to add to wishlist:", err));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  return (
    <ProductContainer>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab value="all" label="All" />
          {[...new Set(products.map((product) => product.type))].map((type) => (
            <Tab key={type} value={type} label={type} />
          ))}
        </Tabs>
      </Box>

      {products
        .filter(
          (product) => currentTab === "all" || product.type === currentTab,
        )
        .map((product) => (
          <Card key={product.id} sx={{ maxWidth: 345 }}>
            <CardTitle>
              <CardHeader
                title={product.name}
                subheader={`$${product.price.toFixed(2)}`}
              />
              <IconButton
                aria-label="add to favorites"
                onClick={() => {
                  handleWishlist(product);
                }}
              >
                <FavoriteIcon
                  sx={{
                    color: wishlistIds.includes(product.id)
                      ? "#d32f2f"
                      : "#9e9e9e",
                  }}
                />
              </IconButton>
            </CardTitle>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{
                width: "100%",
                aspectRatio: "4 / 3",
                objectFit: "cover",
              }}
            />
          </Card>
        ))}
    </ProductContainer>
  );
};
