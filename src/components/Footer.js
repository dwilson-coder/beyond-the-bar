// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'react-bootstrap-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="align-items-center g-4 py-4">
          
          {/* Logo & Copyright */}
          <Col md={4} className="text-center text-md-start">
            <h5 className="footer-brand fw-bold">BEYOND THE BAR</h5>
            <p className="footer-copy mb-0">
              &copy; {new Date().getFullYear()} Beyond The Bar. All Rights Reserved.
            </p>
          </Col>

          {/* Legal Links */}
          <Col md={4} className="text-center">
            <div className="footer-links">
              <Link to="/terms" className="footer-link">Terms of Use</Link>
              <span className="footer-separator">|</span>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            </div>
          </Col>

          {/* Social Media */}
          <Col md={4} className="text-center text-md-end">
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </Col>

        </Row>
      </Container>
    </footer>
  );
};

export default Footer;   