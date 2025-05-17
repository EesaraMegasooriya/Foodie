// src/main/java/com/example/foodapp/controller/PostController.java
package com.example.foodapp.controller;

import com.example.foodapp.model.Comment;
import com.example.foodapp.model.Post;
import com.example.foodapp.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadPost(
            @RequestParam String caption,
            @RequestParam List<MultipartFile> files) {
        try {
            Post saved = postService.createPost(caption, files);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error uploading post");
        }
    }

    @GetMapping
    public ResponseEntity<List<Map<String,Object>>> getAllPosts() {
        List<Post> list = postService.getAllPosts();
        var dto = list.stream().map(p -> {
            Map<String,Object> m = new HashMap<>();
            m.put("id", p.getId());
            m.put("caption", p.getCaption());
            m.put("likes", p.getLikes());
            m.put("mediaPaths", p.getMediaPaths());
            List<String> cmts = postService.getComments(p.getId())
                                           .stream()
                                           .map(Comment::getContent)
                                           .toList();
            m.put("comments", cmts);
            return m;
        }).toList();
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<String> like(@PathVariable Long id) {
        try {
            postService.likePost(id);
            return ResponseEntity.ok("Liked");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/unlike")
    public ResponseEntity<String> unlike(@PathVariable Long id) {
        try {
            postService.unlikePost(id);
            return ResponseEntity.ok("Unliked");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<String> comment(
            @PathVariable Long id,
            @RequestBody Map<String,String> body) {
        try {
            String txt = body.get("comment");
            postService.addComment(id, txt);
            return ResponseEntity.ok("Comment added");
        } catch (NoSuchElementException|IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<?> getComments(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(postService.getComments(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
