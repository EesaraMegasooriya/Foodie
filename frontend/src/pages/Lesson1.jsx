import React from "react";
import { Container, Button, ProgressBar, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Lesson1 = () => {
  return (
    <Container fluid className="bg-light min-vh-100 py-5 px-3">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5 text-dark">
          Basic Knife Skills: <span className="text-primary">Chopping, dicing, mincing.</span>
        </h1>
        <p className="lead text-secondary w-75 mx-auto">
          Knife skills are essential for every chef, as they improve efficiency, precision, and safety in the kitchen. Mastering basic techniques like chopping, dicing, and mincing allows for uniform cooking, better presentation, and enhanced flavors.
        </p>
        <div className="w-50 mx-auto">
          <ProgressBar now={76} label={`76% completed`} className="shadow" />
        </div>
      </div>

      <Card className="p-4 shadow border-0 mx-auto mb-4" style={{ maxWidth: "700px" }}>
        <Card.Title className="bg-warning text-dark rounded-pill px-3 py-2 w-auto fw-bold">
          Lesson 01
        </Card.Title>
        <Card.Body>
          <p className="fw-bold">Introduction to Knife Skills.</p>
          <ul>
            <li>Importance of proper knife techniques</li>
            <li>Safety tips to avoid injuries</li>
          </ul>

          <p className="fw-bold">Essential Kitchen Knives & Their Uses.</p>
          <ul>
            <li>Chef’s knife: Multipurpose slicing and dicing</li>
            <li>Paring knife: Small, precise cuts</li>
            <li>Serrated knife: Cutting bread and soft vegetables</li>
            <li>Boning knife: Removing bones from meat</li>
          </ul>

          <p className="fw-bold">Resources (URLs, Articles, and Videos)</p>
          <ul>
            <li>Basic Knife Skills - Serious Eats</li>
            <li>
              <a href="https://www.youtube.com/watch?v=HowToHoldKnife" target="_blank" rel="noopener noreferrer">
                How to Hold and Use a Chef’s Knife - YouTube
              </a>
            </li>
            <li>Knife Safety Guide - The Kitchn</li>
          </ul>
        </Card.Body>
      </Card>

      <div className="text-center">
        <Button variant="primary" size="lg" className="px-5 rounded-pill shadow">
          Next
        </Button>
      </div>
    </Container>
  );
};

export default Lesson1;
