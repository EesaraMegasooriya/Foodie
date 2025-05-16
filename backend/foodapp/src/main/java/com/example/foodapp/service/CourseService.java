package com.example.foodapp.service;
import com.example.foodapp.dto.CourseRequest;
import com.example.foodapp.dto.CourseResponse;
import com.example.foodapp.dto.LessonDto;
import com.example.foodapp.model.Course;
import com.example.foodapp.model.CourseLesson;
import com.example.foodapp.repository.CourseRepository;
import com.example.foodapp.repository.UserRepository;
import com.example.foodapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final FileStorageService fileStorageService;
    private UserRepository userRepository;
    public void likeCourse(Long courseId, Long userId) {
        Course course = courseRepository.findById(courseId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        course.getLikedUsers().add(user);
        courseRepository.save(course);
        
    }
    
    public void favouriteCourse(Long courseId, Long userId) {
        Course course = courseRepository.findById(courseId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        course.getFavouritedUsers().add(user);
        courseRepository.save(course);
    }

    public int getLikeCount(Long courseId) {
        return courseRepository.findById(courseId).map(Course::getLikeCount).orElse(0);
    }

    public int getFavouriteCount(Long courseId) {
        return courseRepository.findById(courseId).map(Course::getFavouriteCount).orElse(0);
    }

    @Autowired
    public CourseService(CourseRepository courseRepository, FileStorageService fileStorageService) {
        this.courseRepository = courseRepository;
        this.fileStorageService = fileStorageService;
    }

    @Transactional
    public CourseResponse createCourse(CourseRequest courseRequest, MultipartFile imageFile) {
        validateCourseRequest(courseRequest);
        Course course = new Course();
        populateCourseFromRequest(course, courseRequest);

        if (imageFile != null && !imageFile.isEmpty()) {
            String fileName = fileStorageService.storeFile(imageFile);
            course.setImageUrl(fileName);
        }

        if (courseRequest.getLessons() != null) {
            for (LessonDto lessonDto : courseRequest.getLessons()) {
                validateLessonDto(lessonDto);
                CourseLesson lesson = new CourseLesson();
                populateLessonFromDto(lesson, lessonDto);
                course.addLesson(lesson);
            }
        }

        Course savedCourse = courseRepository.save(course);
        return new CourseResponse(savedCourse);
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(CourseResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<CourseResponse> getCourseById(Long id) {
        return courseRepository.findById(id)
                .map(CourseResponse::new);
    }

    @Transactional
    public Optional<CourseResponse> updateCourse(Long id, CourseRequest courseRequest, MultipartFile imageFile) {
        validateCourseRequest(courseRequest);
        return courseRepository.findById(id).map(course -> {
            populateCourseFromRequest(course, courseRequest);

            if (imageFile != null && !imageFile.isEmpty()) {
                // Delete old image if it exists
                if (course.getImageUrl() != null) {
                    fileStorageService.deleteFile(course.getImageUrl());
                }
                String fileName = fileStorageService.storeFile(imageFile);
                course.setImageUrl(fileName);
            }

            course.getLessons().clear();
            if (courseRequest.getLessons() != null) {
                for (LessonDto lessonDto : courseRequest.getLessons()) {
                    validateLessonDto(lessonDto);
                    CourseLesson lesson = new CourseLesson();
                    populateLessonFromDto(lesson, lessonDto);
                    course.addLesson(lesson);
                }
            }

            Course updatedCourse = courseRepository.save(course);
            return new CourseResponse(updatedCourse);
        });
    }

    @Transactional
    public boolean deleteCourse(Long id) {
        Optional<Course> courseOptional = courseRepository.findById(id);
        if (courseOptional.isPresent()) {
            Course course = courseOptional.get();
            if (course.getImageUrl() != null) {
                fileStorageService.deleteFile(course.getImageUrl());
            }
            courseRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private void validateCourseRequest(CourseRequest request) {
        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Course title is required");
        }
        if (request.getChefName() == null || request.getChefName().trim().isEmpty()) {
            throw new IllegalArgumentException("Chef name is required");
        }
        if (request.getDate() == null || request.getDate().trim().isEmpty()) {
            throw new IllegalArgumentException("Date is required");
        }
        if (request.getDescription() == null || request.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("Description is required");
        }
        if (request.getLevel() == null || request.getLevel().trim().isEmpty()) {
            throw new IllegalArgumentException("Level is required");
        }
        if (request.getCategory() == null || request.getCategory().trim().isEmpty()) {
            throw new IllegalArgumentException("Category is required");
        }
        if (request.getCuisine() == null || request.getCuisine().trim().isEmpty()) {
            throw new IllegalArgumentException("Cuisine is required");
        }
        if (request.getDuration() == null || request.getDuration().trim().isEmpty()) {
            throw new IllegalArgumentException("Duration is required");
        }
    }

    private void validateLessonDto(LessonDto lessonDto) {
        if (lessonDto.getLessonHeading() == null || lessonDto.getLessonHeading().trim().isEmpty()) {
            throw new IllegalArgumentException("Lesson heading is required");
        }
        if (lessonDto.getLessonContent() == null || lessonDto.getLessonContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Lesson content is required");
        }
        if (lessonDto.getDescription() == null || lessonDto.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("Lesson description is required");
        }
        if (lessonDto.getType() == null || lessonDto.getType().trim().isEmpty()) {
            throw new IllegalArgumentException("Lesson type is required");
        }
        if (lessonDto.getDuration() == null || lessonDto.getDuration().trim().isEmpty()) {
            throw new IllegalArgumentException("Lesson duration is required");
        }
    }

    private void populateCourseFromRequest(Course course, CourseRequest request) {
        course.setTitle(request.getTitle());
        course.setChefName(request.getChefName());
        course.setDate(request.getDate());
        course.setDescription(request.getDescription());
        course.setLevel(request.getLevel());
        course.setCategory(request.getCategory());
        course.setCuisine(request.getCuisine());
        course.setAgeRecommendation(request.getAgeRecommendation());
        course.setDuration(request.getDuration());
    }

    private void populateLessonFromDto(CourseLesson lesson, LessonDto dto) {
        lesson.setLessonHeading(dto.getLessonHeading());
        lesson.setLessonContent(dto.getLessonContent());
        lesson.setDescription(dto.getDescription());
        lesson.setUrl(dto.getUrl());
        lesson.setType(dto.getType());
        lesson.setDuration(dto.getDuration());
    }
}