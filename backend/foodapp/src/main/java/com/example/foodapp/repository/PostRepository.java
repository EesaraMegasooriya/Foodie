package com.example.foodapp.repository;

import com.example.foodapp.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    // You can add custom queries here if needed
}
