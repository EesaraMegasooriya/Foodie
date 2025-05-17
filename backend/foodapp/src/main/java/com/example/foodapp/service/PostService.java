package com.example.foodapp.service;

import com.example.foodapp.model.Post;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {
    /** Create a new post */
    Post createPost(String caption, List<MultipartFile> files, Long userId);

    /** Get all posts */
    List<Post> getAllPosts();

    /** Get a single post by ID */
    Post getPostById(Long postId);

    /**
     * Update an existing post’s caption and (optionally) its media.
     * @param postId    ID of the post to update
     * @param newCaption New caption text
     * @param newFiles  New media files (null or empty = keep existing)
     * @param userId    ID of the user performing the update
     */
    Post updatePost(Long postId, String newCaption, List<MultipartFile> newFiles, Long userId);
}
