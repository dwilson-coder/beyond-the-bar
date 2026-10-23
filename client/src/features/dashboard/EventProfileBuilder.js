import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { ClipboardCheck, CheckCircle } from 'react-bootstrap-icons';
import { upcomingEvent } from './mockData';
import './EventProfileBuilder.css';

const spiritOptions = ['Vodka', 'Tequila', 'Whiskey', 'Rum', 'Gin', 'Wine', 'Beer', 'Mocktails'];
const serviceOptions = ['Signature cocktails', 'Full bar', 'Beer & wine', 'Champagne toast', 'Late-night espresso martinis'];

// Fields that count toward the completion meter
const trackedFields = ['eventName', 'date', 'startTime', 'venue', 'address', 'guests', 'contactName', 'contactPhone'];

const EventProfileBuilder = () => {
  const [details, setDetails] = useState({
    eventName: upcomingEvent.title,
    date: upcomingEvent.date,
    startTime: '17:00',
    endTime: '22:00',
    venue: upcomingEvent.venue,
    address: upcomingEvent.address,
    guests: upcomingEvent.guests,
    contactName: '',
    contactPhone: '',
    spirits: ['Tequila', 'Gin', 'Wine', 'Mocktails'],
    services: ['Signature cocktails', 'Full bar', 'Champagne toast'],
    allergies: '',
    notes: '',
  });
  const [saved, setSaved] = useState(false);

  const update = (field) => (e) => setDetails((prev) => ({ ...prev, [field]: e.target.value }));

  const toggle = (field, value) =>
    setDetails((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((v) => v !== value) : [...prev[field], value],
    }));

  const complete = Math.round(
    (trackedFields.filter((f) => String(details[f]).trim()).length / trackedFields.length) * 100
  );

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const chips = (field, options) => (
    <div className="chip-group">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`chip ${details[field].includes(option) ? 'is-active' : ''}`}
          aria-pressed={details[field].includes(option)}
          onClick={() => toggle(field, option)}
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <Card className="dash-card">
      <Card.Header>
        <h2 className="dash-card-title"><ClipboardCheck /> Event details</h2>
        <div className="completion">
          <span className="completion-bar"><span style={{ width: `${complete}%` }} /></span>
          <span className="dash-card-sub">{complete}% complete</span>
        </div>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSave}>
          <fieldset className="form-section">
            <legend>The basics</legend>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="ed-name">
                  <Form.Label>Event name</Form.Label>
                  <Form.Control value={details.eventName} onChange={update('eventName')} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="ed-date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" value={details.date} onChange={update('date')} />
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="ed-start">
                  <Form.Label>Bar opens</Form.Label>
                  <Form.Control type="time" value={details.startTime} onChange={update('startTime')} />
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="ed-end">
                  <Form.Label>Last call</Form.Label>
                  <Form.Control type="time" value={details.endTime} onChange={update('endTime')} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="ed-guests">
                  <Form.Label>Guest count</Form.Label>
                  <Form.Control type="number" min={1} value={details.guests} onChange={update('guests')} />
                  <Form.Text>Final headcount locks Nov 4.</Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </fieldset>

          <fieldset className="form-section">
            <legend>Venue &amp; day-of contact</legend>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="ed-venue">
                  <Form.Label>Venue</Form.Label>
                  <Form.Control value={details.venue} onChange={update('venue')} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="ed-address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control value={details.address} onChange={update('address')} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="ed-contact">
                  <Form.Label>On-site contact</Form.Label>
                  <Form.Control value={details.contactName} onChange={update('contactName')} placeholder="Planner or family member" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="ed-contact-phone">
                  <Form.Label>Contact phone</Form.Label>
                  <Form.Control type="tel" value={details.contactPhone} onChange={update('contactPhone')} placeholder="(904) 555-0100" />
                </Form.Group>
              </Col>
            </Row>
          </fieldset>

          <fieldset className="form-section">
            <legend>Bar preferences</legend>
            <Form.Label as="p">Spirits &amp; drinks to stock</Form.Label>
            {chips('spirits', spiritOptions)}
            <Form.Label as="p" className="mt-4">Service style</Form.Label>
            {chips('services', serviceOptions)}
            <Row className="g-3 mt-2">
              <Col md={6}>
                <Form.Group controlId="ed-allergies">
                  <Form.Label>Allergies or restrictions</Form.Label>
                  <Form.Control value={details.allergies} onChange={update('allergies')} placeholder="Tree nuts, gluten…" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="ed-notes">
                  <Form.Label>Notes for your bar team</Form.Label>
                  <Form.Control value={details.notes} onChange={update('notes')} placeholder="Toast timing, dress code, surprises…" />
                </Form.Group>
              </Col>
            </Row>
          </fieldset>

          <div className="form-footer">
            {saved && (
              <span className="save-note" role="status"><CheckCircle /> Changes saved</span>
            )}
            <Button variant="primary" type="submit">Save details</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EventProfileBuilder;
