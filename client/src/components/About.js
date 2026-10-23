// src/components/About.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CheckLg } from 'react-bootstrap-icons';
import './About.css';

const highlights = [
  'Professional, uniformed bartenders who read the room',
  'Menus built around your theme, budget and guest count',
  'We arrive early, set up, serve responsibly and leave it spotless',
];

const About = () => {
  return (
    <section id="about" className="section">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <div className="about-media">
              <img
                src="https://images.pexels.com/photos/3738954/pexels-photo-3738954.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Bartender preparing a cocktail at an event"
                className="about-img"
                loading="lazy"
              />
              <div className="about-badge">
                <span className="about-badge-title">Full-service</span>
                <span className="about-badge-sub">bar, staff &amp; menu</span>
              </div>
            </div>
          </Col>
          <Col lg={6} className="ps-lg-5">
            <span className="eyebrow">About Beyond The Bar</span>
            <h2 className="section-title">
              Hospitality you'll <em>feel</em>, not just see.
            </h2>
            <p className="section-lead mb-4">
              We bring the experience of a great cocktail bar to your venue, backyard or office.
              You focus on your guests — we handle everything behind the bar.
            </p>
            <ul className="about-list">
              {highlights.map((item) => (
                <li key={item}>
                  <span className="about-check"><CheckLg size={14} /></span>
                  {item}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
