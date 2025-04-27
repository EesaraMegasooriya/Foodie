package com.example.foodapp.controller;

import com.example.foodapp.model.Post;
import com.example.foodapp.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "http://localhost:5173") // React frontend port
public class PostController {

    @Autowired
    private PostRepository postRepository;

    // Endpoint to upload a post
    @PostMapping("/upload")
    public ResponseEntity<?> uploadPost(@RequestBody Post post) {

        if (post.getCaption() == null || post.getCaption().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Caption is required!");
        }

        postRepository.save(post);  // Save the post to the database

        return ResponseEntity.ok("Post uploaded successfully!");
    }
}
