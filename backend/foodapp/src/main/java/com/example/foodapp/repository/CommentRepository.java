package com.example.foodapp.repository;

import com.example.foodapp.model.Comment;
import com.example.foodapp.model.Post;
import com.example.foodapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    /** Retrieve all comments for a given post */
    List<Comment> findByPost(Post post);

    /** Count how many comments a specific user has made on a specific post */
    long countByPostAndUser(Post post, User user);
}
