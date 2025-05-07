package com.example.foodapp.dto;

import com.example.foodapp.model.Course;
import com.example.foodapp.model.CourseLesson;

import java.util.List;
import java.util.stream.Collectors;

public class CourseResponse {
    private Long id;
    private String title;
    private String chefName;
    private String date;
    private String description;
    private String level;
    private String category;
    private String cuisine;
    private String ageRecommendation;
    private String imageUrl;
    private String duration;
    private List<LessonResponse> lessons;

    public CourseResponse(Course course) {
        this.id = course.getId();
        this.title = course.getTitle();
        this.chefName = course.getChefName();
        this.date = course.getDate();
        this.description = course.getDescription();
        this.level = course.getLevel();
        this.category = course.getCategory();
        this.cuisine = course.getCuisine();
        this.ageRecommendation = course.getAgeRecommendation();
        this.imageUrl = course.getImageUrl();
        this.duration = course.getDuration();
        this.lessons = course.getLessons().stream()
        .map(LessonResponse::new)
        .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getChefName() {
        return chefName;
    }

    public String getDate() {
        return date;
    }

    public String getDescription() {
        return description;
    }

    public String getLevel() {
        return level;
    }

    public String getCategory() {
        return category;
    }

    public String getCuisine() {
        return cuisine;
    }

    public String getAgeRecommendation() {
        return ageRecommendation;
    }

    public String getImageUrl() {
        // Return full URL for the image
        return imageUrl != null ? "http://localhost:8081/" + imageUrl : null;
    }

    public String getDuration() {
        return duration;
    }

    public List<LessonResponse> getLessons() {
        return lessons;
    }
}