package com.example.foodapp.service;

import com.example.foodapp.model.Comment;

import java.util.List;

public interface CommentService {
    /** 
     * Adds a comment by a user to a post, enforcing no more than 10 comments per user per post. 
     */
    Comment addComment(Long postId, Long userId, String text);

    /** Retrieves all comments for the given post. */
    List<Comment> getCommentsByPostId(Long postId);
}
