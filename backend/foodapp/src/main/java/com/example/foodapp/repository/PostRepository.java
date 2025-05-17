package com.example.foodapp.repository;

import com.example.foodapp.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // Standard CRUD methods are available by extending JpaRepository
}

