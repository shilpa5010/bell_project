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
// Mywishlist component to display products
export const Mywishlist: React.FC = () => {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/wishlist`)
      .then((res) => res.json())
      .then((data: Product[]) => setWishlistProducts(data))
      .catch((err) => console.error("Failed to fetch wishlist:", err));
  }, [API_BASE_URL]);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        My Wishlist
      </Typography>
      <ProductContainer>
        {wishlistProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductContainer>
    </>
  );
};
