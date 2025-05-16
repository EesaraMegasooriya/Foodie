// components/LessonGridRow.js
import React from 'react';
import { Row } from 'react-bootstrap';
import LessonCard from '../Skills/LessonCard'; // create or use a component that renders a single lesson

const LessonGridRow = ({ lessons }) => {
  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {lessons.map(lesson => (
        <LessonCard key={lesson._id} lesson={lesson} />
      ))}
    </Row>
  );
};

export default LessonGridRow;
