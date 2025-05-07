package com.example.foodapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String caption;

    private int likes;

    @ElementCollection
    private List<String> comments;

    @Column(nullable = true)
    private String fileName;  // ✅ Add this field to store the uploaded file name

    // Constructor
    public Post() {
        this.likes = 0;
        this.comments = new ArrayList<>();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
    }

    public String getFileName() {  // ✅ Getter for fileName
        return fileName;
    }

    public void setFileName(String fileName) {  // ✅ Setter for fileName
        this.fileName = fileName;
    }
}
