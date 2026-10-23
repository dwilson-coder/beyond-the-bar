// src/components/Pricing.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CheckLg } from 'react-bootstrap-icons';
import './Pricing.css';

// Starting prices are placeholders — update to real rates before launch
export const packages = [
  {
    name: 'Essentials',
    price: '$450',
    priceNote: 'starting at',
    summary: 'Beer & wine service for relaxed gatherings.',
    features: [
      'Up to 50 guests',
      '1 bartender, 4 hours of service',
      'Mixers, ice, cups & napkins',
      'Setup & cleanup',
    ],
  },
  {
    name: 'Signature',
    price: '$950',
    priceNote: 'starting at',
    summary: 'Our most-booked full bar experience.',
    features: [
      'Up to 125 guests',
      '2 bartenders, 5 hours of service',
      'Full bar + 2 signature cocktails',
      'Fresh garnish & premium mixers',
      'Mobile bar setup included',
    ],
    featured: true,
  },
  {
    name: 'Premier',
    price: 'Custom',
    priceNote: 'tailored quote',
    summary: 'For large weddings and brand activations.',
    features: [
      '125+ guests',
      'Bar team sized to your event',
      'Custom cocktail menu & tasting',
      'Glassware & bar styling',
      'Dedicated event lead',
    ],
  },
];

const Pricing = ({ onSelect }) => {
  return (
    <section id="packages" className="section">
      <Container>
        <div className="section-header">
          <span className="eyebrow">Packages</span>
          <h2 className="section-title">Simple, transparent pricing</h2>
          <p className="section-lead">
            Every package is customizable. Alcohol is typically purchased by the host — we'll send
            you a tailored shopping list.
          </p>
        </div>
        <Row xs={1} lg={3} className="g-4 align-items-stretch">
          {packages.map((plan) => (
            <Col key={plan.name}>
              <article className={`price-card ${plan.featured ? 'is-featured' : ''}`}>
                {plan.featured && <span className="price-flag">Most Popular</span>}
                <h3 className="price-name">{plan.name}</h3>
                <p className="price-summary">{plan.summary}</p>
                <div className="price-amount">
                  <span className="price-note">{plan.priceNote}</span>
                  <span className="price-value">{plan.price}</span>
                </div>
                <ul className="price-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <CheckLg size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.featured ? 'primary' : 'outline-primary'}
                  className="w-100 mt-auto"
                  onClick={() => onSelect?.(plan.name)}
                >
                  Request {plan.name}
                </Button>
              </article>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Pricing;
