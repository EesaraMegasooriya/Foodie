package com.example.foodapp.repository;

import com.example.foodapp.model.Like;
import com.example.foodapp.model.Post;
import com.example.foodapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    /** Count how many likes a specific user has made on a specific post */
    long countByPostAndUser(Post post, User user);

    /** Retrieve a like entry for a given post and user */
    Like findByPostAndUser(Post post, User user);
}
