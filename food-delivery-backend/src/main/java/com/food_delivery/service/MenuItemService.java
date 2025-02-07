package com.food_delivery.service;

import com.food_delivery.model.MenuItem;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

@Service
public class MenuItemService {

    private final String MENU_API_URL = "https://the-vegan-recipes-db.p.rapidapi.com/";
    private final String API_KEY = "3ecca67c5fmsh6725ad0edc27p1d88a8jsn08a8d0c70d3e"; //  Replace with actual API key

    public List<MenuItem> fetchMenuItems() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-host", "the-vegan-recipes-db.p.rapidapi.com");
        headers.set("x-rapidapi-key", API_KEY);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(MENU_API_URL, HttpMethod.GET, entity, String.class);
        List<MenuItem> menuList = new ArrayList<>();

        if (response.getStatusCode() == HttpStatus.OK) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonArray = objectMapper.readTree(response.getBody());

                for (JsonNode obj : jsonArray) {
                    MenuItem item = new MenuItem(
                            obj.get("id").asLong(),
                            obj.get("title").asText(),
                            0.0,
                            obj.get("image").asText(),
                            "image/jpeg",
                            null,
                            null
                    );
                    menuList.add(item);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return menuList;
    }
}
