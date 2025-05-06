import React, { useEffect, useState } from 'react';
import { 
  Container, Card, Button, Alert, Spinner, Badge, 
  ListGroup, Row, Col, Tab, Tabs, Form, Image
} from 'react-bootstrap';
import { 
  FaHeart, FaRegHeart, FaThumbsUp, FaRegThumbsUp, 
  FaClock, FaUser, FaComment, FaArrowLeft, FaEdit, FaTrash
} from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [commentText, setCommentText] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/courses/${id}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        setLesson(response.data);
        setIsFavorite(response.data.isFavorite || false);
        setIsLiked(response.data.isLiked || false);
        setLikes(response.data.likes || 0);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch lesson details");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      await axios.patch(
        `http://localhost:8081/api/courses/${id}/favorite`,
        {},
        { withCredentials: true }
      );
      setIsFavorite(!isFavorite);
    } catch (err) {
      setError("Failed to update favorite status");
    }
  };

  const toggleLike = async () => {
    try {
      await axios.patch(
        `http://localhost:8081/api/courses/${id}/like`,
        {},
        { withCredentials: true }
      );
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);
    } catch (err) {
      setError("Failed to update like status");
    }
  };

  const addComment = async () => {
    if (!commentText.trim()) return;
    
    try {
      const response = await axios.post(
        `http://localhost:8081/api/courses/${id}/comments`,
        { text: commentText },
        { withCredentials: true }
      );
      
      setLesson(prev => ({
        ...prev,
        comments: [...(prev.comments || []), response.data]
      }));
      setCommentText('');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add comment");
    }
  };

  const handleEdit = () => {
    navigate(`/skills/update/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://localhost:8081/api/courses/${id}`, {
          withCredentials: true
        });
        navigate('/skills/userlist');
      } catch (err) {
        setError("Failed to delete course");
      }
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading lesson details...</p>
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

  if (!lesson) {
    return (
      <Container className="py-4">
        <Alert variant="warning" className="text-center">
          Lesson not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button 
        variant="outline-secondary" 
        className="mb-4" 
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="me-2" /> Back to Courses
      </Button>

      <Card className="shadow-lg mb-4">
        <Card.Img
          variant="top"
          src={lesson.imageUrl || "/images/course-default.jpg"}
          style={{ height: "400px", objectFit: "cover" }}
          alt={lesson.title}
        />
        
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h1 className="mb-2">{lesson.title}</h1>
              <div className="d-flex gap-2 mb-3">
                <Badge bg="secondary">{lesson.category}</Badge>
                <Badge bg={lesson.level === 'beginner' ? 'success' : 
                          lesson.level === 'intermediate' ? 'warning' : 
                          'danger'}>
                  {lesson.level}
                </Badge>
                <Badge bg="info">{lesson.cuisine}</Badge>
              </div>
            </div>
            
            <div className="d-flex gap-2">
              <Button 
                variant={isFavorite ? "danger" : "outline-danger"} 
                onClick={toggleFavorite}
              >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
              </Button>
              <Button 
                variant={isLiked ? "primary" : "outline-primary"} 
                onClick={toggleLike}
              >
                {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
                <span className="ms-2">{likes}</span>
              </Button>
              <Button 
                variant="warning" 
                onClick={handleEdit}
              >
                <FaEdit /> Edit
              </Button>
              <Button 
                variant="danger" 
                onClick={handleDelete}
              >
                <FaTrash /> Delete
              </Button>
            </div>
          </div>
          
          <div className="d-flex align-items-center text-muted mb-4">
            <div className="d-flex align-items-center me-4">
              <FaUser className="me-2" />
              <span>{lesson.chefName}</span>
            </div>
            <div className="d-flex align-items-center">
              <FaClock className="me-2" />
              <span>{lesson.duration}</span>
            </div>
          </div>
          
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
          >
            <Tab eventKey="overview" title="Overview">
              <div className="mt-4">
                <h4>Course Description</h4>
                <p className="lead">{lesson.description}</p>
              </div>
            </Tab>
            
            <Tab eventKey="lessons" title={`Lessons (${lesson.lessons?.length || 0})`}>
              <div className="mt-4">
                {lesson.lessons?.length > 0 ? (
                  <ListGroup variant="flush">
                    {lesson.lessons.map((item, index) => (
                      <ListGroup.Item key={index} className="py-4">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h5>{item.lessonHeading}</h5>
                            <Badge bg="info" className="me-2">{item.type}</Badge>
                            <Badge bg="secondary">{item.duration} mins</Badge>
                            <p className="mt-2">{item.description}</p>
                          </div>
                        </div>
                        
                        {item.lessonContent && (
                          <div className="mt-3 p-3 bg-light rounded">
                            <h6>Lesson Content:</h6>
                            <p style={{ whiteSpace: 'pre-line' }}>{item.lessonContent}</p>
                          </div>
                        )}
                        
                        {item.url && (
                          <div className="mt-3">
                            <Button 
                              variant="outline-primary" 
                              as="a" 
                              href={item.url} 
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Additional Resources
                            </Button>
                          </div>
                        )}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <Alert variant="info">No lessons available for this course</Alert>
                )}
              </div>
            </Tab>
            
            <Tab eventKey="comments" title={`Comments (${lesson.comments?.length || 0})`}>
              <div className="mt-4">
                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share your thoughts about this course..."
                  />
                  <Button 
                    variant="primary" 
                    className="mt-2"
                    onClick={addComment}
                  >
                    <FaComment className="me-2" /> Post Comment
                  </Button>
                </Form.Group>
                
                {lesson.comments?.length > 0 ? (
                  <ListGroup variant="flush">
                    {lesson.comments.map((comment, index) => (
                      <ListGroup.Item key={index}>
                        <div className="d-flex justify-content-between">
                          <strong>{comment.user?.name || "Anonymous"}</strong>
                          <small className="text-muted">
                            {new Date(comment.createdAt).toLocaleString()}
                          </small>
                        </div>
                        <div className="mt-2">{comment.text}</div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <Alert variant="info">No comments yet. Be the first to comment!</Alert>
                )}
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LessonDetail;