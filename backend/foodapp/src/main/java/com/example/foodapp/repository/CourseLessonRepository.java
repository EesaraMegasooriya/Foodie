package com.example.foodapp.repository;

import com.example.foodapp.model.CourseLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository

public interface CourseLessonRepository extends JpaRepository<CourseLesson, Long> {
    List<CourseLesson> findByCourseId(Long courseId);
    void deleteAllByCourseId(Long courseId);
}