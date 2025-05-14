package com.example.foodapp.controller;

import com.example.foodapp.dto.JwtResponse;
import com.example.foodapp.dto.LoginRequest;
import com.example.foodapp.dto.RegisterRequest;
import com.example.foodapp.security.JwtUtil;
import com.example.foodapp.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    // Email Registration
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        return ResponseEntity.ok(userService.register(req));
    }

    // Email Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        return ResponseEntity.ok(userService.login(req));
    }

    // Google OAuth2 Login Success
    @GetMapping("/google/success")
    public ResponseEntity<?> googleSuccess(Authentication authentication) {
        System.out.println("👉 /google/success called");

        if (authentication == null) {
            System.out.println(" Authentication is null");
            return ResponseEntity.badRequest().body("No authentication found.");
        }

        try {
            OidcUser oidcUser = (OidcUser) authentication.getPrincipal();
            String email = oidcUser.getEmail();
            String name = oidcUser.getFullName();

            // ✅ Register user if not exists, generate JWT
            JwtResponse jwtResponse = userService.processGoogleUser(email, name);
            return ResponseEntity.ok(jwtResponse);

        } catch (ClassCastException e) {
            System.out.println(" Not an OidcUser: " + authentication.getPrincipal().getClass());
            return ResponseEntity.badRequest().body("Invalid user principal.");
        }
    }
}
