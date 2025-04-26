package com.example.foodapp.repository;

import java.util.List;
import com.example.foodapp.model.Media;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepository extends JpaRepository<Media, Long> {
    List<Media> findByPostId(Long postId);
}
