import CardHeader from "@mui/material/CardHeader";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { CardTitleRow, ProductImage, CardContainer } from "./Card.elements";

type ProductCardData = {
  id: number;
  name: string;
  image: string;
  price: number;
};

type ProductCardProps = {
  product: ProductCardData;
  showWishlistButton?: boolean;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: number) => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showWishlistButton = false,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  return (
    <CardContainer>
      <CardTitleRow>
        <CardHeader
          title={product.name}
          subheader={`$${product.price.toFixed(2)}`}
          sx={{
            flex: 1,
            "& .MuiCardHeader-title": { fontSize: "1rem" },
            "& .MuiCardHeader-subheader": { fontSize: "1rem" },
          }}
        />

        {showWishlistButton && onToggleWishlist && (
          <IconButton
            aria-label="add to favorites"
            sx={{
              position: "relative",
              top: "-0.5rem",
              ml: "auto",
              mr: "0.25rem",
            }}
            onClick={() => onToggleWishlist(product.id)}
          >
            <FavoriteIcon
              sx={{ color: isWishlisted ? "#d32f2f" : "#9e9e9e" }}
            />
          </IconButton>
        )}
      </CardTitleRow>

      <ProductImage src={product.image} alt={product.name} />
    </CardContainer>
  );
};
