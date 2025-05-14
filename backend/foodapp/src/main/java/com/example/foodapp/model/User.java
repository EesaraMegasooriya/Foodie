package com.example.foodapp.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")  // Optional: explicitly name the table
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @ManyToMany(mappedBy = "likedUsers")
    private Set<Course> likedCourses = new HashSet<>();

    @ManyToMany(mappedBy = "favouritedUsers")
    private Set<Course> favouritedCourses = new HashSet<>();

    // Constructors
    public User() {
    }

    public User(String username) {
        this.username = username;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<Course> getLikedCourses() {
        return likedCourses;
    }

    public void setLikedCourses(Set<Course> likedCourses) {
        this.likedCourses = likedCourses;
    }

    public Set<Course> getFavouritedCourses() {
        return favouritedCourses;
    }

    public void setFavouritedCourses(Set<Course> favouritedCourses) {
        this.favouritedCourses = favouritedCourses;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                '}';
    }
}
