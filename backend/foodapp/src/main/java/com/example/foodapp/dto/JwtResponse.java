package com.example.foodapp.dto;

import com.example.foodapp.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private User user;
}
