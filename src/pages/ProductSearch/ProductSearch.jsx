import { useState, useEffect, useRef } from "react";
import {
  Container,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

function ProductSearch() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  const searchProducts = async (query) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);

      if (!query.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
        { signal: abortControllerRef.current.signal }
      );

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        console.error("Ошибка при поиске продуктов:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchProducts(value);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Поиск продуктов
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Введите название продукта..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: loading && <CircularProgress size={24} />,
          }}
        />
      </Box>

      {error && (
        <Box sx={{ mb: 3, p: 2, bgcolor: "error.light", borderRadius: 1 }}>
          <Typography color="error">Ошибка: {error}</Typography>
        </Box>
      )}

      {products.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Найдено продуктов: {products.length}
          </Typography>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={product.id}
                sx={{ display: "flex" }}
              >
                <Card
                  sx={{
                    height: 380,
                    width: "100%",
                    maxWidth: 320,
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 auto",
                  }}
                >
                  <Box
                    sx={{
                      height: 160,
                      width: "100%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f5f5f5",
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.thumbnail}
                      alt={product.title}
                      sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                        padding: 1,
                      }}
                    />
                  </Box>
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        height: "3em",
                        lineHeight: "1.5em",
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="primary"
                      gutterBottom
                      sx={{ flexShrink: 0 }}
                    >
                      ${product.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      sx={{
                        flexShrink: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.category}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        lineHeight: "1.43",
                      }}
                    >
                      {product.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {searchTerm.trim() && !loading && products.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Продукты не найдены
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default ProductSearch;
