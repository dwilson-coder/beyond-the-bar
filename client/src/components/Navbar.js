// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './common/ThemeToggle';
import './Navbar.css';

const links = [
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'How It Works' },
  { id: 'packages', label: 'Packages' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'faq', label: 'FAQ' },
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Switch to a solid bar once the user scrolls off the top of the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Navigate to home + scroll to section
  const scrollToSection = (sectionId) => {
    setExpanded(false);
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  const solid = scrolled || expanded;

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      variant={solid ? undefined : 'dark'}
      className={`site-nav ${solid ? 'is-solid' : ''}`}
    >
      <Container>
        <Link
          to="/"
          className="navbar-brand brand-mark"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
        >
          Beyond <span>the</span> Bar
        </Link>
        <Navbar.Toggle aria-controls="site-nav-collapse" />
        <Navbar.Collapse id="site-nav-collapse">
          <Nav className="ms-auto align-items-lg-center">
            {links.map((link) => (
              <Nav.Link key={link.id} onClick={() => scrollToSection(link.id)}>
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
          <div className="nav-actions">
            <ThemeToggle />
            <Link to="/login" className="nav-login">Log In</Link>
            <Button variant="primary" onClick={() => scrollToSection('quote')}>
              Get a Quote
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
