// src/components/Services.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Heart, Briefcase, Balloon, Stars, Truck, CupStraw } from 'react-bootstrap-icons';
import './Services.css';

const services = [
  {
    icon: <Heart size={22} />,
    title: 'Weddings',
    desc: 'Cocktail hour through last call, with signature his-and-hers drinks and a bar that matches your décor.',
  },
  {
    icon: <Briefcase size={22} />,
    title: 'Corporate & Brand Events',
    desc: 'Polished service for holiday parties, launches and client receptions — with branded menus on request.',
  },
  {
    icon: <Balloon size={22} />,
    title: 'Private Parties',
    desc: 'Birthdays, anniversaries, graduations and backyard get-togethers, sized to any guest list.',
  },
  {
    icon: <Stars size={22} />,
    title: 'Custom Cocktail Menus',
    desc: 'We design, name and test drinks around your story, season and spirits preferences.',
  },
  {
    icon: <Truck size={22} />,
    title: 'Mobile Bar Setup',
    desc: 'A handsome portable bar, tools, coolers and ice delivered, set up and broken down for you.',
  },
  {
    icon: <CupStraw size={22} />,
    title: 'Mixers, Garnish & Glassware',
    desc: 'Fresh juices, garnishes and premium mixers, plus glassware rentals so you never touch a plastic cup.',
  },
];

const Services = () => {
  return (
    <section id="services" className="section section-alt">
      <Container>
        <div className="section-header">
          <span className="eyebrow">What We Do</span>
          <h2 className="section-title">A bar built around your event</h2>
          <p className="section-lead">
            Every booking includes professional staff, setup and cleanup. Add the extras that fit
            your celebration.
          </p>
        </div>
        <Row xs={1} md={2} lg={3} className="g-4">
          {services.map((svc) => (
            <Col key={svc.title}>
              <article className="service-card">
                <div className="service-icon">{svc.icon}</div>
                <h3 className="service-title">{svc.title}</h3>
                <p className="service-desc">{svc.desc}</p>
              </article>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;
