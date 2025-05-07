package com.example.foodapp.dto;

import java.util.List;

public class CourseRequest {
    private String title;
    private String chefName;
    private String date;
    private String description;
    private String level;
    private String category;
    private String cuisine;
    private String ageRecommendation;
    private List<LessonDto> lessons;
    private String duration;
    // Default constructor
    public CourseRequest() {
    }

    // Getters and setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getChefName() {
        return chefName;
    }

    public void setChefName(String chefName) {
        this.chefName = chefName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public String getAgeRecommendation() {
        return ageRecommendation;
    }

    public void setAgeRecommendation(String ageRecommendation) {
        this.ageRecommendation = ageRecommendation;
    }

    public List<LessonDto> getLessons() {
        return lessons;
    }

    public void setLessons(List<LessonDto> lessons) {
        this.lessons = lessons;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }
}