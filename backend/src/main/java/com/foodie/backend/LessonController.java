package com.foodie.backend;

import com.foodie.backend.model.Lesson;
import com.foodie.backend.repo.LessonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LessonController {

    @Autowired
    private LessonRepo repo;

    // CREATE a new lesson
    @PostMapping("/lesson")
    public Lesson addLesson(@RequestBody Lesson lesson) {
        return repo.save(lesson);
    }

    // READ all lessons
    @GetMapping("/lesson")
    public List<Lesson> getAllLessons() {
        return repo.findAll();
    }

    // READ a lesson by ID
    @GetMapping("/lesson/{id}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE a lesson by ID
    @PutMapping("/lesson/{id}")
    public ResponseEntity<Lesson> updateLesson(@PathVariable Long id, @RequestBody Lesson lessonDetails) {
        return repo.findById(id).map(lesson -> {
            lesson.setTitle(lessonDetails.getTitle());
            lesson.setChefName(lessonDetails.getChefName());
            lesson.setDate(lessonDetails.getDate());
            lesson.setLesson(lessonDetails.getLesson());
            lesson.setHeading(lessonDetails.getHeading());
            lesson.setContent(lessonDetails.getContent());
            lesson.setDescription(lessonDetails.getDescription());
            lesson.setImage1(lessonDetails.getImage1());
            return ResponseEntity.ok(repo.save(lesson));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE a lesson by ID (Optional but useful)
    @DeleteMapping("/lesson/{id}")
    public ResponseEntity<Object> deleteLesson(@PathVariable Long id) {
        return repo.findById(id).map(lesson -> {
            repo.delete(lesson);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
