package com.example.foodapp.model;

import javax.persistence.*;

@Entity
@Table(name = "media")
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Original filename of the uploaded media */
    private String fileName;

    /** MIME type (e.g., image/png, video/mp4) */
    private String fileType;

    /** URL or path where the file is accessible */
    private String url;

    /**
     * Many media items belong to one post.
     * A post can have up to 3 media items.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    // Constructors

    public Media() {
    }

    public Media(String fileName, String fileType, String url, Post post) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.url = url;
        this.post = post;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
