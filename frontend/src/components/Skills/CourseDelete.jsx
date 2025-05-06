import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CourseDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .delete(`http://localhost:8081/api/lessons/${id}`)
      .then(() => {
        alert("Lesson deleted");
        navigate("/lessons");
      })
      .catch((err) => console.error("Delete failed:", err));
  }, [id, navigate]);

  return <h2>Deleting Lesson...</h2>;
};

export default CourseDelete;
