package com.example.foodapp.service;

public interface LikeService {
    /**
     * Toggle a like for the given post by the given user.
     * @param postId ID of the post to like or unlike
     * @param userId ID of the user performing the action
     * @return true if the post is now liked, false if unliked
     */
    boolean toggleLike(Long postId, Long userId);

    /**
     * Count total likes on a post.
     * @param postId ID of the post
     * @return number of likes
     */
    long countLikes(Long postId);
}
