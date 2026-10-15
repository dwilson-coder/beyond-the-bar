import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Badge } from 'react-bootstrap';
import { Person, Star, CheckCircle } from 'react-bootstrap-icons';
import './EventProfileBuilder.css';

const EventProfileBuilder = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    dietary: '',
    allergies: '',
    favoriteDrinks: [],
    eventPreferences: [],
    birthday: '',
    notes: ''
  });
  const [saved, setSaved] = useState(false);

  const drinkOptions = ['Whiskey', 'Vodka', 'Rum', 'Tequila', 'Wine', 'Beer', 'Cocktails', 'Non-Alcoholic'];
  const prefOptions = ['VIP Table', 'DJ Booth', 'Poolside', 'Rooftop', 'Backstage', 'Lounge'];

  const toggleItem = (list, item) => {
    const updated = list.includes(item) ? list.filter(i => i !== item) : [...list, item];
    return updated;
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Card className="dash-card">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span><Person className="me-2" /> Event Profile</span>
        <Badge bg="primary">Complete: 0%</Badge>
      </Card.Header>
      <Card.Body>
        {saved && <div className="alert alert-success py-2 mb-3">Profile saved successfully.</div>}
        <Form onSubmit={handleSave}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} placeholder="John Smith" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="tel" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} placeholder="(407) 555-0100" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Dietary Restrictions</Form.Label>
                <Form.Control type="text" value={profile.dietary} onChange={e => setProfile({...profile, dietary: e.target.value})} placeholder="Vegetarian, Gluten-free..." />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Allergies</Form.Label>
                <Form.Control type="text" value={profile.allergies} onChange={e => setProfile({...profile, allergies: e.target.value})} placeholder="Peanuts, Shellfish..." />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Favorite Drinks</Form.Label>
            <div className="chip-group">
              {drinkOptions.map(d => (
                <button
                  key={d}
                  type="button"
                  className={`chip ${profile.favoriteDrinks.includes(d) ? 'chip-active' : ''}`}
                  onClick={() => setProfile({...profile, favoriteDrinks: toggleItem(profile.favoriteDrinks, d)})}
                >
                  <Star size={10} className="me-1" /> {d}
                </button>
              ))}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Event Preferences</Form.Label>
            <div className="chip-group">
              {prefOptions.map(p => (
                <button
                  key={p}
                  type="button"
                  className={`chip ${profile.eventPreferences.includes(p) ? 'chip-active' : ''}`}
                  onClick={() => setProfile({...profile, eventPreferences: toggleItem(profile.eventPreferences, p)})}
                >
                  <Star size={10} className="me-1" /> {p}
                </button>
              ))}
            </div>
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="date" value={profile.birthday} onChange={e => setProfile({...profile, birthday: e.target.value})} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Special Notes</Form.Label>
                <Form.Control type="text" value={profile.notes} onChange={e => setProfile({...profile, notes: e.target.value})} placeholder="Anniversary, VIP requests..." />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className="w-100">
            <CheckCircle className="me-2" /> Save Profile
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EventProfileBuilder;   