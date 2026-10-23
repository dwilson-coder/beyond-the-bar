// src/components/LogoGrid.js
import React from 'react';
import { Container } from 'react-bootstrap';

// Import each logo individually (CRA requires this)
import bacardi from '../assets/logos/bacardi.png';
import captainMorgan from '../assets/logos/captain-morgan.png';
import grandMarnier from '../assets/logos/grand-marnier.png';
import heineken from '../assets/logos/heineken.png';
import johnnieWalker from '../assets/logos/johnnie-walker.png';
import seagrams from '../assets/logos/seagrams.png';

import './LogoGrid.css';

const logos = [
  { src: bacardi, alt: 'Bacardi' },
  { src: captainMorgan, alt: 'Captain Morgan' },
  { src: grandMarnier, alt: 'Grand Marnier' },
  { src: heineken, alt: 'Heineken' },
  { src: johnnieWalker, alt: 'Johnnie Walker' },
  { src: seagrams, alt: "Seagram's" },
];

const LogoGrid = () => {
  return (
    <section className="logo-strip" aria-label="Spirits we pour">
      <Container className="logo-strip-inner">
        <p className="logo-strip-label">Premium spirits we pour</p>
        <ul className="logo-list">
          {logos.map((logo) => (
            <li key={logo.alt}>
              <img src={logo.src} alt={logo.alt} className="brand-logo" loading="lazy" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default LogoGrid;
