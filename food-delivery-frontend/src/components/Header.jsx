import React, { useContext } from "react";
import { AppBar, Toolbar, IconButton, Typography, Badge, Button, Menu, MenuItem, Switch, Box, Tooltip, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../services/api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import mainLogo from "../images/Mainlogo.jpg";
import { ColorModeContext } from "../App";
import styled from "styled-components";

const StyledLink = styled(Button)`
  && {
    color: white;
    text-transform: none;
    font-size: 16px;
    position: relative;
    &:hover {
      text-decoration: none;
    }
    &::after {
      content: "";
      display: block;
      width: 0;
      height: 2px;
      background: white;
      transition: width 0.3s;
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:hover::after {
      width: 100%;
    }
  }
`;

function Header({ cart }) {
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component={Link} to="/" edge="start" color="inherit" aria-label="logo">
            <img src={mainLogo} alt="Order Online" style={{ height: 50, borderRadius: "8px" }} />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1, fontWeight: "bold" }}>
            Food Delivery
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <StyledLink component={Link} to="/categories">Categories</StyledLink>
          <StyledLink component={Link} to="/menu">Menu</StyledLink>

          {/* Cart Icon with Badge */}
          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={cart.reduce((total, item) => total + item.quantity, 0)} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Dark Mode Toggle */}
          <Switch checked={mode === "dark"} onChange={toggleColorMode} />

          {/* Profile Menu */}
          {isAuthenticated() ? (
            <>
              <Tooltip title="Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Profile" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}><Typography textAlign="center">Profile</Typography></MenuItem>
                <MenuItem onClick={handleCloseUserMenu}><Typography textAlign="center">Dashboard</Typography></MenuItem>
                <MenuItem onClick={handleLogout}><Typography textAlign="center">Logout</Typography></MenuItem>
              </Menu>
            </>
          ) : (
            <StyledLink component={Link} to="/login">Login</StyledLink>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
