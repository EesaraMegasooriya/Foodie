// src/main/java/com/example/foodapp/model/Comment.java
package com.example.foodapp.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "comments")
public class Comment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long postId;      // Won’t create a full Post relation—just store the FK

    @Column(columnDefinition = "TEXT")
    private String content;

    public Comment() {}
    public Comment(Long postId, String content) {
        this.postId = postId;
        this.content = content;
    }

    // Getters & setters
    public Long getId() { return id; }
    public Long getPostId() { return postId; }
    public void setPostId(Long postId) { this.postId = postId; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
