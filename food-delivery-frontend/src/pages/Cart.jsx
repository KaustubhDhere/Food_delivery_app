import React, { useState } from "react";
import {
  Container, Card, CardContent, CardMedia, Typography, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Box, Divider
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const Cart = ({ cart, setCart }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleQuantityChange = (item, change) => {
    setCart(cart.map(cartItem =>
      cartItem.id === item.id ? { ...cartItem, quantity: Math.max(1, cartItem.quantity + change) } : cartItem
    ));
  };

  const removeFromCart = (item) => {
    setCart(cart.filter(cartItem => cartItem.id !== item.id));
  };

  const handleCheckout = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCart([]); // Clear cart after checkout
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <Container sx={{ mt: 5, marginBottom:"80px", textAlign: "center", maxWidth: "800px" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        🛒 Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          <Box>
            {cart.map((item, index) => (
              <Card key={item.id} sx={{ display: "flex", alignItems: "center", mb: 2, p: 1, borderRadius: 2, boxShadow: 3, maxWidth: "700px", margin: "auto" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 100, height: 100, objectFit: "cover", borderRadius: "5px" }}
                  image={item.imageName}
                  alt={item.name}
                />
                <CardContent sx={{ flex: 1, textAlign: "left", ml: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${item.price} x {item.quantity} = <b>${(item.price * item.quantity).toFixed(2)}</b>
                  </Typography>
                </CardContent>
                <Box display="flex" alignItems="center">
                  <IconButton color="primary" onClick={() => handleQuantityChange(item, -1)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="h6" sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <IconButton color="primary" onClick={() => handleQuantityChange(item, 1)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => removeFromCart(item)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" sx={{ fontWeight: "bold", color: "green" }}>
            Total: ${totalAmount}
          </Typography>

          <Button 
            variant="contained" 
            color="success" 
            startIcon={<ShoppingCartCheckoutIcon />} 
            onClick={handleCheckout} 
            sx={{ mt: 3, px: 4, py: 1.5, fontSize: "1rem" }}
          >
            Proceed to Checkout
          </Button>
        </>
      )}

      {/* Checkout Confirmation Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle sx={{ textAlign: "center" }}>🎉 Order Placed Successfully!</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography>Your order has been placed successfully.</Typography>
          <Typography sx={{ fontWeight: "bold", mt: 2, color: "white" }}>Total Paid: ${totalAmount}</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;
