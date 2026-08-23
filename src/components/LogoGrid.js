// src/components/LogoGrid.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// ✅ Import each logo individually (CRA requires this)
import bacardi from '../assets/logos/bacardi.png';
import captainMorgan from '../assets/logos/captain-morgan.png';
import grandMarnier from '../assets/logos/grand-marnier.png';
import heineken from '../assets/logos/heineken.png';
import johnnieWalker from '../assets/logos/johnnie-walker.png';
import seagrams from '../assets/logos/seagrams.png';

import './LogoGrid.css';

const logos = [
  { src: bacardi, alt: "Bacardi" },
  { src: captainMorgan, alt: "Captain Morgan" },
  { src: grandMarnier, alt: "Grand Marnier" },
  { src: heineken, alt: "Heineken" },
  { src: johnnieWalker, alt: "Johnnie Walker" },
  { src: seagrams, alt: "Seagrams" },
];

const LogoGrid = () => {
  return (
    <section className="py-5 logo-section">
      <Container>
        <Row className="justify-content-center align-items-center g-4">
          {logos.map((logo, index) => (
            <Col xs={6} md={4} lg={2} key={index} className="text-center">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="img-fluid brand-logo"
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default LogoGrid;   