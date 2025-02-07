package com.food_delivery.controller;

import com.food_delivery.dto.AuthResponse;
import com.food_delivery.dto.LoginRequest;
import com.food_delivery.model.User;
import com.food_delivery.service.JwtService;
import com.food_delivery.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") //  Allow frontend
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already in use!");
        }
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            UserDetails userDetails = userService.loadUserByUsername(loginRequest.getEmail());
            String jwtToken = jwtService.generateToken(userDetails.getUsername());

            return ResponseEntity.ok(new AuthResponse(jwtToken));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid email or password!");
        }
    }
}
