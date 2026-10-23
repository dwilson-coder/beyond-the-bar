// src/components/Testimonials.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons';
import './Testimonials.css';

// Placeholder testimonials — replace with real client reviews before launch
const testimonials = [
  {
    quote:
      'Our guests are still talking about the signature cocktails. The team was early, gracious and kept the line moving all night.',
    name: 'Harper M.',
    event: 'Wedding · 180 guests',
  },
  {
    quote:
      'Booking was effortless and the bartenders were the most professional vendor we worked with all year. Already rebooked for next December.',
    name: 'Danielle R.',
    event: 'Corporate holiday party',
  },
  {
    quote:
      'They turned my backyard into a speakeasy. The shopping list alone saved us hundreds — we bought exactly what we needed.',
    name: 'Marcus T.',
    event: '40th birthday',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section section-dark">
      <Container>
        <div className="section-header">
          <span className="eyebrow">Kind Words</span>
          <h2 className="section-title">Hosts who've been there</h2>
        </div>
        <Row xs={1} lg={3} className="g-4">
          {testimonials.map((t) => (
            <Col key={t.name}>
              <figure className="testimonial">
                <div className="testimonial-stars" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <StarFill key={i} size={14} />
                  ))}
                </div>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <span className="testimonial-name">{t.name}</span>
                  <span className="testimonial-event">{t.event}</span>
                </figcaption>
              </figure>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
