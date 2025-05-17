package com.example.foodapp.service.impl;

import com.example.foodapp.model.Like;
import com.example.foodapp.model.Post;
import com.example.foodapp.model.User;
import com.example.foodapp.repository.LikeRepository;
import com.example.foodapp.repository.PostRepository;
import com.example.foodapp.repository.UserRepository;
import com.example.foodapp.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImpl implements LikeService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;

    @Autowired
    public LikeServiceImpl(PostRepository postRepo,
                           UserRepository userRepo,
                           LikeRepository likeRepo) {
        this.postRepository = postRepo;
        this.userRepository = userRepo;
        this.likeRepository = likeRepo;
    }

    @Override
    public boolean toggleLike(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Like existing = likeRepository.findByPostAndUser(post, user);
        if (existing != null) {
            likeRepository.delete(existing);
            return false;
        } else {
            likeRepository.save(new Like(post, user));
            return true;
        }
    }

    @Override
    public long countLikes(Long postId) {
        // Fallback: filter all likes by post ID
        List<Like> allLikes = likeRepository.findAll();
        return allLikes.stream()
                       .filter(like -> like.getPost().getId().equals(postId))
                       .count();
    }
}
