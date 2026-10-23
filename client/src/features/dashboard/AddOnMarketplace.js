import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Bag, CheckCircleFill, Stars, Clock, CupStraw, CupHot, Flower1, Droplet } from 'react-bootstrap-icons';
import { currency } from './mockData';
import './AddOnMarketplace.css';

// Placeholder add-on pricing
const addOns = [
  { id: 1, name: 'Champagne toast', price: 180, icon: <Stars />, desc: 'A poured glass for every guest, timed to your toasts.' },
  { id: 2, name: 'Extra hour of service', price: 95, icon: <Clock />, desc: 'Keep the bar open longer — per bartender, per hour.' },
  { id: 3, name: 'Mocktail menu', price: 120, icon: <CupStraw />, desc: 'Two zero-proof signatures, crafted like the real thing.' },
  { id: 4, name: 'Espresso martini bar', price: 200, icon: <CupHot />, desc: 'A late-night pick-me-up station for the dance floor.' },
  { id: 5, name: 'Bar styling & florals', price: 150, icon: <Flower1 />, desc: 'Signage, greenery and décor to match your palette.' },
  { id: 6, name: 'Infused water station', price: 60, icon: <Droplet />, desc: 'Citrus, cucumber and herb waters, refreshed all night.' },
];

const AddOnMarketplace = () => {
  const [selected, setSelected] = useState([]);
  const [requested, setRequested] = useState(false);

  const total = addOns.filter((a) => selected.includes(a.id)).reduce((sum, a) => sum + a.price, 0);

  const toggle = (id) => {
    setRequested(false);
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  return (
    <Card className="dash-card">
      <Card.Header>
        <h2 className="dash-card-title"><Bag /> Enhance your bar</h2>
        <span className="dash-card-sub">Add-ons are confirmed by your event lead</span>
      </Card.Header>
      <Card.Body>
        <Row xs={1} sm={2} xl={3} className="g-3">
          {addOns.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <Col key={item.id}>
                <button
                  type="button"
                  className={`addon-card ${isSelected ? 'is-selected' : ''}`}
                  aria-pressed={isSelected}
                  onClick={() => toggle(item.id)}
                >
                  <span className="addon-top">
                    <span className="addon-icon">{item.icon}</span>
                    {isSelected && <CheckCircleFill className="addon-check" size={18} />}
                  </span>
                  <span className="addon-name">{item.name}</span>
                  <span className="addon-desc">{item.desc}</span>
                  <span className="addon-price">{currency(item.price)}</span>
                </button>
              </Col>
            );
          })}
        </Row>

        <div className="addon-summary">
          <div>
            <span className="dash-card-sub">{selected.length} selected</span>
            <strong className="addon-total">{currency(total)}</strong>
          </div>
          {requested ? (
            <span className="save-note" role="status"><CheckCircleFill /> Request sent to Andre</span>
          ) : (
            <Button variant="primary" disabled={!selected.length} onClick={() => setRequested(true)}>
              Request add-ons
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default AddOnMarketplace;
