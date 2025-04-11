import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-light text-dark pt-4 border-top mt-5">
      <Container>
        <Row className="pb-4">
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">Foodie</h5>
            <p>
              Discover, share, and celebrate your love for food! Join Foodie to explore recipes,
              host events, and connect with culinary creators worldwide.
            </p>
          </Col>

          <Col md={4} className="mb-3">
            <h6 className="fw-bold">Explore</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-dark">Home</a></li>
              <li><a href="/events" className="text-decoration-none text-dark">Events</a></li>
              <li><a href="/posts" className="text-decoration-none text-dark">Posts</a></li>
              <li><a href="/recipes" className="text-decoration-none text-dark">Recipes</a></li>
              <li><a href="/skillshare" className="text-decoration-none text-dark">Skillshare</a></li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <h6 className="fw-bold">Connect With Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-dark fs-5"><FaFacebookF /></a>
              <a href="#" className="text-dark fs-5"><FaInstagram /></a>
              <a href="#" className="text-dark fs-5"><FaTwitter /></a>
              <a href="#" className="text-dark fs-5"><FaLinkedin /></a>
            </div>
          </Col>
        </Row>

        <Row className="text-center border-top pt-3">
          <Col>
            <small className="text-muted">&copy; {new Date().getFullYear()} Foodie. Made with ❤️  for food lovers.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
