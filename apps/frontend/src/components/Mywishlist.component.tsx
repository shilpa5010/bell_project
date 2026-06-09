import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { ProductContainer } from "./Products.elements";
import { ProductCard } from "./Card/Card.component";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

type WishlistItem = {
  id: number;
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Mywishlist component to display products
export const Mywishlist: React.FC = () => {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/wishlist`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        setWishlistProducts(data);
        setWishlistIds(data.map((item) => item.id));
      })
      .catch((err) => console.error("Failed to fetch wishlist:", err));
  }, []);

  const handleWishlist = (productId: number) => {
    const wasWishlisted = wishlistIds.includes(productId);

    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );

    if (wasWishlisted) {
      setWishlistProducts((prev) => prev.filter((item) => item.id !== productId));
    }

    fetch(`${API_BASE_URL}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    })
      .then((res) => res.json() as Promise<WishlistItem[]>)
      .catch((err) => console.error("Failed to update wishlist:", err));
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        My Wishlist
      </Typography>
      <ProductContainer>
        {wishlistProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showWishlistButton
            isWishlisted={wishlistIds.includes(product.id)}
            onToggleWishlist={handleWishlist}
          />
        ))}
      </ProductContainer>
    </>
  );
};
