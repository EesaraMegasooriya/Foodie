package com.example.foodapp.repository;

import com.example.foodapp.model.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {
    // Additional query methods can be defined here if needed
}
