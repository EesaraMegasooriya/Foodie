import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LessonListUser = () => {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with real API call
    const dummyLessons = [
      {
        id: 1,
        title: "Basic knife skills: chopping, dicing, mincing",
        chef: "Alex Gabhial",
        date: "2 months ago",
        image: "https://images.unsplash.com/photo-1606788075761-759aa67f4863",
      },
      {
        id: 2,
        title: "Baking fundamentals: bread, cookies, cakes",
        chef: "Alex Gabhial",
        date: "2 months ago",
        image: "https://images.unsplash.com/photo-1613145993483-cd9ac021efcd",
      },
      {
        id: 3,
        title: "Preparing a cake",
        chef: "Alex Gabhial",
        date: "2 months ago",
        image: "https://images.unsplash.com/photo-1589308078050-97209b69b1f6",
      },
    ];
    setLessons(dummyLessons);
  }, []);

  const goToDetails = (id) => {
    navigate(`/lesson/${id}`);
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4 fw-bold">Cooking Lessons</h2>
      {lessons.map((lesson) => (
        <Card className="mb-4 shadow-lg border-0" key={lesson.id}>
          <Row className="g-0">
            <Col md={4}>
              <Card.Img
                variant="top"
                src={lesson.image}
                style={{ height: "100%", objectFit: "cover" }}
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title
                  className="fw-bold fs-5 text-primary"
                  role="button"
                  onClick={() => goToDetails(lesson.id)}
                >
                  {lesson.title}
                </Card.Title>
                <Card.Text>
                  <strong>{lesson.chef}</strong> <br />
                  <small className="text-muted">Posted by {lesson.date}</small>
                </Card.Text>
                <Button variant="warning" className="fw-bold" onClick={() => goToDetails(lesson.id)}>
                  Learn More
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  );
};

export default LessonListUser;
