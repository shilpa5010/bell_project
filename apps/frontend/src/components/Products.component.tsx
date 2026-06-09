import React, { useEffect, useState } from "react";
import { ProductContainer } from "./Products.elements";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ProductCard } from "./Card/Card.component";

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

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [currentTab, setCurrentTab] = React.useState("all");

  // Fetch products and wishlist items on component mount
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

  //To habdle wishlist To save to the Database and also to update the UI
  const handleWishlist = (productId: number) => {
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

  // Handle tab change
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
          <ProductCard
            key={product.id}
            product={product}
            showWishlistButton
            isWishlisted={wishlistIds.includes(product.id)}
            onToggleWishlist={handleWishlist}
          />
        ))}
    </ProductContainer>
  );
};
