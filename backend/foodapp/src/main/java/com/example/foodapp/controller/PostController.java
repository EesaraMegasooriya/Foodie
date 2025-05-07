package com.example.foodapp.controller;

import com.example.foodapp.model.*;
import com.example.foodapp.service.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    public PostController(PostService postService) {
        this.postService = postService;
    }

    private static final String UPLOAD_DIR = "uploads/";

    @Autowired
    private PostService postService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadPost(
            @RequestParam("caption") String caption,
            @RequestParam(value = "files", required = false) List<MultipartFile> files) {

        if (caption == null || caption.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Caption is required");
        }

        List<Media> mediaList = new ArrayList<>();
        if (files != null && !files.isEmpty()) {
            if (files.size() > 3) {
                return ResponseEntity.badRequest().body("Max 3 media files allowed");
            }

            for (MultipartFile file : files) {
                try {
                    File uploadDir = new File(UPLOAD_DIR);
                    if (!uploadDir.exists()) uploadDir.mkdirs();

                    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    Path filePath = Paths.get(UPLOAD_DIR + fileName);
                    Files.write(filePath, file.getBytes());

                    public class Media {
                        private String fileType;
                        private String fileName;
                    

                } catch (IOException e) {
                    return ResponseEntity.internalServerError().body("Error uploading file: " + file.getOriginalFilename());
                }
            }
        }

        Post post = new Post();
        post.setCaption(caption);
        post.setLikes(0);
        post.setComments(new ArrayList<>());

        try {
            Post saved = postService.createPost(post, mediaList);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> likePost(@PathVariable Long id) {
        Reaction reaction = postService.reactToPost(id, 1L, "LIKE"); // Replace 1L with actual userId
        if (reaction == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Post liked!");
    }

    @PostMapping("/{id}/unlike")
    public ResponseEntity<?> unlikePost(@PathVariable Long id) {
        Reaction reaction = postService.reactToPost(id, 1L, "UNLIKE"); // Replace 1L with actual userId
        if (reaction == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Post unliked!");
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<?> addComment(@PathVariable Long id, @RequestBody String commentText) {
        if (commentText == null || commentText.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Comment cannot be empty");
        }

        Comment comment = new Comment();
        comment.setContent(commentText);


        try {
            Comment saved = postService.addComment(id, comment);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id) {
        Optional<Post> post = postService.getAllPosts().stream().filter(p -> p.getId().equals(id)).findFirst();
        return post.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<?> getComments(@PathVariable Long id) {
        Optional<Post> post = postService.getAllPosts().stream().filter(p -> p.getId().equals(id)).findFirst();
        return post.map(p -> ResponseEntity.ok(p.getComments()))
                   .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        Optional<Post> post = postService.getAllPosts().stream().filter(p -> p.getId().equals(id)).findFirst();
        if (post.isEmpty()) return ResponseEntity.notFound().build();

        // Optional: delete media files here if needed

        postService.deletePost(id);
        return ResponseEntity.ok("Post deleted");
    }

    public static String getUploadDir() {
        return UPLOAD_DIR;
    }

    public PostService getPostService() {
        return postService;
    }

    public void setPostService(PostService postService) {
        this.postService = postService;
    }
}
