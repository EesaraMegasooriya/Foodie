import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Alert,
  Form,
  Badge,
  Spinner,
  InputGroup,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaClock,
  FaUser,
  FaEye,
  FaHeart,
  FaRegHeart,
  FaThumbsUp,
  FaRegThumbsUp,
} from "react-icons/fa";
import axios from "axios";
import api from "../../api";

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
    cuisine: "",
  });
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const API_BASE_URL = "http://localhost:8080";
  // const currentUserId = "user123";

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await api.get("http://localhost:8080/api/courses");
        const lessonsWithImages = response.data.map((lesson) => ({
          ...lesson,
          imageUrl: lesson.imageUrl || "/images/course-default.jpg",
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

  useEffect(() => {
    const results = lessons.filter((lesson) => {
      const matchesSearch =
        lesson.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.chefName?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !filters.category || lesson.category === filters.category;
      const matchesDuration =
        !filters.duration || lesson.duration === filters.duration;
      const matchesLevel = !filters.level || lesson.level === filters.level;
      const matchesCuisine =
        !filters.cuisine || lesson.cuisine === filters.cuisine;
      return (
        matchesSearch &&
        matchesCategory &&
        matchesDuration &&
        matchesLevel &&
        matchesCuisine
      );
    });
    setFilteredLessons(results);
  }, [searchTerm, filters, lessons]);

  const toggleFavorite = async (lessonId) => {
    try {
      const response = await axios.post(
        `/api/lessons/${lessonId}/favorite`, // Verify this endpoint
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful response
      setLessons(
        lessons.map((lesson) =>
          lesson._id === lessonId
            ? { ...lesson, isFavorite: !lesson.isFavorite }
            : lesson
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Add user feedback
      alert("Failed to update favorite status. Please try again.");
    }
  };
  const toggleLike = async (courseId) => {
    try {
      const response = await api.patch(
        `${API_BASE_URL}/api/courses/${courseId}/like`,
        {}
      );
      setLessons(
        lessons.map((lesson) =>
          lesson.id === courseId ? response.data : lesson
        )
      );
    } catch (err) {
      console.error("Error toggling like:", err);
      setError("Failed to update like status");
    }
  };

  const handleView = (id) => navigate(`/skills/lesson/${id}`);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const getUniqueValues = (field) => [
    ...new Set(lessons.map((lesson) => lesson[field]).filter(Boolean)),
  ];

  if (loading) {
    return (
      <Container className='py-5 text-center'>
        <Spinner animation='border' variant='primary' />
        <p className='mt-3'>Loading cooking lessons...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className='py-4'>
        <Alert variant='danger' className='text-center'>
          {error}
          <Button variant='link' onClick={() => window.location.reload()}>
            Try again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className='py-4'>
          <div style={{
        background: 'linear-gradient(135deg, #FFC107 0%, #FFA000 100%)',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 12px rgba(255, 193, 7, 0.3)',
        textAlign: 'center',
        color: '#fff'
      }}>
               <h2 className='text-center mb-4 fw-bold' style={{ color: '#000' }}>
          Discover Cooking Lessons
        </h2>
      </div>


      <div className="d-flex justify-content-between mb-3 align-items-center">
  <Button
    variant="warning"
    onClick={() => navigate('/skills/add')}
    className="d-flex align-items-center create-lesson-btn"
    style={{
      background: 'linear-gradient(135deg, #FFC107 0%, #FFA000  100%)',
      border: 'none',
      borderRadius: '0.25rem',
      padding: '8px 24px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      color: '#fff',
      textTransform: 'uppercase',
      position: 'relative',
      overflow: 'hidden',
      letterSpacing: '0.5px'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    }}
  >
    <span style={{
        display: 'inline-block',
        marginRight: '8px',
        fontSize: '1.3em',
        fontWeight: 'bold',
        transform: 'scale(1.3)',
        textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease'
      }}>+</span>
      Create Lesson
  </Button>
  
 {/* Updated View Toggle Buttons */}
<div className="d-flex">
  <Button
    variant={viewMode === 'table' ? 'warning' : 'outline-warning'}
    size="sm"
    onClick={() => setViewMode('table')}
    className="me-2"
    style={{
      fontWeight: '500',
      letterSpacing: '0.5px',
      borderColor: viewMode === 'table' ? 'transparent' : '#ffc107'
    }}
  >
    <i className="fas fa-table me-1"></i> Table
  </Button>
  <Button
    variant={viewMode === 'grid' ? 'warning' : 'outline-warning'}
    size="sm"
    onClick={() => setViewMode('grid')}
    style={{
      fontWeight: '500',
      letterSpacing: '0.5px',
      borderColor: viewMode === 'grid' ? 'transparent' : '#ffc107'
    }}
  >
    <i className="fas fa-th-large me-1"></i> Grid
  </Button>
</div>
</div>

      <Card className='mb-4 p-3 shadow-sm'>
        <Form>
          <Row>
            <Col md={5}>
              <Form.Group className='mb-3'>
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Search lessons...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={7}>
              <Row>
                {["category", "cuisine", "duration", "level"].map((field) => (
                  <Col md={3} key={field}>
                    <Form.Group className='mb-3'>
                      <Form.Select
                        name={field}
                        value={filters[field]}
                        onChange={handleFilterChange}
                      >
                        <option value=''>
                          All {field.charAt(0).toUpperCase() + field.slice(1)}s
                        </option>
                        {getUniqueValues(field).map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Form>
      </Card>

      <div className='d-flex justify-content-between mb-3'>
        <h5 className='text-muted'>
          {filteredLessons.length} lesson
          {filteredLessons.length === 1 ? "" : "s"} found
        </h5>
        <Button
          variant='outline-secondary'
          size='sm'
          onClick={() => {
            setSearchTerm("");
            setFilters({ category: "", duration: "", level: "", cuisine: "" });
          }}
        >
          Clear filters
        </Button>
      </div>

      {filteredLessons.length === 0 ? (
        <Card className='text-center p-5 shadow-sm'>
          <h4 className='text-muted'>No lessons found</h4>
          <Button
            variant='warning'
            style={{
          background: 'linear-gradient(135deg, #FFC107 0%, #FFA000 100%)',
          border: 'none',
          color: '#fff',
          fontWeight: '500'
        }}
            onClick={() => {
              setSearchTerm("");
              setFilters({
                category: "",
                duration: "",
                level: "",
                cuisine: "",
              });
            }}
          >
            Show all lessons
          </Button>
        </Card>
      ) : viewMode === "table" ? (
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
            {filteredLessons.map((lesson) => (
              <tr key={lesson._id}>
                <td>{lesson.title}</td>
                <td>{lesson.chefName}</td>
                <td>
                  <Badge
                    bg={
                      lesson.level === "beginner"
                        ? "success"
                        : lesson.level === "intermediate"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {lesson.level}
                  </Badge>
                </td>
                <td>{lesson.category}</td>
                <td>
                  <Button
                    variant='warning'
                    size='sm'
                    onClick={() => handleView(lesson._id)}
                    style={{
                  background: 'linear-gradient(135deg, #FFC107 0%, #FFA000 100%)',
                  border: 'none',
                  color: '#fff'
                }}
                  >
                    <FaEye /> View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className='g-4'>
          {filteredLessons.map((lesson) => (
            <Col key={lesson._id}>
              <Card className='h-100 shadow-sm'>
                <Card.Img
                  variant='top'
                  src={lesson.imageUrl}
                  alt={lesson.title}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => handleView(lesson._id)}
                />
                <Card.Body className='d-flex flex-column'>
                  <div className='mb-2'>
                    <Badge bg='secondary' className='me-1'>
                      {lesson.category}
                    </Badge>
                    <Badge
                      bg={
                        lesson.level === "beginner"
                          ? "success"
                          : lesson.level === "intermediate"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {lesson.level}
                    </Badge>
                  </div>
                  <Card.Title
                    className='fs-5 cursor-pointer'
                    onClick={() => handleView(lesson._id)}
                  >
                    {lesson.title}
                  </Card.Title>
                  <div className='d-flex align-items-center text-muted small mb-2'>
                    <FaUser className='me-2' />
                    <span>{lesson.chefName}</span>
                  </div>
                  <div className='d-flex align-items-center text-muted small mb-3'>
                    <FaClock className='me-2' />
                    <span>{lesson.duration}</span>
                  </div>
                  <Card.Text
                    className='flex-grow-1 small cursor-pointer'
                    onClick={() => handleView(lesson._id)}
                  >
                    {lesson.description?.length > 100
                      ? `${lesson.description.substring(0, 100)}...`
                      : lesson.description}
                  </Card.Text>
                  <div className='d-flex justify-content-between align-items-center mt-3'>
                    <Button
                      variant='warning'
                      size='sm'
                      onClick={() => handleView(lesson.id)}
                      style={{
                    background: 'linear-gradient(135deg, #FFC107 0%, #FFA000 100%)',
                    border: 'none',
                    color: '#fff'
                  }}
                    >
                      View Details
                    </Button>

                    <div className='d-flex gap-2'>
                      <Button
                        variant={lesson.favorite ? "danger" : "outline-danger"}
                        onClick={() => toggleFavorite(lesson.id)}
                        size='sm'
                        title='Favorite'
                      >
                        {lesson.favorite ? <FaHeart /> : <FaRegHeart />}
                      </Button>

                      <Button
                        variant={lesson.liked ? "warning" : "outline-warning"}
                        onClick={() => toggleLike(lesson.id)}
                        size='sm'
                        title='Like'
                        style={lesson.liked ? {
                        background: 'linear-gradient(135deg, #FFC107 0%, #FFA000 100%)',
                        border: 'none',
                        color: '#fff'
                    } : {}}
                      >
                        {lesson.liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
                        <span className='ms-1'>{lesson.likesCount || 0}</span>
                      </Button>
                    </div>
                  </div>
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
