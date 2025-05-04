import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import redchef from "../assets/redschef.jpg";

const AddLesson = () => {
  const [formData, setFormData] = useState({
    title: "",
    chefName: "",
    date: "",
    lessonHeading: "",
    lessonContent: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("chefName", formData.chefName);
    formPayload.append("date", formData.date);
    formPayload.append("lessonHeading", formData.lessonHeading);
    formPayload.append("lessonContent", formData.lessonContent);
    formPayload.append("description", formData.description);
    if (image) {
      formPayload.append("image1", image);
    }

    console.log("Form submitted!");
    // await fetch('/api/lessons', {
    //   method: 'POST',
    //   body: formPayload
    // });
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-4">
      <div className="w-50 p-4 shadow-lg rounded bg-light">

        <h2 className="text-center mb-4">Add Learning Lesson</h2>
        <Form onSubmit={handleSubmit}>
          {/* Title Input */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
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
              placeholder="Enter chef name"
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

          {/* Lesson Heading Input */}
          <Form.Group className="mb-3">
            <Form.Label>Lesson Heading</Form.Label>
            <Form.Control
              type="text"
              name="lessonHeading"
              value={formData.lessonHeading}
              onChange={handleChange}
              placeholder="Enter lesson heading"
            />
          </Form.Group>

          {/* Lesson Content Input */}
          <Form.Group className="mb-3">
            <Form.Label>Lesson Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="lessonContent"
              value={formData.lessonContent}
              onChange={handleChange}
              placeholder="Enter lesson content"
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
              placeholder="Enter course description"
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
          <Button type="submit" variant="warning" className="w-100 fw-bold">
           Add Lesson
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

export default AddLesson;
