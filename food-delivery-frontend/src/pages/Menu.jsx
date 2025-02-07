import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardMedia, CardContent, Typography, Container, Grid, Button, IconButton, Snackbar, CircularProgress, Box, AppBar, Toolbar
} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Rating from "@mui/material/Rating";
import { useSnackbar } from 'notistack';

const Menu = ({ cart, setCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemQuantities, setItemQuantities] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios.get("http://localhost:8080/api/menu/all")
      .then(response => {
        const itemsWithPriceAndRating = response.data.map(item => ({
          ...item,
          price: (Math.random() * (20 - 5) + 5).toFixed(2), 
          rating: (Math.random() * (5 - 1) + 1).toFixed(1) 
        }));
        setMenuItems(itemsWithPriceAndRating);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      });
  }, []);

  const addToCart = (item) => {
    const quantity = itemQuantities[item.id] || 1;
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity }]);
    }

    enqueueSnackbar(`${item.name} added to cart!`, { variant: "success" });
  };

  const handleQuantityChange = (id, change) => {
    setItemQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change)
    }));
  };

  return (
    <Container sx={{ mt: 5 }}>
      
      <AppBar position="static" color="inherit" className="mb-4">
            <Toolbar>
              <Typography variant="h4" style={{ flexGrow: 1, textAlign: "center" }}>
              🍽️ Our Menu
              </Typography>
            </Toolbar>
          </AppBar>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {menuItems.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 350, borderRadius: 3, boxShadow: 5, transition: "0.3s", "&:hover": { boxShadow: 10 } }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.imageName}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    ${item.price}
                  </Typography>
                  <Rating value={parseFloat(item.rating)} precision={0.5} readOnly />
                  <Typography variant="body2" color="text.secondary">
                     {item.rating} / 5
                  </Typography>

                  <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
                    <IconButton color="primary" onClick={() => handleQuantityChange(item.id, -1)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="h6">{itemQuantities[item.id] || 1}</Typography>
                    <IconButton color="primary" onClick={() => handleQuantityChange(item.id, 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => addToCart(item)}
                    sx={{ mt: 2 }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Menu;
