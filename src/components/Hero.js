// src/components/Hero.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <video autoPlay loop muted playsInline className="hero-video">
        <source src="https://beyondthebar1.netlify.app/video/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay"></div>
      <Container className="hero-content text-center text-white">
        <h1 className="display-3 fw-bold">Experience the Night</h1>
        <p className="lead mb-4">Premium events, exclusive access, and unforgettable memories.</p>
        <Button variant="primary" size="lg" href="#pricing">Get Tickets</Button>
      </Container>
    </section>
  );
};

export default Hero;   