// src/components/Skills/LessonCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const LessonCard = ({ lesson, onView }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{lesson.title}</Card.Title>
        <Card.Text>{lesson.description}</Card.Text>
        <Button variant="primary" onClick={() => onView(lesson._id)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default LessonCard;
