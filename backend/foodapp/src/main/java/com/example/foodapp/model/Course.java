package com.example.foodapp.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String chefName;
    private String date;
    private String description;
    private String level;
    private String category;
    private String cuisine;
    private String ageRecommendation;
    private String duration;
    private String imageUrl;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CourseLesson> lessons = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "course_likes",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> likedUsers = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "course_favourites",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> favouritedUsers = new HashSet<>();

    private Long version;

    // Constructors
    public Course() {
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<CourseLesson> getLessons() {
        return lessons;
    }

    public void setLessons(List<CourseLesson> lessons) {
        this.lessons = lessons;
    }

    public Set<User> getLikedUsers() {
        return likedUsers;
    }

    public void setLikedUsers(Set<User> likedUsers) {
        this.likedUsers = likedUsers;
    }

    public Set<User> getFavouritedUsers() {
        return favouritedUsers;
    }

    public void setFavouritedUsers(Set<User> favouritedUsers) {
        this.favouritedUsers = favouritedUsers;
    }

    public int getLikeCount() {
        return likedUsers.size();
    }

    public int getFavouriteCount() {
        return favouritedUsers.size();
    }

    // Helper methods for bidirectional relationship with lessons
    public void addLesson(CourseLesson lesson) {
        lessons.add(lesson);
        lesson.setCourse(this);
    }

    public void removeLesson(CourseLesson lesson) {
        lessons.remove(lesson);
        lesson.setCourse(null);
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", chefName='" + chefName + '\'' +
                '}';
    }
}
