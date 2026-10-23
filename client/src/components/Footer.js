// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'react-bootstrap-icons';
import './Footer.css';

const exploreLinks = [
  { id: 'services', label: 'Services' },
  { id: 'packages', label: 'Packages' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'faq', label: 'FAQ' },
  { id: 'quote', label: 'Request a Quote' },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <footer className="site-footer">
      <Container>
        <Row className="g-5 footer-top">
          <Col lg={4}>
            <span className="footer-brand">
              Beyond <span>the</span> Bar
            </span>
            <p className="footer-blurb">
              Professional mobile bartending for weddings, corporate events and private parties
              across Northeast Florida.
            </p>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <Instagram size={17} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <Facebook size={17} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <Linkedin size={17} />
              </a>
            </div>
          </Col>

          <Col xs={6} lg={{ span: 2, offset: 1 }}>
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-list">
              {exploreLinks.map((link) => (
                <li key={link.id}>
                  <button type="button" className="footer-link" onClick={() => scrollToSection(link.id)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={6} lg={2}>
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-list">
              <li><Link to="/login" className="footer-link">Client Login</Link></li>
              <li><Link to="/terms" className="footer-link">Terms of Use</Link></li>
              <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
            </ul>
          </Col>

          <Col lg={3}>
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-list">
              <li><a href="tel:+14075550199" className="footer-link">(407) 555-0199</a></li>
              <li><a href="mailto:info@beyondthebar.com" className="footer-link">info@beyondthebar.com</a></li>
            </ul>
          </Col>
        </Row>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Beyond The Bar. All rights reserved.</span>
          <span>Please drink responsibly. 21+ only.</span>
          <span>
            Built by{' '}
            <a href="https://codeboxllc.net/" target="_blank" rel="noopener noreferrer" className="footer-credit">
              CodeBox LLC
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
