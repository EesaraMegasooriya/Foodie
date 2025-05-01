import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, ProgressBar, Form } from "react-bootstrap";

const LessonDetails = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [progress, setProgress] = useState(50); // Example progress, can be dynamic

  useEffect(() => {
    // Fetch lesson data by ID from the backend
    fetch(`/api/lessons/${id}`)
      .then((response) => response.json())
      .then((data) => setLesson(data));
  }, [id]);

  if (!lesson) return <div>Loading...</div>; // Display loading until data is fetched

  // Inline styles
  const containerStyle = {
    maxWidth: "1200px",
    margin: "auto",
    padding: "20px",
  };

  const cardStyle = {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
  };

  const sidebarStyle = {
    backgroundColor: "#e9ecef",
    padding: "20px",
    borderRadius: "8px",
  };

  const headingStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
  };

  const subheadingStyle = {
    fontWeight: "600",
    marginTop: "20px",
  };

  const progressBarStyle = {
    height: "20px",
    marginTop: "20px",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    marginTop: "20px",
  };

  return (
    <Container style={containerStyle}>
      <Row>
        <Col lg={8}>
          <Card style={cardStyle} className="shadow-lg">
            <Card.Body>
              <h2 style={headingStyle}>{lesson.title}</h2>
              <p className="text-muted">Chef: {lesson.chefName}</p>
              <p>{lesson.description}</p>

              {/* Resources Section */}
              <h4 style={subheadingStyle}>Resources</h4>
              {lesson.resources.map((resource, index) => (
                <div key={index} className="mb-3">
                  <h5>{resource.title}</h5>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-link"
                  >
                    View Resource
                  </a>
                </div>
              ))}

              {/* Progress Bar */}
              <h4 style={subheadingStyle}>Progress</h4>
              <ProgressBar
                now={progress}
                label={`${progress}%`}
                variant="success"
                style={progressBarStyle}
              />

              {/* Comments Section */}
              <h4 style={subheadingStyle}>Leave a Comment</h4>
              <Form>
                <Form.Group controlId="comment" className="mb-3">
                  <Form.Label>Share your thoughts</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write your comment here..."
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit Comment
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          {/* Sidebar with additional lesson information */}
          <Card style={sidebarStyle} className="shadow-lg">
            <Card.Body>
              <h5>Lesson Overview</h5>
              <p>
                <strong>Difficulty:</strong> {lesson.difficulty}
              </p>
              <p>
                <strong>Duration:</strong> {lesson.duration} minutes
              </p>
              <p>
                <strong>Last Updated:</strong> {lesson.updatedAt}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Image Below Content */}
      <img
        src={lesson.imageUrl || "path/to/default/image.jpg"}
        alt="Lesson Preview"
        style={imageStyle}
      />
    </Container>
  );
};

export default LessonDetails;
