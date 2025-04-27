package com.example.foodapp.controller;

import com.example.foodapp.model.Post;
import com.example.foodapp.repository.PostRepository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "http://localhost:5173") // React frontend port
public class PostController {

    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostRepository postRepository;

    // Upload (Create) a post
    @PostMapping("/upload")
    public ResponseEntity<?> uploadPost(@RequestBody Post post) {
        if (post.getCaption() == null || post.getCaption().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Caption is required!");
        }

        // Save the post to the database (initialize likes and comments if needed)
        post.setLikes(0); // Set default likes to 0
        post.setComments(post.getComments() != null ? post.getComments() : new ArrayList<>()); // Initialize comments if null

        postRepository.save(post);
        return ResponseEntity.ok("Post uploaded successfully!");
    }

    // Like a post
    @PostMapping("/{id}/like")
    public ResponseEntity<?> likePost(@PathVariable Long id) {
        Optional<Post> optionalPost = postRepository.findById(id);

        if (!optionalPost.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Post post = optionalPost.get();
        post.setLikes(post.getLikes() + 1); // Increment likes
        postRepository.save(post);

        return ResponseEntity.ok("Post liked!");
    }

    // Unlike a post
    @PostMapping("/{id}/unlike")
    public ResponseEntity<?> unlikePost(@PathVariable Long id) {
        logger.info("Trying to unlike post with ID: " + id);
        Optional<Post> optionalPost = postRepository.findById(id);
        
        if (!optionalPost.isPresent()) {
            return ResponseEntity.notFound().build();
        }
    
        Post post = optionalPost.get();
    
        // Make sure likes don't go below 0
        if (post.getLikes() > 0) {
            post.setLikes(post.getLikes() - 1); // Decrement likes
            postRepository.save(post);
            logger.info("Post with ID: " + id + " unliked, new like count: " + post.getLikes());
            return ResponseEntity.ok("Post unliked!");
        } else {
            logger.warn("Post with ID: " + id + " has no likes to unlike.");
            return ResponseEntity.badRequest().body("Cannot unlike. Likes already at zero!");
        }
    }

    // Add a comment to a post
    @PostMapping("/{id}/comment")
    public ResponseEntity<?> addComment(@PathVariable Long id, @RequestBody String comment) {
        if (comment == null || comment.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Comment cannot be empty!");
        }

        Optional<Post> optionalPost = postRepository.findById(id);

        if (!optionalPost.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Post post = optionalPost.get();
        post.getComments().add(comment); // Add comment
        postRepository.save(post);

        return ResponseEntity.ok("Comment added!");
    }

    // Get all posts (optional: so frontend can fetch and show posts)
    @GetMapping
    public ResponseEntity<?> getAllPosts() {
        return ResponseEntity.ok(postRepository.findAll());
    }

    // Get a specific post by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id) {
        Optional<Post> optionalPost = postRepository.findById(id);

        if (!optionalPost.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(optionalPost.get());
    }

    // Get comments for a specific post
    @GetMapping("/{id}/comments")
    public ResponseEntity<?> getCommentsForPost(@PathVariable Long id) {
        Optional<Post> optionalPost = postRepository.findById(id);

        if (!optionalPost.isPresent()) {
            return ResponseEntity.notFound().build(); // If post not found, return 404
        }

        Post post = optionalPost.get();
        List<String> comments = post.getComments(); // Get the list of comments

        return ResponseEntity.ok(comments); // Return comments in response
    }

    // Delete a post by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        Optional<Post> optionalPost = postRepository.findById(id);

        if (!optionalPost.isPresent()) {
            return ResponseEntity.notFound().build(); // If post not found, return 404
        }

        postRepository.deleteById(id); // Delete the post
        return ResponseEntity.ok("Post deleted successfully!");
    }
}
