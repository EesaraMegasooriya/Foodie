// src/main/java/com/example/foodapp/service/PostService.java
package com.example.foodapp.service;

import com.example.foodapp.model.Comment;
import com.example.foodapp.model.Post;
import com.example.foodapp.model.Reaction;
import com.example.foodapp.repository.CommentRepository;
import com.example.foodapp.repository.PostRepository;
import com.example.foodapp.repository.ReactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.util.*;

@Service
public class PostService {

    private static final Path UPLOAD_DIR = Paths.get("uploads");
    private static final Long DEFAULT_USER_ID = 1L;

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private ReactionRepository reactionRepository;

    public Post createPost(String caption, List<MultipartFile> files) throws Exception {
        if (caption == null || caption.isBlank() || caption.length() > 200)
            throw new IllegalArgumentException("Caption must be 1–200 chars.");
        if (files == null || files.isEmpty())
            throw new IllegalArgumentException("At least one media file is required.");
        if (files.size() > 3)
            throw new IllegalArgumentException("Maximum 3 media files allowed.");

        if (!Files.exists(UPLOAD_DIR)) {
            Files.createDirectories(UPLOAD_DIR);
        }

        List<String> mediaPaths = new ArrayList<>();
        for (MultipartFile file : files) {
            String original = Objects.requireNonNull(file.getOriginalFilename());
            String filename = UUID.randomUUID() + "_" + original;
            Path target = UPLOAD_DIR.resolve(filename);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            mediaPaths.add("/uploads/" + filename);
        }

        Post post = new Post();
        post.setCaption(caption);
        post.setMediaPaths(mediaPaths);
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public void likePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post not found"));
        Optional<Reaction> existing = reactionRepository.findByPostIdAndUserId(postId, DEFAULT_USER_ID);
        if (existing.isPresent() && "like".equals(existing.get().getType()))
            throw new IllegalArgumentException("Already liked");
        Reaction reaction = existing.orElse(new Reaction());
        reaction.setPost(post);
        reaction.setUserId(DEFAULT_USER_ID);
        reaction.setType("like");
        reactionRepository.save(reaction);
        post.incrementLikes();
        postRepository.save(post);
    }

    public void unlikePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post not found"));
        Reaction reaction = reactionRepository.findByPostIdAndUserId(postId, DEFAULT_USER_ID)
                .orElseThrow(() -> new IllegalArgumentException("No like to remove"));
        reactionRepository.delete(reaction);
        post.decrementLikes();
        postRepository.save(post);
    }

    public Comment addComment(Long postId, String content) {
        if (content == null || content.isBlank())
            throw new IllegalArgumentException("Comment cannot be empty.");
        if (!postRepository.existsById(postId))
            throw new NoSuchElementException("Post not found");
        long count = commentRepository.countByPostId(postId);
        if (count >= 10)
            throw new IllegalArgumentException("Max 10 comments allowed.");
        Comment c = new Comment();
        c.setPostId(postId);
        c.setContent(content);
        return commentRepository.save(c);
    }

    public List<Comment> getComments(Long postId) {
        if (!postRepository.existsById(postId))
            throw new NoSuchElementException("Post not found");
        return commentRepository.findByPostId(postId);
    }
}
