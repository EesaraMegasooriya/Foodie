package com.example.foodapp.repository;

import java.util.List;
import com.example.foodapp.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostId(Long postId);
    long countByPostId(Long postId); // for the 10 comment limit
}
