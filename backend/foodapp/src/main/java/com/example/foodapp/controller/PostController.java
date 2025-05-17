package com.example.foodapp.controller;

import com.example.foodapp.model.Comment;
import com.example.foodapp.model.Post;
import com.example.foodapp.service.CommentService;
import com.example.foodapp.service.FileStorageService;
import com.example.foodapp.service.LikeService;
import com.example.foodapp.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PostController {

    private final PostService postService;
    private final CommentService commentService;
    private final LikeService likeService;
    private final FileStorageService fileStorageService;

    @Autowired
    public PostController(PostService postService,
                          CommentService commentService,
                          LikeService likeService,
                          FileStorageService fileStorageService) {
        this.postService        = postService;
        this.commentService     = commentService;
        this.likeService        = likeService;
        this.fileStorageService = fileStorageService;
    }

    /** Create a new post */
    @PostMapping("/posts")
    public ResponseEntity<Post> createPost(
            @RequestParam("caption") String caption,
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam("userId") Long userId) {

        Post created = postService.createPost(caption, files, userId);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /** List all posts */
    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    /** Retrieve a single post */
    @GetMapping("/posts/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    /** Edit a post’s caption and optionally replace its media */
    @PutMapping("/posts/{id}")
    public ResponseEntity<Post> editPost(
            @PathVariable Long id,
            @RequestParam("caption") String caption,
            @RequestParam(value = "files", required = false) List<MultipartFile> files,
            @RequestParam("userId") Long userId) {

        Post updated = postService.updatePost(id, caption, files, userId);
        return ResponseEntity.ok(updated);
    }

    // ----- Comments endpoints -----

    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity<Comment> addComment(
            @PathVariable Long postId,
            @RequestParam("userId") Long userId,
            @RequestParam("text") String text) {

        Comment comment = commentService.addComment(postId, userId, text);
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    @GetMapping("/posts/{postId}/comments")
    public List<Comment> getComments(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId);
    }

    // ----- Likes endpoints -----

    @PostMapping("/posts/{postId}/likes")
    public ResponseEntity<Void> toggleLike(
            @PathVariable Long postId,
            @RequestParam("userId") Long userId) {

        boolean nowLiked = likeService.toggleLike(postId, userId);
        return new ResponseEntity<>(nowLiked ? HttpStatus.CREATED : HttpStatus.NO_CONTENT);
    }

    @GetMapping("/posts/{postId}/likes/count")
    public long countLikes(@PathVariable Long postId) {
        return likeService.countLikes(postId);
    }

    // ----- File serving -----

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        Resource resource = fileStorageService.loadFileAsResource(filename);
        MediaType contentType = MediaType.APPLICATION_OCTET_STREAM;
        try {
            String probe = Files.probeContentType(resource.getFile().toPath());
            if (probe != null) contentType = MediaType.parseMediaType(probe);
        } catch (IOException ignored) { }
        return ResponseEntity.ok()
                .contentType(contentType)
                .body(resource);
    }
}
