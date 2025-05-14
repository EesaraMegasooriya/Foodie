import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import { BsUpload, BsPlusCircle, BsTrash, BsSave } from "react-icons/bs";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

const CourseUpdate = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  // Main form state
  const [formData, setFormData] = useState({
    title: "",
    chefName: "",
    date: new Date().toISOString().split('T')[0],
    description: "",
    level: "beginner",
    category: "",
    cuisine: "",
    ageRecommendation: "",
    duration: "",
  });

  // Lessons state
  const [lessons, setLessons] = useState([
    { lessonHeading: "", lessonContent: "", description: "", url: "", type: "", duration: "" }
  ]);

  // Image state
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch course data on component mount
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/courses/${courseId}`, {
          withCredentials: true
        });
        
        const course = response.data;
        
        // Set main form data
        setFormData({
          title: course.title,
          chefName: course.chefName,
          date: course.date.split('T')[0],
          description: course.description,
          level: course.level,
          category: course.category,
          cuisine: course.cuisine,
          ageRecommendation: course.ageRecommendation || "",
          duration: course.duration,
        });
        
        // Set lessons
        if (course.lessons && course.lessons.length > 0) {
          setLessons(course.lessons);
        }
        
        // Set current image URL if exists
        if (course.imageUrl) {
          setCurrentImageUrl(`http://localhost:8081${course.imageUrl}`);
          setImagePreview(`http://localhost:8081${course.imageUrl}`);
        }
        
        setFetching(false);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course data. Please try again later.");
        setFetching(false);
      }
    };
    
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  // Handle main form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle lesson form changes
  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...lessons];
    updatedLessons[index] = { ...updatedLessons[index], [field]: value };
    setLessons(updatedLessons);
  };

  // Add new lesson
  const addLesson = () => {
    setLessons([...lessons, { lessonHeading: "", lessonContent: "", description: "", url: "", type: "", duration: "" }]);
  };

  // Remove lesson
  const removeLesson = (index) => {
    if (lessons.length <= 1) return;
    const updatedLessons = [...lessons];
    updatedLessons.splice(index, 1);
    setLessons(updatedLessons);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        setError('Please select an image file (JPEG, PNG, etc.)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
      setError(null);
    }
  };

  // Validate form
  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Course title is required');
      return false;
    }
    if (!formData.chefName.trim()) {
      setError('Chef name is required');
      return false;
    }
    if (!formData.date) {
      setError('Publication date is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Course description is required');
      return false;
    }
    if (!formData.category) {
      setError('Category is required');
      return false;
    }
    if (!formData.cuisine) {
      setError('Cuisine type is required');
      return false;
    }
    if (!formData.duration) {
      setError('Course duration is required');
      return false;
    }

    // Validate lessons
    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      if (!lesson.lessonHeading.trim()) {
        setError(`Lesson ${i + 1}: Title is required`);
        return false;
      }
      if (!lesson.lessonContent.trim()) {
        setError(`Lesson ${i + 1}: Content is required`);
        return false;
      }
      if (!lesson.description.trim()) {
        setError(`Lesson ${i + 1}: Description is required`);
        return false;
      }
      if (!lesson.type) {
        setError(`Lesson ${i + 1}: Type is required`);
        return false;
      }
      if (!lesson.duration || isNaN(lesson.duration)) {
        setError(`Lesson ${i + 1}: Valid duration is required`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      
      // Create FormData object
      const formPayload = new FormData();
      
      // Add main course details
      formPayload.append("title", formData.title);
      formPayload.append("chefName", formData.chefName);
      formPayload.append("date", new Date(formData.date).toISOString());
      formPayload.append("description", formData.description);
      formPayload.append("level", formData.level);
      formPayload.append("category", formData.category);
      formPayload.append("cuisine", formData.cuisine);
      formPayload.append("ageRecommendation", formData.ageRecommendation || "");
      formPayload.append("duration", formData.duration);
      
      // Add lessons as a JSON string
      formPayload.append("lessons", JSON.stringify(lessons.map(lesson => ({
        lessonHeading: lesson.lessonHeading,
        lessonContent: lesson.lessonContent,
        description: lesson.description,
        url: lesson.url || "",
        type: lesson.type,
        duration: lesson.duration.toString()
      }))));
      
      // Add image file if a new one was selected
      if (image) {
        formPayload.append("imageFile", image);
      }
      
      // Make the PUT request to update the course
      const response = await axios.put(`http://localhost:8081/api/courses/${courseId}`, formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate(`/courses/${courseId}`); // Redirect to course view after successful update
        }, 2000);
      }
    } catch (err) {
      console.error("Error updating course:", err);
      
      let errorMessage = "Failed to update course. Please try again.";
      
      if (err.response) {
        if (err.response.status === 400) {
          if (err.response.data.errors) {
            errorMessage = "Validation errors: " + 
              Object.entries(err.response.data.errors)
                .map(([field, message]) => `${field}: ${message}`)
                .join(", ");
          } else if (err.response.data.message) {
            errorMessage = err.response.data.message;
          }
        } else if (err.response.status === 404) {
          errorMessage = "Course not found. It may have been deleted.";
        }
      } else if (err.request) {
        errorMessage = "No response from server. Please check your connection.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" role="status" variant="warning">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <>
      {success && (
        <Alert 
          variant="success" 
          className="position-fixed top-0 end-0 m-3 z-index-1050 min-width-300 shadow"
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Alert.Heading>Success!</Alert.Heading>
              <p>Course updated successfully.</p>
            </div>
          </div>
        </Alert>
      )}
      
      <Container className="my-5">
        {success && (
          <Alert variant="success" className="mb-4" onClose={() => setSuccess(false)} dismissible>
            Course successfully updated! Redirecting...
          </Alert>
        )}
        
        {error && (
          <Alert variant="danger" className="mb-4" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}
        
        <Card className="shadow-lg border-0">
          <Card.Header className="bg-warning text-dark">
            <h2 className="text-center my-2">Update Cooking Course</h2>
          </Card.Header>
          
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              <Row>
                {/* Course Details Section */}
                <Col md={12}>
                  <h4 className="mb-3 text-warning">Course Information</h4>
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Course Title</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="E.g., Mastering Italian Cuisine"
                          required
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Chef Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="chefName"
                          value={formData.chefName}
                          onChange={handleChange}
                          placeholder="Your name or professional title"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Publication Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Course Banner Image</Form.Label>
                        <div className="input-group">
                          <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="form-control"
                          />
                          <span className="input-group-text">
                            <BsUpload />
                          </span>
                        </div>
                        {imagePreview && (
                          <div className="mt-2 text-center">
                            <img
                              src={imagePreview}
                              alt="Course preview"
                              className="img-thumbnail"
                              style={{ height: "150px", objectFit: "cover" }}
                            />
                            <p className="text-muted mt-1">
                              {currentImageUrl && !image ? "Current image" : "New image selected"}
                            </p>
                          </div>
                        )}
                        <Form.Text className="text-muted">
                          Recommended size: 1200x600px, max 5MB
                        </Form.Text>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Difficulty Level</Form.Label>
                        <Form.Select 
                          name="level"
                          value={formData.level}
                          onChange={handleChange}
                          required
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="professional">Professional</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="baking">Baking & Pastry</option>
                          <option value="main-course">Main Courses</option>
                          <option value="appetizers">Appetizers & Starters</option>
                          <option value="desserts">Desserts</option>
                          <option value="beverages">Beverages & Drinks</option>
                          <option value="techniques">Cooking Techniques</option>
                          <option value="healthy">Healthy Cooking</option>
                          <option value="quick">Quick & Easy</option>
                          <option value="vegetarian">Vegetarian & Vegan</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Cuisine Type</Form.Label>
                        <Form.Select
                          name="cuisine"
                          value={formData.cuisine}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select cuisine type</option>
                          <option value="italian">Italian</option>
                          <option value="french">French</option>
                          <option value="indian">Indian</option>
                          <option value="chinese">Chinese</option>
                          <option value="japanese">Japanese</option>
                          <option value="mexican">Mexican</option>
                          <option value="mediterranean">Mediterranean</option>
                          <option value="american">American</option>
                          <option value="thai">Thai</option>
                          <option value="middle-eastern">Middle Eastern</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Course Duration</Form.Label>
                        <Form.Select
                          name="duration"
                          value={formData.duration}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select duration</option>
                          <option value="under-1-hour">Under 1 hour</option>
                          <option value="1-2-hours">1-2 hours</option>
                          <option value="2-4-hours">2-4 hours</option>
                          <option value="4-6-hours">4-6 hours</option>
                          <option value="6-plus-hours">6+ hours</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Course Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Provide an overview of what students will learn in this course..."
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>

                {/* Lessons Section */}
                <Col md={12}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-warning mb-0">Course Lessons ({lessons.length})</h4>
                    <Button 
                      variant="outline-success" 
                      onClick={addLesson}
                      className="d-flex align-items-center"
                    >
                      <BsPlusCircle className="me-2" /> Add New Lesson
                    </Button>
                  </div>
                  <p className="text-muted mb-4">Update or modify lessons for your course.</p>
                  
                  {lessons.map((lesson, index) => (
                    <Card key={index} className="mb-4 border-light shadow-sm">
                      <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Lesson {index + 1}</h5>
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          onClick={() => removeLesson(index)}
                          disabled={lessons.length === 1}
                          title={lessons.length === 1 ? "Course must have at least one lesson" : "Remove this lesson"}
                        >
                          <BsTrash />
                        </Button>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Lesson Title</Form.Label>
                              <Form.Control
                                type="text"
                                value={lesson.lessonHeading}
                                onChange={(e) => handleLessonChange(index, "lessonHeading", e.target.value)}
                                placeholder={`E.g., Basic Knife Skills - Part ${index + 1}`}
                                required
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Lesson Content</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                value={lesson.lessonContent}
                                onChange={(e) => handleLessonChange(index, "lessonContent", e.target.value)}
                                placeholder="Detailed step-by-step instructions for this lesson..."
                                required
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Short Description</Form.Label>
                              <Form.Control
                                type="text"
                                value={lesson.description}
                                onChange={(e) => handleLessonChange(index, "description", e.target.value)}
                                placeholder="Brief overview of this lesson's content"
                                required
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Resource URL</Form.Label>
                              <Form.Control
                                type="url"
                                value={lesson.url}
                                onChange={(e) => handleLessonChange(index, "url", e.target.value)}
                                placeholder="Link to video or additional resources"
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Lesson Type</Form.Label>
                              <Form.Select
                                value={lesson.type || ""}
                                onChange={(e) => handleLessonChange(index, "type", e.target.value)}
                                required
                              >
                                <option value="">Select lesson type</option>
                                <option value="video">Video Lesson</option>
                                <option value="recipe">Recipe</option>
                                <option value="technique">Technique Demonstration</option>
                                <option value="theory">Culinary Theory</option>
                                <option value="tips">Tips & Tricks</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Estimated Time (minutes)</Form.Label>
                              <Form.Control
                                type="number"
                                min="1"
                                value={lesson.duration || ""}
                                onChange={(e) => handleLessonChange(index, "duration", e.target.value)}
                                placeholder="e.g., 15"
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                </Col>
              </Row>

              {/* Submit Button */}
              <div className="d-grid gap-2 mt-4">
                <Button 
                  type="submit" 
                  variant="warning" 
                  size="lg" 
                  className="fw-bold" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      <span className="ms-2">Updating...</span>
                    </>
                  ) : (
                    <>
                      <BsSave className="me-2" /> Update Course
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CourseUpdate;