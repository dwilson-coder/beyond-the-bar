// src/components/Hero.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { PatchCheck, ShieldCheck, CupStraw, Stars, CalendarCheck } from 'react-bootstrap-icons';
import './Hero.css';

// To use a video instead, drop an .mp4 in client/public and render <video poster={HERO_IMAGE}> here
const HERO_IMAGE =
  'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=1000';

const trustPoints = [
  { icon: <ShieldCheck size={18} />, label: 'Licensed & insured' },
  { icon: <PatchCheck size={18} />, label: 'Certified bartenders' },
  { icon: <CupStraw size={18} />, label: 'Setup & cleanup included' },
];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-glow" aria-hidden="true" />

      <Container className="hero-content">
        <Row className="align-items-center gy-5 gx-lg-5">
          <Col lg={6} xl={6}>
            <span className="eyebrow hero-eyebrow">
              Mobile Bartending · Jacksonville &amp; Northeast Florida
            </span>
            <h1 className="hero-title">
              Craft cocktails, poured <em>wherever</em> you celebrate.
            </h1>
            <p className="hero-lead">
              Professional bartenders, a fully stocked mobile bar, and a drink menu designed around
              your event — from intimate dinners to 300&#8209;guest weddings.
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
          </Col>

          <Col lg={6} xl={{ span: 5, offset: 1 }}>
            <figure className="hero-media">
              <div className="hero-frame">
                <img
                  src={HERO_IMAGE}
                  alt="Citrus spritz cocktail garnished with an orange slice and rosemary"
                  className="hero-img"
                  fetchpriority="high"
                />
              </div>

              <div className="hero-chip hero-chip-top">
                <span className="hero-chip-icon"><Stars size={16} /></span>
                <span>
                  <strong>Custom cocktail menus</strong>
                  <small>Designed around your event</small>
                </span>
              </div>
              <div className="hero-chip hero-chip-bottom">
                <span className="hero-chip-icon"><CalendarCheck size={16} /></span>
                <span>
                  <strong>Now booking 2027</strong>
                  <small>Weddings &amp; corporate events</small>
                </span>
              </div>
            </figure>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
