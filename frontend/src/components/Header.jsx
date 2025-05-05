import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // 🧹 Clears all localStorage items (jwt, name, etc.)
    navigate('/login');   // 🔁 Redirect to login page
  };
  

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm mb-5">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center gap-2">
          <img src={Logo} width="45" height="45" alt="Logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/posts">Posts</Nav.Link>
            <Nav.Link as={NavLink} to="/events">Events</Nav.Link>
            <Nav.Link as={NavLink} to="/recipes">Recipes</Nav.Link>
            <Nav.Link as={NavLink} to="/skillshare">Skillshare</Nav.Link>

            {/* 🚪 Logout Button */}
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
