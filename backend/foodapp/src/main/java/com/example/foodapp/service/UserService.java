package com.example.foodapp.service;

import com.example.foodapp.dto.JwtResponse;
import com.example.foodapp.dto.LoginRequest;
import com.example.foodapp.dto.RegisterRequest;
import com.example.foodapp.model.User;
import com.example.foodapp.repository.UserRepository;
import com.example.foodapp.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public JwtResponse register(RegisterRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        user.setPassword(request.getPassword()); // Consider using PasswordEncoder here
        user.setRole("USER");
        user.setProvider("local");

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getName());
        user.setPassword(null); // Hide password in response
        return new JwtResponse(token, user);
    }

    public JwtResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

        String token = jwtUtil.generateToken(user.getEmail(), user.getName());
        user.setPassword(null); // Hide password in response
        return new JwtResponse(token, user);
    }

    public JwtResponse processGoogleUser(String email, String name) {
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setName(name);
            user.setProvider("google");
            user.setRole("USER");
            userRepository.save(user);
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getName());
        user.setPassword(null); // Hide password in response
        return new JwtResponse(token, user);
    }
}
