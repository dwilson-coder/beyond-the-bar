// src/components/About.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const About = () => {
  return (
    <section id="about" className="py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <img 
              src="https://images.pexels.com/photos/3738954/pexels-photo-3738954.jpeg?auto=compress&cs=tinysrgb&w=1600" 
              alt="About Us" 
              className="img-fluid rounded shadow-lg"
            />
          </Col>
          <Col md={6} className="ps-md-5 mt-4 mt-md-0">
            <h2 className="fw-bold">Who We Are</h2>
            <p className="lead">Beyond The Bar curates exclusive nightlife experiences tailored for the discerning guest.</p>
            <p>From VIP table service to curated guest lists, we ensure every night is exceptional.</p>
            <Button variant="outline-primary">Learn More</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;   