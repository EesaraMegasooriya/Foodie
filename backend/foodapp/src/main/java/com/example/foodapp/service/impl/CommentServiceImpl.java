package com.example.foodapp.service.impl;

import com.example.foodapp.exception.ResourceNotFoundException;
import com.example.foodapp.model.Comment;
import com.example.foodapp.model.Event;
import com.example.foodapp.repository.CommentRepository;
import com.example.foodapp.repository.EventRepository;
import com.example.foodapp.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private EventRepository eventRepository;

    @Override
    public List<Comment> getCommentsByEventId(Long eventId) {
        return commentRepository.findByEventId(eventId);
    }

    @Override
    public Comment addComment(Long eventId, Comment comment) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + eventId));

        comment.setEvent(event);
        return commentRepository.save(comment);
    }

    @Override
    public Comment updateComment(Long commentId, Comment updatedComment, Long currentUserId) {
        Comment existingComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with ID: " + commentId));

        if (!existingComment.getUserId().equals(currentUserId)) {
            throw new SecurityException("You are not authorized to update this comment.");
        }

        existingComment.setContent(updatedComment.getContent());
        return commentRepository.save(existingComment);
    }

    @Override
    public void deleteComment(Long commentId, Long currentUserId) {
        Comment existingComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with ID: " + commentId));

        if (!existingComment.getUserId().equals(currentUserId)) {
            throw new SecurityException("You are not authorized to delete this comment.");
        }

        commentRepository.delete(existingComment);
    }
}
