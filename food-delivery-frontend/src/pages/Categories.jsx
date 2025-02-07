import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Grid, Button, AppBar, Toolbar, CircularProgress } from "@mui/material";
import { getPizzas, getChineseFood, getCakes, getCocktails, getMexicanFood } from "../services/api";

const Categories = () => {
  const categories = [
    { id: "pizzas", name: "Pizzas", fetchFunction: getPizzas },
    { id: "chinese", name: "Chinese Food", fetchFunction: getChineseFood },
    { id: "cakes", name: "Cakes", fetchFunction: getCakes },
    { id: "cocktails", name: "Cocktails", fetchFunction: getCocktails },
    { id: "mexican", name: "Mexican Food", fetchFunction: getMexicanFood }
  ];

  const generateRandomPrice = () => {
    return (Math.random() * (20 - 5) + 5).toFixed(2); 
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category.name);
    setLoading(true);
    const data = await category.fetchFunction();
    setItems(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </Button>
          </Grid>
        ))}
      </Grid>

      {selectedCategory && (
        <div style={{ marginTop: "20px" }}>
          <AppBar position="static" color="inherit" className="mb-4">
            <Toolbar>
              <Typography variant="h4" style={{ flexGrow: 1, textAlign: "center" }}>
                {selectedCategory} Items
              </Typography>
            </Toolbar>
          </AppBar>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
              <CircularProgress />
            </div>
          ) : (
            <Grid container spacing={3}>
              {items.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card className="hover-card">
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.imageUrl || "https://via.placeholder.com/200"} // Fallback image
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="h6">${generateRandomPrice()}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;
