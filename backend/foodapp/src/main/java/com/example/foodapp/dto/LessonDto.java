package com.example.foodapp.dto;

public class LessonDto {
    private String lessonHeading;
    private String lessonContent;
    private String description;
    private String url;
    private String type;
    private String duration;

    // Default constructor
    public LessonDto() {
    }

    // Getters and setters
    public String getLessonHeading() {
        return lessonHeading;
    }

    public void setLessonHeading(String lessonHeading) {
        this.lessonHeading = lessonHeading;
    }

    public String getLessonContent() {
        return lessonContent;
    }

    public void setLessonContent(String lessonContent) {
        this.lessonContent = lessonContent;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }
}