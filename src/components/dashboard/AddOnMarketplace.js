import React, { useState } from 'react';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';
import { Bag, CheckCircle } from 'react-bootstrap-icons';
import './AddOnMarketplace.css';

const addOns = [
  { id: 1, name: 'Bottle Service', price: 150, icon: '🥃', desc: 'Premium bottle + mixers' },
  { id: 2, name: 'Champagne Toast', price: 75, icon: '🍾', desc: 'Sparkling wine for your table' },
  { id: 3, name: 'Photo Booth', price: 100, icon: '📸', desc: 'Private photo booth for 1hr' },
  { id: 4, name: 'DJ Request', price: 50, icon: '🎵', desc: 'Special song request' },
  { id: 5, name: 'Late Checkout', price: 40, icon: '🕐', desc: 'Stay 1 extra hour' },
  { id: 6, name: 'Complimentary Valet', price: 0, icon: '🚗', desc: 'Free valet parking' },
];

const AddOnMarketplace = () => {
  const [selected, setSelected] = useState([]);
  const total = selected.reduce((sum, id) => {
    const item = addOns.find(a => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <Card className="dash-card">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span><Bag className="me-2" /> Add-On Marketplace</span>
        {selected.length > 0 && <Badge bg="primary">${total}</Badge>}
      </Card.Header>
      <Card.Body>
        <Row className="g-3">
          {addOns.map(item => (
            <Col xs={6} md={4} key={item.id}>
              <div
                className={`addon-card ${selected.includes(item.id) ? 'addon-selected' : ''}`}
                onClick={() => toggle(item.id)}
              >
                <span className="addon-icon">{item.icon}</span>
                <strong className="addon-name">{item.name}</strong>
                <small className="text-muted d-block">{item.desc}</small>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="addon-price">
                    {item.price === 0 ? 'Free' : `$${item.price}`}
                  </span>
                  {selected.includes(item.id) && <CheckCircle size={16} className="text-success" />}
                </div>
              </div>
            </Col>
          ))}
        </Row>
        {selected.length > 0 && (
          <Button variant="primary" className="w-100 mt-4" size="lg">
            Add to Reservation — ${total}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default AddOnMarketplace;   