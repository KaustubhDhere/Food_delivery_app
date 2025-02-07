package com.food_delivery.service;

import com.food_delivery.model.FoodItem;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    private final String PIZZA_API_URL = "https://pizza-and-desserts.p.rapidapi.com/pizzas";
    private final String CHINESE_FOOD_API_URL = "https://chinese-food-db.p.rapidapi.com/";
    private final String CAKE_API_URL = "https://the-birthday-cake-db.p.rapidapi.com/";
    private final String COCKTAIL_API_URL = "https://the-cocktail-db3.p.rapidapi.com/";
    private final String MEXICAN_FOOD_API_URL = "https://the-mexican-food-db.p.rapidapi.com/";

    private final String API_KEY = "3ecca67c5fmsh672596aac27p1d88a8jsn08a8d0c70d3e"; // Replace with actual key

    public List<FoodItem> fetchPizzas() {
        return fetchFoodFromAPI(PIZZA_API_URL, "pizza-and-desserts.p.rapidapi.com");
    }

    public List<FoodItem> fetchChineseFood() {
        return fetchFoodFromAPI(CHINESE_FOOD_API_URL, "chinese-food-db.p.rapidapi.com");
    }

    public List<FoodItem> fetchCakes() {
        return fetchFoodFromAPI(CAKE_API_URL, "the-birthday-cake-db.p.rapidapi.com");
    }

    public List<FoodItem> fetchCocktails() {
        return fetchFoodFromAPI(COCKTAIL_API_URL, "the-cocktail-db3.p.rapidapi.com");
    }

    public List<FoodItem> fetchMexicanFood() {
        return fetchFoodFromAPI(MEXICAN_FOOD_API_URL, "the-mexican-food-db.p.rapidapi.com");
    }

    private List<FoodItem> fetchFoodFromAPI(String apiUrl, String host) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-host", host);
        headers.set("x-rapidapi-key", API_KEY);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, String.class);
        List<FoodItem> foodList = new ArrayList<>();

        if (response.getStatusCode() == HttpStatus.OK) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonArray = objectMapper.readTree(response.getBody());

                for (JsonNode obj : jsonArray) {
                    FoodItem item = new FoodItem(
                            obj.has("id") ? obj.get("id").asText() : "",
                            obj.has("name") ? obj.get("name").asText() : obj.get("title").asText(),
                            obj.has("description") ? obj.get("description").asText() : "",
                            obj.has("image") ? obj.get("image").asText() : obj.get("img").asText(),
                            obj.has("price") ? obj.get("price").asDouble() : 0.0
                    );
                    foodList.add(item);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return foodList;
    }
}
