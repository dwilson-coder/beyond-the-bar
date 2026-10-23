// src/components/Hero.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { PatchCheck, ShieldCheck, CupStraw } from 'react-bootstrap-icons';
import './Hero.css';

const trustPoints = [
  { icon: <ShieldCheck size={18} />, label: 'Licensed & insured' },
  { icon: <PatchCheck size={18} />, label: 'Certified bartenders' },
  { icon: <CupStraw size={18} />, label: 'Setup & cleanup included' },
];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const Hero = () => {
  return (
    <section id="home" className="hero">
      <video autoPlay loop muted playsInline className="hero-video" aria-hidden="true">
        <source src="https://beyondthebar1.netlify.app/video/video.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" />

      <Container className="hero-content">
        <span className="eyebrow hero-eyebrow">
          Mobile Bartending · Jacksonville &amp; Northeast Florida
        </span>
        <h1 className="hero-title">
          Craft cocktails, poured <em>wherever</em> you celebrate.
        </h1>
        <p className="hero-lead">
          Professional bartenders, a fully stocked mobile bar, and a drink menu designed around
          your event — from intimate dinners to 300-guest weddings.
        </p>
        <div className="hero-actions">
          <Button variant="primary" size="lg" onClick={() => scrollTo('quote')}>
            Get a Free Quote
          </Button>
          <Button variant="outline-light" size="lg" onClick={() => scrollTo('packages')}>
            View Packages
          </Button>
        </div>
        <ul className="hero-trust">
          {trustPoints.map((point) => (
            <li key={point.label}>
              {point.icon}
              {point.label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Hero;
