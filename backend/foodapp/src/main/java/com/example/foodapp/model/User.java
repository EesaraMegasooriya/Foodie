package com.example.foodapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username; // Preserving from HEAD

    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String role; // e.g., ADMIN, CUSTOMER, etc.

    private String provider; // "local" or "google"

    @ManyToMany(mappedBy = "likedUsers")
    private Set<Course> likedCourses = new HashSet<>();

    @ManyToMany(mappedBy = "favouritedUsers")
    private Set<Course> favouritedCourses = new HashSet<>();
}
