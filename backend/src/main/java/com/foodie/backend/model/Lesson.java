package com.foodie.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "lessons")  // I suggest table names should be plural
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String chefName;
    private String date;
    private String lesson;
    private String heading;
    private String content;
    private String description;

    @Column(length = 255)
    private String image1;

    public Lesson() {
    }

    public Lesson(Long id, String title, String chefName, String date, String lesson, String heading, String content, String description, String image1) {
        this.id = id;
        this.title = title;
        this.chefName = chefName;
        this.date = date;
        this.lesson = lesson;
        this.heading = heading;
        this.content = content;
        this.description = description;
        this.image1 = image1;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

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

    public String getLesson() {
        return lesson;
    }

    public void setLesson(String lesson) {
        this.lesson = lesson;
    }

    public String getHeading() {
        return heading;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImage1() {
        return image1;
    }

    public void setImage1(String image1) {
        this.image1 = image1;
    }
}
