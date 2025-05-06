// src/pages/LessonView.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LessonView = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/api/lessons")
      .then((res) => setLessons(res.data))
      .catch((err) => console.error("Error fetching lessons:", err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/api/lessons/${id}`)
      .then(() => setLessons(lessons.filter((l) => l.id !== id)))
      .catch((err) => console.error("Delete failed:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lesson List</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {lessons.map((lesson) => (
          <div key={lesson.id} style={{ border: "1px solid #ccc", padding: "10px", width: "23%" }}>
            <h4>{lesson.title}</h4>
            <p>{lesson.description}</p>
            <Link to={`/view/${lesson.id}`}>
              <button>View</button>
            </Link>
            <Link to={`/update/${lesson.id}`}>
              <button style={{ margin: "0 5px" }}>Update</button>
            </Link>
            <button onClick={() => handleDelete(lesson.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonView;
