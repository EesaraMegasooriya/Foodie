package com.example.foodapp.service;

import com.example.foodapp.model.*;
import com.example.foodapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final MediaRepository mediaRepository;
    private final CommentRepository commentRepository;
    private final ReactionRepository reactionRepository;

    // Create a post with media (max 3)
    public Post createPost(Post post, List<Media> mediaList) {
        if (mediaList != null && mediaList.size() > 3) {
            throw new IllegalArgumentException("Max 3 media files allowed");
        }

        Post savedPost = postRepository.save(post);

        if (mediaList != null) {
            for (Media media : mediaList) {
                media.setPost(savedPost);
                mediaRepository.save(media);
            }
        }

        return savedPost;
    }

    // Add a comment (max 10 per post)
    public Comment addComment(Long postId, Comment comment) {
        long count = commentRepository.countByPostId(postId);
        if (count >= 10) {
            throw new IllegalArgumentException("Max 10 comments allowed per post");
        }

        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) return null;

        comment.setPost(post);
        return commentRepository.save(comment);
    }

    // React to a post (like/unlike)
    public Reaction reactToPost(Long postId, Long userId, String type) {
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null) return null;

        Optional<Reaction> existing = reactionRepository.findByPostIdAndUserId(postId, userId);
        Reaction reaction = existing.orElse(new Reaction());

        reaction.setPost(post);
        reaction.setUserId(userId);
        reaction.setType(type); // should be "LIKE" or "UNLIKE"

        return reactionRepository.save(reaction);
    }

    // Get all posts
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // Delete a post
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
