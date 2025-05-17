package com.example.foodapp.service.impl;

import com.example.foodapp.exception.FileStorageException;
import com.example.foodapp.model.Media;
import com.example.foodapp.model.Post;
import com.example.foodapp.model.User;
import com.example.foodapp.repository.MediaRepository;
import com.example.foodapp.repository.PostRepository;
import com.example.foodapp.repository.UserRepository;
import com.example.foodapp.service.FileStorageService;
import com.example.foodapp.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final MediaRepository mediaRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    @Autowired
    public PostServiceImpl(PostRepository postRepository,
                           MediaRepository mediaRepository,
                           UserRepository userRepository,
                           FileStorageService fileStorageService) {
        this.postRepository    = postRepository;
        this.mediaRepository   = mediaRepository;
        this.userRepository    = userRepository;
        this.fileStorageService = fileStorageService;
    }

    @Override
    public Post createPost(String caption, List<MultipartFile> files, Long userId) {
        if (files.size() > 3) {
            throw new FileStorageException("Cannot upload more than 3 files");
        }

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = new Post();
        post.setCaption(caption);
        post = postRepository.save(post);

        List<Media> mediaList = new ArrayList<>();
        for (MultipartFile file : files) {
            String fileName = fileStorageService.storeFile(file);
            String url = "/files/" + fileName;
            Media media = new Media(fileName, file.getContentType(), url, post);
            mediaList.add(mediaRepository.save(media));
        }

        post.setMedia(mediaList);
        return postRepository.save(post);
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post getPostById(Long postId) {
        return postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    @Override
    public Post updatePost(Long postId, String newCaption, List<MultipartFile> newFiles, Long userId) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));

        // Optional: enforce ownership
        if (!post.getId().equals(postId)) {
            throw new RuntimeException("Not authorised to edit this post");
        }

        // Update caption
        post.setCaption(newCaption);

        // If new files provided, replace old media
        if (newFiles != null && !newFiles.isEmpty()) {
            // Delete existing media records and files
            mediaRepository.deleteAll(post.getMedia());
            post.getMedia().clear();

            List<Media> newMediaList = new ArrayList<>();
            for (MultipartFile file : newFiles) {
                String fileName = fileStorageService.storeFile(file);
                String url = "/files/" + fileName;
                Media m = new Media(fileName, file.getContentType(), url, post);
                newMediaList.add(mediaRepository.save(m));
            }
            post.setMedia(newMediaList);
        }

        return postRepository.save(post);
    }
}
