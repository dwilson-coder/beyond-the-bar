import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Badge, Alert } from 'react-bootstrap';
import { Calendar, Search, CheckCircle, XCircle } from 'react-bootstrap-icons';
import './SmartAvailabilityChecker.css';

const mockEvents = [
  { id: 1, name: 'Neon Nights', date: '2026-09-05', capacity: 200, booked: 145 },
  { id: 2, name: 'VIP Lounge Party', date: '2026-09-12', capacity: 100, booked: 98 },
  { id: 3, name: 'DJ Takeover', date: '2026-09-19', capacity: 300, booked: 120 },
  { id: 4, name: 'Rooftop Sessions', date: '2026-09-26', capacity: 80, booked: 35 },
  { id: 5, name: 'Poolside Bash', date: '2026-10-03', capacity: 150, booked: 150 },
];

const SmartAvailabilityChecker = () => {
  const [searchDate, setSearchDate] = useState('');
  const [searchEvent, setSearchEvent] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    let filtered = mockEvents;
    if (searchDate) filtered = filtered.filter(ev => ev.date === searchDate);
    if (searchEvent) filtered = filtered.filter(ev => ev.name.toLowerCase().includes(searchEvent.toLowerCase()));
    setResults(filtered);
  };

  const getAvailability = (ev) => {
    const remaining = ev.capacity - ev.booked;
    const pct = Math.round((ev.booked / ev.capacity) * 100);
    if (remaining === 0) return { label: 'Sold Out', badge: 'danger', pct };
    if (pct > 80) return { label: 'Almost Full', badge: 'warning', pct };
    return { label: 'Available', badge: 'success', pct };
  };

  return (
    <Card className="dash-card">
      <Card.Header>
        <Calendar className="me-2" /> Smart Availability Checker
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSearch} className="row g-3 mb-4">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={searchDate} onChange={e => setSearchDate(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Event Name</Form.Label>
              <Form.Control type="text" placeholder="Search events..." value={searchEvent} onChange={e => setSearchEvent(e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex align-items-end">
            <Button variant="primary" type="submit" className="w-100">
              <Search className="me-2" /> Check Availability
            </Button>
          </Col>
        </Form>

        {results && (
          <div className="availability-results">
            {results.length === 0 ? (
              <Alert variant="info">No events found for your criteria.</Alert>
            ) : (
              <div className="d-flex flex-column gap-3">
                {results.map(ev => {
                  const avail = getAvailability(ev);
                  return (
                    <div key={ev.id} className="availability-item">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                          <strong>{ev.name}</strong>
                          <span className="text-muted ms-2">{ev.date}</span>
                        </div>
                        <Badge bg={avail.badge}>{avail.label}</Badge>
                      </div>
                      <div className="progress progress-sm">
                        <div
                          className={`progress-bar bg-${avail.badge}`}
                          style={{ width: `${avail.pct}%` }}
                        >
                          {avail.pct}% booked
                        </div>
                      </div>
                      <small className="text-muted">
                        {ev.capacity - ev.booked} spots remaining out of {ev.capacity}
                      </small>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default SmartAvailabilityChecker;   