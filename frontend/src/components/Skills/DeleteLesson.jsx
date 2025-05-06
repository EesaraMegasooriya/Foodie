import React, { useState } from "react";
import { Container, Card, Button, Alert, Spinner } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DeleteLesson = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:8081/api/courses/${courseId}`, {
        withCredentials: true,
      });
      if (response.status === 204) {
        setSuccess(true);
        setTimeout(() => navigate("/courses"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      {success && (
        <Alert variant="success" className="mb-4">
          Course deleted successfully! Redirecting...
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="mb-4" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      <Card className="shadow-lg border-0">
        <Card.Header className="bg-warning text-dark">
          <h2 className="text-center my-2">Delete Course</h2>
        </Card.Header>
        <Card.Body className="p-4">
          <p className="text-center">
            Are you sure you want to delete this course? This action cannot be undone.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={loading}
              className="d-flex align-items-center"
            >
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="ms-2">Deleting...</span>
                </>
              ) : (
                <>
                  <BsTrash className="me-2" /> Delete
                </>
              )}
            </Button>
            <Button variant="secondary" onClick={() => navigate(`/courses/${courseId}`)}>
              Cancel
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DeleteLesson;