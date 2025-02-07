import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Categories from "./pages/Categories";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { isAuthenticated } from "./services/api";


export const ColorModeContext = createContext();

function PrivateRoute({ element }) {
  return isAuthenticated() ? element : <Navigate to="/login" />;
}

function App() {
  const [cart, setCart] = useState([]);
  const [mode, setMode] = useState("dark");

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: mode === "dark" ? "#90caf9" : "#1976d2" },
      background: { default: mode === "dark" ? "#121212" : "#fff" },
      text: { primary: mode === "dark" ? "#fff" : "#000" },
    },
  });

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header cart={cart} />
          <div className="container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/categories" element={<PrivateRoute element={<Categories />}/>} />
              <Route path="/menu" element={<PrivateRoute element={<Menu cart={cart} setCart={setCart} />}/>} />
              <Route path="/cart" element={<PrivateRoute element={<Cart cart={cart} setCart={setCart} />} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
           
            </Routes>
          </div>
          <Footer />
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
