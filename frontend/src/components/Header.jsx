import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';

function Header() {
  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm mb-5">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center gap-2">
          <img src={Logo} width="45" height="45" alt="Logo" />
          
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/posts">
              Posts
            </Nav.Link>
            <Nav.Link as={NavLink} to="/events">
              Events
            </Nav.Link>
            <Nav.Link as={NavLink} to="/recipes">
              Recipes
            </Nav.Link>
            <Nav.Link as={NavLink} to="/skillshare">
              Skillshare
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
