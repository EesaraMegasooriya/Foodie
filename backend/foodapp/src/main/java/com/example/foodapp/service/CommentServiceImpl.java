package com.example.foodapp.service.impl;

import com.example.foodapp.model.Comment;
import com.example.foodapp.model.Post;
import com.example.foodapp.model.User;
import com.example.foodapp.repository.CommentRepository;
import com.example.foodapp.repository.PostRepository;
import com.example.foodapp.repository.UserRepository;
import com.example.foodapp.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepo,
                              PostRepository postRepo,
                              UserRepository userRepo) {
        this.commentRepository = commentRepo;
        this.postRepository = postRepo;
        this.userRepository = userRepo;
    }

    @Override
    public Comment addComment(Long postId, Long userId, String text) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        long existing = commentRepository.countByPostAndUser(post, user);
        if (existing >= 10) {
            throw new RuntimeException("Comment limit reached for this post");
        }

        Comment comment = new Comment(text, post, user);
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getCommentsByPostId(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return commentRepository.findByPost(post);
    }
}
