package com.food_delivery.controller;

import com.food_delivery.model.MenuItem;
import com.food_delivery.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin("*")
public class MenuController {

    @Autowired
    private MenuItemService menuItemService;

    //  GET endpoint to fetch Menu items from the external API
    @GetMapping("/all")
    public ResponseEntity<List<MenuItem>> getMenuItems() {
        return ResponseEntity.ok(menuItemService.fetchMenuItems());
    }
}
