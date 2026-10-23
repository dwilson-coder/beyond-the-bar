// src/components/FAQ.js
import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import './FAQ.css';

const faqs = [
  {
    q: 'Do you provide the alcohol?',
    a: "Most hosts purchase alcohol directly — it's the most cost-effective option and you keep anything unopened. We send a shopping list tailored to your guest count and menu. Ask us about full-service options if you'd rather we handle it.",
  },
  {
    q: 'How far in advance should I book?',
    a: 'Peak-season weekends (spring and fall) often book 3–6 months out. Reach out as soon as you have a date; a deposit secures your booking.',
  },
  {
    q: 'Are your bartenders certified and insured?',
    a: "Yes. Every bartender is certified in responsible alcohol service, and we carry liquor liability insurance. We're happy to send a certificate of insurance to your venue.",
  },
  {
    q: 'What areas do you serve?',
    a: 'We are based in Jacksonville and serve Northeast Florida, including St. Augustine, Ponte Vedra and Amelia Island. Travel beyond 40 miles may include a small fee.',
  },
  {
    q: 'What do you need from us on the day?',
    a: 'Just a level 8×10 ft space near an outlet and access about an hour before guests arrive. We bring the bar, tools, coolers and everything else on your package.',
  },
  {
    q: 'Can you create a custom cocktail menu?',
    a: 'Absolutely. Signature drinks are included in Signature and Premier packages, and Premier includes a tasting so you can try everything before the big day.',
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="section">
      <Container>
        <Row className="g-5">
          <Col lg={4}>
            <div className="section-header text-start mb-0">
              <span className="eyebrow">FAQ</span>
              <h2 className="section-title">Questions, answered</h2>
              <p className="section-lead">
                Don't see yours? Send it with your quote request and we'll get back to you within
                a day.
              </p>
            </div>
          </Col>
          <Col lg={8}>
            <Accordion defaultActiveKey="0" flush className="faq-list">
              {faqs.map((item, idx) => (
                <Accordion.Item eventKey={String(idx)} key={item.q}>
                  <Accordion.Header>{item.q}</Accordion.Header>
                  <Accordion.Body>{item.a}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FAQ;
