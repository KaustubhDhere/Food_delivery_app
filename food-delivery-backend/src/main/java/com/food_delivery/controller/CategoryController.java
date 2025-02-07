package com.food_delivery.controller;

import com.food_delivery.model.FoodItem;
import com.food_delivery.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories") //  Ensure API endpoint is correct
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    //  GET endpoint to fetch Pizza data from external API
    @GetMapping("/pizzas")
    public ResponseEntity<List<FoodItem>> getPizzas() {
        return ResponseEntity.ok(categoryService.fetchPizzas());
    }

    // GET endpoint to fetch Chinese food data from external API
    @GetMapping("/chinese")
    public ResponseEntity<List<FoodItem>> getChineseFood() {
        return ResponseEntity.ok(categoryService.fetchChineseFood());
    }

    // GET endpoint to fetch Cakes data from external API
    @GetMapping("/cakes")
    public ResponseEntity<List<FoodItem>> getCakes() {
        return ResponseEntity.ok(categoryService.fetchCakes());
    }

    // GET endpoint to fetch Cocktails data from external API
    @GetMapping("/cocktails")
    public ResponseEntity<List<FoodItem>> getCocktails() {
        return ResponseEntity.ok(categoryService.fetchCocktails());
    }

    // GET endpoint to fetch Mexican Food data from external API
    @GetMapping("/mexican")
    public ResponseEntity<List<FoodItem>> getMexicanFood() {
        return ResponseEntity.ok(categoryService.fetchMexicanFood());
    }
}
