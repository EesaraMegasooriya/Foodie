package com.foodie.backend.repo;

import com.foodie.backend.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LessonRepo extends JpaRepository<Lesson, Long> {
}
