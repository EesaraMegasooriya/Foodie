package com.example.foodapp.controller;

import com.example.foodapp.model.*;
import com.example.foodapp.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*") // Allow frontend to connect
public class PostController {

    @Autowired
    private final PostService postService;

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping
    public Post createPost(@RequestBody Post post, @RequestBody List<Media> mediaList) {
        return postService.createPost(post, mediaList);
    }

    @PostMapping("/{postId}/comments")
    public Comment addComment(@PathVariable Long postId, @RequestBody Comment comment) {
        return postService.addComment(postId, comment);
    }

    @PostMapping("/{postId}/reactions")
    public Reaction reactToPost(@PathVariable Long postId, @RequestParam Long userId, @RequestParam String type) {
        return postService.reactToPost(postId, userId, type);
    }
}
