package com.example.foodapp.controller;

import com.example.foodapp.dto.CourseRequest;
import com.example.foodapp.dto.CourseResponse;
import com.example.foodapp.dto.LessonDto;
import com.example.foodapp.service.CourseService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final ObjectMapper objectMapper;

    @Autowired
    public CourseController(CourseService courseService, ObjectMapper objectMapper) {
        this.courseService = courseService;
        this.objectMapper = objectMapper;
    }

    @GetMapping
    public ResponseEntity<List<CourseResponse>> getAllCourses() {
        List<CourseResponse> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> createCourse(
            @Valid @RequestParam("title") String title,
            @RequestParam("chefName") String chefName,
            @RequestParam("date") String date,
            @RequestParam("description") String description,
            @RequestParam("level") String level,
            @RequestParam("category") String category,
            @RequestParam("cuisine") String cuisine,
            @RequestParam("duration") String duration,
            @RequestParam(value = "ageRecommendation", required = false) String ageRecommendation,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile,
            @RequestParam("lessons") String lessonsJson) {

        try {
            CourseRequest courseRequest = new CourseRequest();
            courseRequest.setTitle(title);
            courseRequest.setChefName(chefName);
            courseRequest.setDate(date);
            courseRequest.setDescription(description);
            courseRequest.setLevel(level);
            courseRequest.setCategory(category);
            courseRequest.setCuisine(cuisine);
            courseRequest.setAgeRecommendation(ageRecommendation);
            courseRequest.setDuration(duration);

            List<LessonDto> lessons = objectMapper.readValue(lessonsJson,
                    objectMapper.getTypeFactory().constructCollectionType(List.class, LessonDto.class));
            courseRequest.setLessons(lessons);

            CourseResponse savedCourse = courseService.createCourse(courseRequest, imageFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCourse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create course: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponse> getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<?> updateCourse(
            @PathVariable Long id,
            @Valid @RequestParam("title") String title,
            @RequestParam("chefName") String chefName,
            @RequestParam("date") String date,
            @RequestParam("description") String description,
            @RequestParam("level") String level,
            @RequestParam("category") String category,
            @RequestParam("cuisine") String cuisine,
            @RequestParam("duration") String duration,
            @RequestParam(value = "ageRecommendation", required = false) String ageRecommendation,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile,
            @RequestParam("lessons") String lessonsJson) {

        try {
            CourseRequest courseRequest = new CourseRequest();
            courseRequest.setTitle(title);
            courseRequest.setChefName(chefName);
            courseRequest.setDate(date);
            courseRequest.setDescription(description);
            courseRequest.setLevel(level);
            courseRequest.setCategory(category);
            courseRequest.setCuisine(cuisine);
            courseRequest.setAgeRecommendation(ageRecommendation);
            courseRequest.setDuration(duration);

            List<LessonDto> lessons = objectMapper.readValue(lessonsJson,
                    objectMapper.getTypeFactory().constructCollectionType(List.class, LessonDto.class));
            courseRequest.setLessons(lessons);

            return courseService.updateCourse(id, courseRequest, imageFile)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update course: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        boolean deleted = courseService.deleteCourse(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}