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
      <h2 className='text-center mb-4 fw-bold'>Discover Cooking Lessons</h2>

      <div className='d-flex justify-content-between mb-3'>
        <Button
          variant='success'
          size='sm'
          onClick={() => navigate("/skills/add-lesson")} // Adjust the route as needed
          className='me-2'
          style={{
            background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
            border: "none",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            fontWeight: "600",
          }}
        >
          + Create Lesson
        </Button>

        <div>
          <Button
            variant={viewMode === "table" ? "primary" : "outline-primary"}
            size='sm'
            onClick={() => setViewMode("table")}
            className='me-2'
          >
            Table View
          </Button>
          <Button
            variant={viewMode === "grid" ? "primary" : "outline-primary"}
            size='sm'
            onClick={() => setViewMode("grid")}
          >
            Grid View
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
                    variant='info'
                    size='sm'
                    onClick={() => handleView(lesson._id)}
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
                        variant={lesson.liked ? "primary" : "outline-primary"}
                        onClick={() => toggleLike(lesson.id)}
                        size='sm'
                        title='Like'
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
