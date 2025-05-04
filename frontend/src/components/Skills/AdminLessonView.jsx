import React from "react";
import { Container, Button, Table, Form } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const AdminLessonView = () => {
  return (
    <Container className="mt-4">
      {/* Title */}
      <h1 className="text-center fw-bold">Admin Learning Lesson List</h1>

      {/* Search Bar & Add Lessons Button */}
      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="d-flex align-items-center border rounded p-2 shadow-sm">
          <FaSearch className="me-2 text-muted" />
          <Form.Control
            type="text"
            placeholder="Type Here"
            className="border-0 shadow-none"
          />
        </div>

        <Button variant="warning" className="fw-bold d-flex align-items-center">
          <FaPlus className="me-2" /> Add Lessons
        </Button>
      </div>

      {/* Lessons Table */}
      <h2 className="fw-bold">Learning Lessons List</h2>
      <Table striped bordered hover responsive className="mt-3 text-center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Chef Name</th>
            <th>Date</th>
            <th>Images</th>
            <th>Lesson 1</th>
            <th>Lesson 2</th>
            <th>Lesson 3</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Example Lesson Entry */}
          <tr>
            <td>Pasta Mastery</td>
            <td>Learn the art of pasta making</td>
            <td>Chef Julia</td>
            <td>2025-04-10</td>
            <td>
              <img
                src="https://source.unsplash.com/50x50/?chef"
                alt="Lesson"
                className="rounded"
              />
            </td>
            <td>Types of Pasta</td>
            <td>Fresh Pasta Dough</td>
            <td>Sauce Perfection</td>
            <td>
              <Button variant="outline-primary" size="sm" className="me-2">
                <FaEdit />
              </Button>
              <Button variant="outline-danger" size="sm">
                <FaTrash />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminLessonView;
