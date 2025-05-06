import React, { useEffect, useState } from 'react';
import { 
  Container, Card, Row, Col, Button, Alert, 
  Spinner, Badge, ListGroup, Tab, Tabs, Image, Form,
  Modal, Accordion
} from 'react-bootstrap';
import { 
  FaHeart, FaRegHeart, FaThumbsUp, FaRegThumbsUp, 
  FaClock, FaUser, FaComment, FaArrowLeft, FaEdit, FaTrash,
  FaStar, FaUtensils, FaCalendarAlt, FaUsers
} from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BsUpload, BsPlusCircle, BsTrash } from "react-icons/bs";

const API_BASE_URL = 'http://localhost:8081';

const LessonDetail = () => {

  const { id } = useParams();
  const navigate =useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [commentText, setCommentText] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    category: '',
    cuisine: '',
    level: '',
    duration: '',
    ingredients: '',
    steps: ''
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image type and size
      if (!file.type.match('image.*')) {
        setError('Please select an image file (JPEG, PNG, etc.)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
      setError(null);
    }
  };

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/courses/${id}`, {
          withCredentials: true
        });
        
        const fetchedLesson = response.data;
        setLesson(fetchedLesson);
        setIsFavorite(fetchedLesson.isFavorite || false);
        setIsLiked(fetchedLesson.isLiked || false);
        setLikes(fetchedLesson.likes || 0);
        
        // Initialize edit form with lesson data
        setEditForm({
          title: fetchedLesson.title || '',
          description: fetchedLesson.description || '',
          category: fetchedLesson.category || '',
          cuisine: fetchedLesson.cuisine || '',
          level: fetchedLesson.level || '',
          duration: fetchedLesson.duration || '',
          ingredients: fetchedLesson.ingredients?.join('\n') || '',
          steps: fetchedLesson.steps?.join('\n') || ''
        });
      } catch (err) {
        console.error("Error fetching lesson:", err);
        setError(err.response?.data?.message || "Failed to fetch lesson details");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/courses/${id}/favorite`,
        {},
        { withCredentials: true }
      );
      
      if (response.data) {
        setIsFavorite(!isFavorite);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
      setError("Failed to update favorite status");
    }
  };

  const toggleLike = async () => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/courses/${id}/like`,
        {},
        { withCredentials: true }
      );
      
      if (response.data) {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
      setError("Failed to update like status");
    }
  };

  const addComment = async () => {
    if (!commentText.trim()) {
      return;
    }
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/courses/${id}/comments`,
        { text: commentText },
        { withCredentials: true }
      );
      
      // Check if response.data.comments exists, otherwise use response.data
      const updatedComments = response.data.comments || response.data;
      
      setLesson(prev => ({
        ...prev,
        comments: Array.isArray(updatedComments) ? updatedComments : [...(prev.comments || []), updatedComments]
      }));
      
      setCommentText('');
    } catch (err) {
      console.error("Error adding comment:", err);
      setError(err.response?.data?.message || "Failed to add comment");
    }
  };

  const handleDelete = async () => {
    try {
      // Add error handling and proper response handling
      const response = await axios.delete(`${API_BASE_URL}/api/courses/${id}`, {
        withCredentials: true
      });
      
      if (response.status === 200 || response.status === 204) {
        setShowDeleteModal(false);
        // navigate(`/skills/lesson/${lesson.id}`);
        navigate('/skills/userlist');


      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (err) {
      console.error("Error deleting lesson:", err);
      setError(err.response?.data?.message || "Failed to delete lesson. Please try again.");
      setShowDeleteModal(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
  
      // Append text fields
      formData.append("title", editForm.title);
      formData.append("chefName", lesson.chefName || "Anonymous"); // or allow editing if needed
      formData.append("date", lesson.date || new Date().toISOString());
      formData.append("description", editForm.description);
      formData.append("level", editForm.level);
      formData.append("category", editForm.category);
      formData.append("cuisine", editForm.cuisine);
      formData.append("duration", editForm.duration);
      formData.append("ageRecommendation", lesson.ageRecommendation || ""); // optional field
  
      // Convert ingredients & steps into lessons (or your actual structure)
      const lessons = lesson.lessons || [];
  
      const lessonsJson = JSON.stringify(lessons);
      formData.append("lessons", lessonsJson);
  
      // If image is not being updated, omit or send null
      // formData.append("imageFile", null); // OR if you allow image change: formData.append("imageFile", selectedFile);
      if (image) {
        formData.append("imageFile", image); // Make sure this matches your backend expectation
      }
      
      const response = await axios.put(
        `${API_BASE_URL}/api/courses/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      if (response.data) {
        setLesson(response.data);
        setIsEditing(false);
        alert("Lesson updated successfully!");
      }
    } catch (err) {
      console.error("Error updating lesson:", err);
      setError(err.response?.data?.message || "Failed to update lesson");
    }
  };
  

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
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
          <Button variant="link" onClick={() => navigate('/skills/lessons')}>
            Back to lessons
          </Button>
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

      {/* Action Buttons */}
      <div className="d-flex justify-content-end gap-2 mb-4">
        <Button 
          variant={isFavorite ? "danger" : "outline-danger"}
          onClick={toggleFavorite}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
          <span className="ms-2">Favorite</span>
        </Button>
        
        <Button 
          variant={isLiked ? "primary" : "outline-primary"}
          onClick={toggleLike}
        >
          {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
          <span className="ms-2">{likes || 0}</span>
        </Button>
        
        <Button 
          variant="warning" 
          onClick={() => setIsEditing(!isEditing)}
        >
          <FaEdit /> {isEditing ? "Cancel Edit" : "Edit Lesson"}
        </Button>
        
        <Button 
          variant="danger" 
          onClick={() => setShowDeleteModal(true)}
        >
          <FaTrash /> Delete
        </Button>
      </div>

      {isEditing ? (
        <Card className="mb-4 shadow">
          <Card.Body>
            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={editForm.category}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Appetizer">Appetizer</option>
                      <option value="Main Course">Main Course</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Beverage">Beverage</option>
                      <option value="Breakfast">Breakfast</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Cuisine</Form.Label>
                    <Form.Select
                      name="cuisine"
                      value={editForm.cuisine}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="">Select Cuisine</option>
                      <option value="Italian">Italian</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Indian">Indian</option>
                      <option value="Mexican">Mexican</option>
                      <option value="American">American</option>
                      <option value="Japanese">Japanese</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Level</Form.Label>
                    <Form.Select
                      name="level"
                      value={editForm.level}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="">Select Level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                      type="text"
                      name="duration"
                      value={editForm.duration}
                      onChange={handleEditChange}
                      placeholder="e.g. 30 minutes"
                      required
                    />
                  </Form.Group>
                </Col>
                {/* <Col md={4}>
                  <Form.Group>
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="imageUrl"
                      value={lesson.imageUrl || ''}
                      readOnly
                    />
                  </Form.Group>
                </Col> */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Course Banner Image</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="form-control"
                        required
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
                      </div>
                    )}
                    <Form.Text className="text-muted">
                      Recommended size: 1200x600px, max 5MB
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Ingredients (one per line)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="ingredients"
                  value={editForm.ingredients}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Steps (one per line)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="steps"
                  value={editForm.steps}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>
              
              <div className="d-flex justify-content-end gap-2">
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleUpdate}
                >
                  Save Changes
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <>
          {/* Lesson Header */}
          <Card className="mb-4 shadow">
            <Row className="g-0">
              <Col md={4}>
                <Image
                  src={lesson.imageUrl || "/images/course-default.jpg"}
                  fluid
                  className="rounded-start"
                  alt={lesson.title}
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <Badge bg="secondary" className="me-2">{lesson.category}</Badge>
                      <Badge bg={
                        lesson.level === 'beginner' ? 'success' : 
                        lesson.level === 'intermediate' ? 'warning' : 
                        'danger'
                      }>
                        {lesson.level}
                      </Badge>
                    </div>
                    <div className="text-muted">
                      <FaStar className="text-warning" /> {lesson.rating || "No ratings yet"}
                    </div>
                  </div>
                  
                  <Card.Title className="mt-2 fs-3 fw-bold">{lesson.title}</Card.Title>
                  
                  <div className="d-flex align-items-center mb-3">
                    <FaUser className="me-2 text-muted" />
                    <span className="fw-bold">{lesson.chefName}</span>
                  </div>
                  
                  <div className="d-flex gap-4 mb-3">
                    <div className="d-flex align-items-center text-muted">
                      <FaClock className="me-2" />
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="d-flex align-items-center text-muted">
                      <FaUtensils className="me-2" />
                      <span>{lesson.cuisine}</span>
                    </div>
                    {lesson.createdAt && (
                      <div className="d-flex align-items-center text-muted">
                        <FaCalendarAlt className="me-2" />
                        <span>{moment(lesson.createdAt).format("MMM D, YYYY")}</span>
                      </div>
                    )}
                  </div>
                  
                  <Card.Text className="lead">{lesson.description}</Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
          
          {/* Lesson Content Tabs */}
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
          >
            <Tab eventKey="overview" title="Overview">
              <Card className="shadow-sm mb-4">
                <Card.Body>
                  <h5 className="mb-3">Ingredients</h5>
                  {lesson.ingredients?.length > 0 ? (
                    <ListGroup variant="flush">
                      {lesson.ingredients.map((ingredient, index) => (
                        <ListGroup.Item key={index}>{ingredient}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <Alert variant="info">No ingredients listed</Alert>
                  )}
                </Card.Body>
              </Card>
              
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="mb-3">Steps</h5>
                  {lesson.steps?.length > 0 ? (
                    <ListGroup as="ol" numbered>
                      {lesson.steps.map((step, index) => (
                        <ListGroup.Item as="li" key={index}>
                          {step}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <Alert variant="info">No steps provided</Alert>
                  )}
                </Card.Body>
              </Card>
            </Tab>
            
            <Tab eventKey="lessons" title={`Lessons (${lesson.lessons?.length || 0})`}>
              <div className="mt-4">
                {lesson.lessons?.length > 0 ? (
                  <Accordion defaultActiveKey="0">
                    {lesson.lessons.map((item, index) => (
                      <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>
                          <div className="d-flex justify-content-between w-100 pe-3">
                            <div>
                              <strong>{item.lessonHeading}</strong>
                              <Badge bg="info" className="ms-2">{item.type}</Badge>
                            </div>
                            <div className="text-muted">
                              {item.duration} mins
                            </div>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <p className="mb-3">{item.description}</p>
                          
                          {item.lessonContent && (
                            <div className="mb-3 p-3 bg-light rounded">
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
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
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
                    disabled={!commentText.trim()}
                  >
                    <FaComment className="me-2" /> Post Comment
                  </Button>
                </Form.Group>
                
                {lesson.comments?.length > 0 ? (
                  <ListGroup variant="flush">
                    {lesson.comments.map((comment, index) => (
                      <ListGroup.Item key={index}>
                        <div className="d-flex justify-content-between">
                          <strong>{comment.user?.name || comment.username || "Anonymous"}</strong>
                          <small className="text-muted">
                            {comment.createdAt ? moment(comment.createdAt).fromNow() : "Just now"}
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
            
            <Tab eventKey="stats" title="Statistics">
              <Card className="shadow-sm">
                <Card.Body>
                  <Row>
                    <Col md={4} className="text-center">
                      <div className="display-4">{likes || 0}</div>
                      <div className="text-muted">Likes</div>
                    </Col>
                    <Col md={4} className="text-center">
                      <div className="display-4">{lesson.comments?.length || 0}</div>
                      <div className="text-muted">Comments</div>
                    </Col>
                    <Col md={4} className="text-center">
                      <div className="display-4">{lesson.enrollments || 0}</div>
                      <div className="text-muted">Enrollments</div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </>
      )}
      
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the lesson "{lesson.title}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Lesson
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LessonDetail;