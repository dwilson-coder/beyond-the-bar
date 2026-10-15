// src/components/Navbar.js
import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();
  const location = useLocation();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // ✅ Navigate to home + scroll to section
  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      // Already on home — just scroll
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // On another page — go home first, then scroll
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <Navbar expand="lg" fixed="top" className="custom-nav">
      <Container>
        <Link to="/" className="navbar-brand fw-bold text-decoration-none">
          BEYOND THE BAR
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link onClick={() => scrollToSection('home')}>Home</Nav.Link>
            <Nav.Link onClick={() => scrollToSection('about')}>About Us</Nav.Link>
            <Nav.Link onClick={() => scrollToSection('services')}>Our Services</Nav.Link>
            <Nav.Link onClick={() => scrollToSection('gallery')}>Event Gallery</Nav.Link>
            <Nav.Link onClick={() => scrollToSection('pricing')}>Price Package</Nav.Link>
            <Nav.Link onClick={() => scrollToSection('contact')}>Contact Us</Nav.Link>

            <Button variant="outline-light" onClick={toggleTheme} className="mx-2">
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>

            <Link to="/login">
              <Button variant="primary">Log In</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;   