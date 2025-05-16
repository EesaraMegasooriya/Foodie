package com.example.foodapp.controller;

import com.example.foodapp.dto.JwtResponse;
import com.example.foodapp.dto.LoginRequest;
import com.example.foodapp.dto.RegisterRequest;
import com.example.foodapp.security.JwtUtil;
import com.example.foodapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        return ResponseEntity.ok(userService.register(req));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        return ResponseEntity.ok(userService.login(req));
    }

    @GetMapping("/google/success")
    public ResponseEntity<?> googleSuccess(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.badRequest().body("No authentication found.");
        }

        try {
            OidcUser oidcUser = (OidcUser) authentication.getPrincipal();
            String email = oidcUser.getEmail();
            String name = oidcUser.getFullName();
            JwtResponse jwtResponse = userService.processGoogleUser(email, name);
            return ResponseEntity.ok(jwtResponse);
        } catch (ClassCastException e) {
            return ResponseEntity.badRequest().body("Invalid user principal.");
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body("User not authenticated");
        }
        // Assuming UserDetails contains id and username
        return ResponseEntity.ok(new UserResponse(
            Long.parseLong(userDetails.getUsername()), // userId as sub
            userDetails.getUsername()
        ));
    }

    // Simple DTO for user response
    public record UserResponse(Long id, String username) {}
}