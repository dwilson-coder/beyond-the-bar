// src/components/Contact.js
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Envelope, Telephone, GeoAlt, Clock } from 'react-bootstrap-icons'; // Ensure package is installed
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      {/* Map Background */}
      <div className="map-background">
        <iframe 
          title="Jacksonville Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3422.6789!2d-81.7065!3d30.3155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5a0a0a0a0a0a0%3A0x0!2s1686%20Geraldine%20Dr%2C%20Jacksonville%2C%20FL%2032205!5e0!3m2!1sen!2sus!4v1724166000000" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </div>
      <div className="map-overlay"></div>

      <Container className="contact-container">
        <Row className="justify-content-center g-5">
          
          {/* Left Column: Contact Info */}
          <Col md={5} lg={4} className="text-white">
            <div className="contact-info-card p-4">
              <h2 className="fw-bold mb-4">Contact Info</h2>
              
              <div className="info-item mb-4 d-flex align-items-start">
                <GeoAlt size={24} className="me-3 mt-1 text-primary" />
                <div>
                  <h5 className="fw-bold mb-1">Address</h5>
                  <p className="mb-0 opacity-75">1686 Geraldine Dr<br/>Jacksonville, FL 32205</p>
                </div>
              </div>

              <div className="info-item mb-4 d-flex align-items-start">
                <Telephone size={24} className="me-3 mt-1 text-primary" />
                <div>
                  <h5 className="fw-bold mb-1">Phone</h5>
                  <p className="mb-0 opacity-75">(407) 555-0199</p>
                </div>
              </div>

              <div className="info-item mb-4 d-flex align-items-start">
                <Clock size={24} className="me-3 mt-1 text-primary" />
                <div>
                  <h5 className="fw-bold mb-1">Hours of Operation</h5>
                  <p className="mb-0 opacity-75">
                    <strong>Fri–Sat:</strong> 9 PM – 4 AM<br/>
                    <strong>Sun–Thu:</strong> 10 PM – 2 AM
                  </p>
                </div>
              </div>

              <div className="info-item d-flex align-items-start">
                <Envelope size={24} className="me-3 mt-1 text-primary" />
                <div>
                  <h5 className="fw-bold mb-1">Email</h5>
                  <a href="mailto:info@beyondthebar.com" className="text-decoration-none opacity-75 hover-white">
                    info@beyondthebar.com
                  </a>
                </div>
              </div>
            </div>
          </Col>

          {/* Right Column: Contact Form */}
          <Col md={7} lg={6}>
            <div className="contact-form-card p-5">
              <h2 className="text-center mb-2 fw-bold">Get In Touch</h2>
              <p className="text-center mb-5 opacity-75">Send us a message or book a table</p>
              
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Control type="text" placeholder="Your Name" required className="custom-input" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Control type="email" placeholder="Your Email" required className="custom-input" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Subject" required className="custom-input" />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control as="textarea" rows={5} placeholder="Message" className="custom-input" />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" size="lg" type="submit">Send Message</Button>
                </div>
              </Form>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default Contact;   