import React from 'react';
import { Card } from 'react-bootstrap';
import { CalendarCheck, CheckLg } from 'react-bootstrap-icons';
import { daysUntil, formatDate, upcomingEvent } from './mockData';
import './ReservationTimeline.css';

const milestones = [
  { id: 1, title: 'Quote accepted', date: '2026-09-28' },
  { id: 2, title: 'Deposit paid', date: '2026-10-02' },
  { id: 3, title: 'Cocktail menu tasting', date: '2026-10-18' },
  { id: 4, title: 'Remaining balance due', date: '2026-11-01' },
  { id: 5, title: 'Final headcount & menu lock', date: '2026-11-04' },
  { id: 6, title: 'Event day', date: upcomingEvent.date },
];

// Past milestones are complete; the next one is current
const withStatus = () => {
  let currentAssigned = false;
  return milestones.map((m) => {
    if (daysUntil(m.date) < 0) return { ...m, status: 'complete' };
    if (!currentAssigned) {
      currentAssigned = true;
      return { ...m, status: 'current' };
    }
    return { ...m, status: 'upcoming' };
  });
};

const ReservationTimeline = () => {
  const items = withStatus();

  return (
    <Card className="dash-card">
      <Card.Header>
        <h2 className="dash-card-title"><CalendarCheck /> Booking timeline</h2>
      </Card.Header>
      <Card.Body>
        <ol className="timeline">
          {items.map((item) => (
            <li key={item.id} className={`timeline-item is-${item.status}`}>
              <span className="timeline-marker">
                {item.status === 'complete' && <CheckLg size={12} />}
              </span>
              <div className="timeline-content">
                <span className="timeline-title">{item.title}</span>
                <span className="timeline-date">
                  {formatDate(item.date)}
                  {item.status === 'current' && ` · in ${daysUntil(item.date)} days`}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </Card.Body>
    </Card>
  );
};

export default ReservationTimeline;
