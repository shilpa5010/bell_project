import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProductContainer } from "./Products.elements";

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

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
          <Card key={product.id} sx={{ maxWidth: 345 }}>
            <CardHeader
              title={product.name}
              subheader={`$${product.price.toFixed(2)}`}
            />
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
    </>
  );
};
