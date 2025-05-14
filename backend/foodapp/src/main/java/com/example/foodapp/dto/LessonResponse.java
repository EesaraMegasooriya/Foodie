package com.example.foodapp.dto;

import com.example.foodapp.model.CourseLesson;

public class LessonResponse {
    private Long id;
    private String lessonHeading;
    private String lessonContent;
    private String description;
    private String url;
    private String type;
    private String duration;
    

    public LessonResponse(CourseLesson lesson) {
        this.id = lesson.getId();
        this.lessonHeading = lesson.getLessonHeading();
        this.lessonContent = lesson.getLessonContent();
        this.description = lesson.getDescription();
        this.url = lesson.getUrl();
        this.type = lesson.getType();
        this.duration = lesson.getDuration();
    }

    // Getters - no need for setters as this is a response DTO
    public Long getId() {
        return id;
    }

    public String getLessonHeading() {
        return lessonHeading;
    }

    public String getLessonContent() {
        return lessonContent;
    }

    public String getDescription() {
        return description;
    }

    public String getUrl() {
        return url;
    }

    public String getType() {
        return type;
    }

    public String getDuration() {
        return duration;
    }
}