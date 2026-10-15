// src/components/Pricing.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Pricing.css';

const Pricing = () => {
  // Preselect the middle option (index 1)
  const [activePlan, setActivePlan] = useState(1);

  const plans = [
    {
      name: "Standard",
      price: "$50",
      image: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Entry Ticket", "1 Drink Voucher", "General Admission"],
      badge: "ENTRY"
    },
    {
      name: "VIP",
      price: "$150",
      image: "https://images.pexels.com/photos/209967/pexels-photo-209967.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Skip Line", "Table Seat", "Bottle Service", "Dedicated Host"],
      badge: "BEST VALUE"
    },
    {
      name: "Ultra VIP",
      price: "$300",
      image: "https://images.pexels.com/photos/1579736/pexels-photo-1579736.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Backstage Access", "Unlimited Drinks", "Private Host", "VIP Lounge"],
      badge: "PREMIUM"
    },
  ];

  return (
    <section id="pricing" className="py-5 bg-dark">
      <Container>
        <h2 className="text-center mb-5 fw-bold text-white">Price Packages</h2>
        <Row xs={1} md={3} className="g-4">
          {plans.map((plan, idx) => (
            <Col key={idx}>
              <Card 
                className={`price-card h-100 ${activePlan === idx ? 'active' : ''}`}
                onClick={() => setActivePlan(idx)}
              >
                <div className="card-image-wrapper">
                  <Card.Img variant="top" src={plan.image} className="price-card-img" />
                  <div className="card-img-overlay d-flex align-items-end justify-content-center">
                    <span className="plan-badge">{plan.badge}</span>
                  </div>
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center fw-bold text-white mb-2">{plan.name}</Card.Title>
                  <div className="text-center mb-4">
                    <span className="display-4 fw-bold price-text">{plan.price}</span>
                    <small className="text-secondary d-block">per person</small>
                  </div>
                  
                  <ul className="list-unstyled features-list mb-4">
                    {plan.features.map((f, i) => (
                      <li key={i} className="feature-item">
                        <span className="check-icon">✓</span> {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Button 
                      variant={activePlan === idx ? "success" : "outline-primary"} 
                      className="w-100 select-btn"
                    >
                      {activePlan === idx ? "Selected ✓" : "Select"}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Pricing;   