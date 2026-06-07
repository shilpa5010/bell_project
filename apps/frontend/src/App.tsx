import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Products } from "./components/Products.component";
import { Mywishlist } from "./components/Mywishlist.component";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
console.log("API Base URL:", API_BASE_URL);
function App() {
  const [storeName, setStoreName] = useState<string>("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/store-name`)
      .then((res) => res.json())
      .then((data: { name: string }) => setStoreName(data.name))
      .catch((err) => console.error("Failed to fetch store name:", err));
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            {storeName}
          </Typography>
          <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
            <Button color="inherit" component={Link} to="/mywishlist">
              My Wishlist
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/mywishlist" element={<Mywishlist />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
