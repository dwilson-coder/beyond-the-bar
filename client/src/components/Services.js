// src/components/Services.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
// Replaced missing icons with available ones: Wine->Cup, Music->People (or generic), Car->GeoAlt
import { Cup, People, Calendar, GeoAlt } from 'react-bootstrap-icons'; 
import './Services.css';

const services = [
  { 
    // Replaced Wine with Cup (available)
    icon: <Cup size={48} />,
    title: "VIP Tables", 
    desc: "Premium seating with dedicated bottle service and a personal host for your group." 
  },
  { 
    icon: <People size={48} />,
    title: "Guest List", 
    desc: "Skip the line with priority entry and complimentary drink vouchers." 
  },
  { 
    icon: <Calendar size={48} />,
    title: "Private Events", 
    desc: "Book the entire venue for exclusive parties, corporate events, or celebrations." 
  },
  { 
    // Replaced Music with People (or you can use an emoji 🎵)
    icon: <People size={48} />, 
    title: "DJ Booking", 
    desc: "World-class DJs and live performers tailored to your event's vibe." 
  },
  { 
    icon: <Cup size={48} />,
    title: "Cocktail Classes", 
    desc: "Learn to mix signature drinks with our master bartenders." 
  },
  { 
    // Replaced Car with GeoAlt (available) or use an emoji 🚗
    icon: <GeoAlt size={48} />,
    title: "Luxury Transport", 
    desc: "Door-to-door premium shuttle service for your group's safe travel." 
  },
];

const Services = () => {
  return (
    <section id="services" className="py-5 services-section">
      <Container>
        <h2 className="text-center mb-5 fw-bold section-title">Our Services</h2>
        <Row xs={1} sm={2} lg={3} className="g-4">
          {services.map((svc, idx) => (
            <Col key={idx}>
              <Card className="service-card h-100">
                <Card.Body className="d-flex flex-column align-items-center text-center p-5">
                  <div className="service-icon">{svc.icon}</div>
                  <Card.Title className="service-title mt-4">{svc.title}</Card.Title>
                  <Card.Text className="service-desc">{svc.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;   