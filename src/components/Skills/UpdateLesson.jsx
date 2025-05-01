import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import redchef from "../Skills/assets/redschef.jpg";

const UpdateLesson = () => {
  // Simulated fetched data for pre-filling the form (replace with actual data from API)
  const [formData, setFormData] = useState({
    title: "",
    chefName: "",
    date: "",
    heading: "",
    content: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <div className="w-50 p-4 shadow-lg rounded bg-light">
        <h2 className="text-center mb-4">Update Learning Lesson</h2>
        <Form>
          {/* Title Input */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Chef Name Input */}
          <Form.Group className="mb-3">
            <Form.Label>Chef Name</Form.Label>
            <Form.Control
              type="text"
              name="chefName"
              value={formData.chefName}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Date Input */}
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Heading Input */}
          <Form.Group className="mb-3">
            <Form.Label>Lesson Heading</Form.Label>
            <Form.Control
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Content Input */}
          <Form.Group className="mb-3">
            <Form.Label>Lesson Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Description Input */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Image Upload */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="img-fluid mt-2"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
            )}
          </Form.Group>

          {/* Submit Button */}
          <Button variant="warning" className="w-100 fw-bold">
            Update Lesson
          </Button>
        </Form>

        {/* Preview Image */}
        <img
          src={redchef}
          alt="Lesson Preview"
          className="img-fluid mt-3"
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
      </div>
    </Container>
  );
};

export default UpdateLesson;
