import React, { useMemo, useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { CalendarEvent, Search } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import StatusPill from '../../components/common/StatusPill';
import { formatDate } from './mockData';
import './SmartAvailabilityChecker.css';

// Mock calendar: dates not listed are open
const calendar = {
  '2026-11-14': 'booked',
  '2026-11-21': 'limited',
  '2026-11-28': 'booked',
  '2026-12-05': 'limited',
  '2026-12-12': 'booked',
  '2026-12-19': 'booked',
};

const messages = {
  available: 'Great news — we have bar teams open for this date.',
  limited: 'Only one bar team left for this date. We recommend requesting soon.',
  booked: "We're fully booked this date. Try a nearby date or join the waitlist.",
};

// Local YYYY-MM-DD (toISOString would shift to UTC)
const toIso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Next eight Saturdays, for the at-a-glance list
const upcomingSaturdays = () => {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7));
  return Array.from({ length: 8 }, (_, i) => {
    const day = new Date(d);
    day.setDate(d.getDate() + i * 7);
    return toIso(day);
  });
};

const SmartAvailabilityChecker = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');
  const [result, setResult] = useState(null);
  const saturdays = useMemo(upcomingSaturdays, []);

  const statusFor = (iso) => calendar[iso] || 'available';

  const handleSearch = (e) => {
    e.preventDefault();
    if (!date) return;
    setResult({ date, guests, status: statusFor(date) });
  };

  return (
    <Card className="dash-card">
      <Card.Header>
        <h2 className="dash-card-title"><CalendarEvent /> Book another date</h2>
        <span className="dash-card-sub">Planning a second celebration? Check our calendar.</span>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSearch}>
          <Row className="g-3 align-items-end">
            <Col md={5}>
              <Form.Group controlId="avail-date">
                <Form.Label>Event date</Form.Label>
                <Form.Control type="date" min={toIso(new Date())} value={date} onChange={(e) => setDate(e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="avail-guests">
                <Form.Label>Estimated guests</Form.Label>
                <Form.Control type="number" min={1} value={guests} onChange={(e) => setGuests(e.target.value)} placeholder="e.g. 75" />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Button variant="primary" type="submit" className="w-100">
                <Search className="me-2" />Check
              </Button>
            </Col>
          </Row>
        </Form>

        {result && (
          <div className={`avail-result is-${result.status}`} role="status">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <strong>{formatDate(result.date, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                <StatusPill status={result.status} />
              </div>
              <p className="mb-0">{messages[result.status]}</p>
            </div>
            {result.status !== 'booked' && (
              <Button variant="primary" onClick={() => navigate('/', { state: { scrollTo: 'quote' } })}>
                Request this date
              </Button>
            )}
          </div>
        )}

        <h3 className="avail-heading">Upcoming Saturdays</h3>
        <ul className="avail-list">
          {saturdays.map((iso) => (
            <li key={iso}>
              <button type="button" onClick={() => { setDate(iso); setResult({ date: iso, guests, status: statusFor(iso) }); }}>
                <span className="avail-day">{formatDate(iso, { month: 'short', day: 'numeric' })}</span>
                <StatusPill status={statusFor(iso)} />
              </button>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default SmartAvailabilityChecker;
