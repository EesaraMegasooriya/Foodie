import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CourseAdd = () => {
  const [lesson, setLesson] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/lessons", lesson)
      .then(() => {
        alert("Lesson added");
        navigate("/lessons");
      })
      .catch((err) => console.error("Add failed:", err));
  };

  return (
    <div>
      <h2>Add New Lesson</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={lesson.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          name="description"
          value={lesson.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">Add Lesson</button>
      </form>
    </div>
  );
};

export default CourseAdd;
