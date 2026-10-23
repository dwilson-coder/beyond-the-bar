// src/components/HowItWorks.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ChatDots, CalendarCheck, CupStraw } from 'react-bootstrap-icons';
import './HowItWorks.css';

const steps = [
  {
    icon: <ChatDots size={22} />,
    title: 'Tell us about your event',
    desc: 'Share your date, venue, guest count and vibe. It takes about two minutes.',
  },
  {
    icon: <CalendarCheck size={22} />,
    title: 'Get a tailored quote',
    desc: 'We reply within one business day with a proposal, drink menu ideas and a shopping list.',
  },
  {
    icon: <CupStraw size={22} />,
    title: 'Raise a glass',
    desc: 'Your bar team arrives early, serves all night and leaves the space spotless.',
  },
];

const HowItWorks = () => {
  return (
    <section id="process" className="section section-dark">
      <Container>
        <div className="section-header">
          <span className="eyebrow">How It Works</span>
          <h2 className="section-title">Booking is the easy part</h2>
          <p className="section-lead">Three steps from first message to first pour.</p>
        </div>
        <Row xs={1} md={3} className="g-4 process-row">
          {steps.map((step, idx) => (
            <Col key={step.title}>
              <div className="process-step">
                <div className="process-top">
                  <span className="process-num">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="process-icon">{step.icon}</span>
                </div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default HowItWorks;
