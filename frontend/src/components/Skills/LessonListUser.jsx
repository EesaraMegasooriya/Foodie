import React, { useEffect, useState } from "react";
import { 
  Container, Card, Row, Col, Button, Alert, Form, Badge, 
  Spinner, InputGroup, ListGroup, Table
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { 
  FaHeart, FaRegHeart, FaThumbsUp, FaRegThumbsUp, 
  FaSearch, FaClock, FaUser, FaStar, FaComment,
  FaEye, FaEdit, FaTrash
} from "react-icons/fa";
import axios from "axios";

const LessonListUser = () => {
  const [lessons, setLessons] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    duration: "",
    level: "",
    cuisine: ""
  });
  const [activeCommentLesson, setActiveCommentLesson] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'
  const navigate = useNavigate();

  // Fetch lessons from API
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/courses");
        const lessonsWithImages = response.data.map(lesson => ({
          ...lesson,
          imageUrl: lesson.imageUrl || "/images/course-default.jpg"
        }));
        setLessons(lessonsWithImages);
        setFilteredLessons(lessonsWithImages);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch lessons");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  // Apply filters
  useEffect(() => {
    let results = lessons.filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lesson.chefName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !filters.category || lesson.category === filters.category;
      const matchesDuration = !filters.duration || lesson.duration === filters.duration;
      const matchesLevel = !filters.level || lesson.level === filters.level;
      const matchesCuisine = !filters.cuisine || lesson.cuisine === filters.cuisine;
      
      return matchesSearch && matchesCategory && matchesDuration && matchesLevel && matchesCuisine;
    });
    
    setFilteredLessons(results);
  }, [searchTerm, filters, lessons]);
  
  const handleView = (id) => {
    navigate(`/skills/lesson/${id}`);
  };

  const handleUpdate = (id) => {
    navigate(`/skills/update/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      try {
        await axios.delete(`http://localhost:8081/api/courses/${id}`, {
          withCredentials: true
        });
        
        // Update state to remove deleted lesson
        setLessons(lessons.filter(lesson => lesson._id !== id));
        setFilteredLessons(filteredLessons.filter(lesson => lesson._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete lesson");
      }
    }
  };

  const toggleFavorite = async (lessonId) => {
    try {
      await axios.patch(
        `http://localhost:8081/api/courses/${lessonId}/favorite`,
        {},
        { withCredentials: true }
      );
      setLessons(lessons.map(lesson =>
        lesson._id === lessonId
          ? { ...lesson, isFavorite: !lesson.isFavorite }
          : lesson
      ));
    } catch (err) {
      setError("Failed to update favorite status");
    }
  };

  const toggleLike = async (lessonId) => {
    try {
      await axios.patch(
        `http://localhost:8081/api/courses/${lessonId}/like`,
        {},
        { withCredentials: true }
      );
      setLessons(lessons.map(lesson =>
        lesson._id === lessonId
          ? {
              ...lesson,
              isLiked: !lesson.isLiked,
              likes: lesson.isLiked ? lesson.likes - 1 : lesson.likes + 1
            }
          : lesson
      ));
    } catch (err) {
      setError("Failed to update like status");
    }
  };

  const addComment = async (lessonId) => {
    if (!commentText.trim()) return;
    
    try {
      const response = await axios.post(
        `http://localhost:8081/api/courses/${lessonId}/comments`,
        { text: commentText },
        { withCredentials: true }
      );
      
      setLessons(lessons.map(lesson => 
        lesson._id === lessonId
          ? { ...lesson, comments: [...(lesson.comments || []), response.data] }
          : lesson
      ));
      setCommentText("");
      setActiveCommentLesson(null);
    } catch (err) {
      setError("Failed to add comment");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getUniqueValues = (field) => {
    return [...new Set(lessons.map(lesson => lesson[field]).filter(Boolean))];
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading cooking lessons...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger" className="text-center">
          {error}
          <Button variant="link" onClick={() => window.location.reload()}>
            Try again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4 fw-bold">Discover Cooking Lessons</h2>
      
      {/* View Mode Toggle */}
      <div className="d-flex justify-content-end mb-3">
        <Button 
          variant={viewMode === 'table' ? 'primary' : 'outline-primary'} 
          size="sm" 
          onClick={() => setViewMode('table')}
          className="me-2"
        >
          Table View
        </Button>
        <Button 
          variant={viewMode === 'grid' ? 'primary' : 'outline-primary'} 
          size="sm" 
          onClick={() => setViewMode('grid')}
        >
          Grid View
        </Button>
      </div>
      
      {/* Search and Filter Section */}
      <Card className="mb-4 p-3 shadow-sm">
        <Form>
          <Row>
            <Col md={5}>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search lessons by title, description or chef..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={7}>
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Select
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Categories</option>
                      {getUniqueValues('category').map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Select
                      name="cuisine"
                      value={filters.cuisine}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Cuisines</option>
                      {getUniqueValues('cuisine').map(cuisine => (
                        <option key={cuisine} value={cuisine}>{cuisine}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Select
                      name="duration"
                      value={filters.duration}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Durations</option>
                      {getUniqueValues('duration').map(duration => (
                        <option key={duration} value={duration}>{duration}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Select
                      name="level"
                      value={filters.level}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Levels</option>
                      {getUniqueValues('level').map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Card>
      
      {/* Results Count */}
      <div className="d-flex justify-content-between mb-3">
        <h5 className="text-muted">
          {filteredLessons.length} {filteredLessons.length === 1 ? 'lesson' : 'lessons'} found
        </h5>
        <Button 
          variant="outline-secondary" 
          size="sm"
          onClick={() => {
            setSearchTerm("");
            setFilters({
              category: "",
              duration: "",
              level: "",
              cuisine: ""
            });
          }}
        >
          Clear all filters
        </Button>
      </div>
      
      {/* Lessons Display */}
      {filteredLessons.length === 0 ? (
        <Card className="text-center p-5 shadow-sm">
          <h4 className="text-muted">No lessons match your search criteria</h4>
          <p className="text-muted">Try adjusting your filters or search term</p>
          <Button 
            variant="warning" 
            onClick={() => {
              setSearchTerm("");
              setFilters({
                category: "",
                duration: "",
                level: "",
                cuisine: ""
              });
            }}
          >
            Show all lessons
          </Button>
        </Card>
      ) : viewMode === 'table' ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Chef</th>
              <th>Level</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLessons.map(lesson => (
              <tr key={lesson._id}>
                <td>{lesson.title}</td>
                <td>{lesson.chefName}</td>
                <td>
                  <Badge bg={lesson.level === 'beginner' ? 'success' : 
                            lesson.level === 'intermediate' ? 'warning' : 
                            'danger'}>
                    {lesson.level}
                  </Badge>
                </td>
                <td>{lesson.category}</td>
                <td>
                  <Button 
                    variant="info" 
                    size="sm" 
                    className="me-2"
                    onClick={() => handleView(lesson._id)}
                  >
                    <FaEye /> View
                  </Button>
                  <Button 
                    variant="warning" 
                    size="sm" 
                    className="me-2"
                    onClick={() => handleUpdate(lesson._id)}
                  >
                    <FaEdit /> Update
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDelete(lesson._id)}
                  >
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredLessons.map((lesson) => (
            <Col key={lesson._id}>
              <Card className="h-100 shadow-sm">
                {/* Course Thumbnail */}
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={lesson.imageUrl}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Button
                    variant="link"
                    onClick={() => toggleFavorite(lesson._id)}
                    className="position-absolute top-0 end-0 m-2 p-0"
                    style={{ zIndex: 1 }}
                  >
                    {lesson.isFavorite ? (
                      <FaHeart color="red" size={24} />
                    ) : (
                      <FaRegHeart color="white" size={24} />
                    )}
                  </Button>
                </div>

                <Card.Body className="d-flex flex-column">
                  {/* Course Info */}
                  <div className="mb-2">
                    <Badge bg="secondary" className="me-1">{lesson.category}</Badge>
                    <Badge bg={lesson.level === 'beginner' ? 'success' : 
                              lesson.level === 'intermediate' ? 'warning' : 
                              'danger'}>
                      {lesson.level}
                    </Badge>
                  </div>
                  
                  <Card.Title className="fs-5">{lesson.title}</Card.Title>
                  
                  <div className="d-flex align-items-center text-muted small mb-2">
                    <FaUser className="me-2" />
                    <span>{lesson.chefName}</span>
                  </div>
                  
                  <div className="d-flex align-items-center text-muted small mb-3">
                    <FaClock className="me-2" />
                    <span>{lesson.duration}</span>
                  </div>
                  
                  <Card.Text className="flex-grow-1 small">
                    {lesson.description.length > 100 
                      ? `${lesson.description.substring(0, 100)}...` 
                      : lesson.description}
                  </Card.Text>
                  
                  {/* Action Buttons */}
                  <div className="d-flex justify-content-between mt-3">
                    <div>
                      <Button
                        variant={lesson.isLiked ? "primary" : "outline-primary"}
                        size="sm"
                        onClick={() => toggleLike(lesson._id)}
                        className="me-2"
                      >
                        {lesson.isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
                        <span className="ms-2">{lesson.likes || 0}</span>
                      </Button>
                      
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setActiveCommentLesson(
                          activeCommentLesson === lesson._id ? null : lesson._id
                        )}
                        className="me-2"
                      >
                        <FaComment />
                      </Button>
                      
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleView(lesson._id)}
                        className="me-2"
                      >
                        View
                      </Button>
                    </div>
                    
                    <div>
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => handleUpdate(lesson._id)}
                        className="me-2"
                      >
                        <FaEdit />
                      </Button>
                      
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(lesson._id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Comments Section */}
                  {activeCommentLesson === lesson._id && (
                    <div className="mt-3">
                      <Form.Group className="mb-2">
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add your comment..."
                        />
                      </Form.Group>
                      <div className="d-flex justify-content-end gap-2">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => setActiveCommentLesson(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => addComment(lesson._id)}
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default LessonListUser;