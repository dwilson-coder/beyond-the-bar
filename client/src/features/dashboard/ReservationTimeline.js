import React from 'react';
import { Card } from 'react-bootstrap';
import { CalendarCheck, CheckLg } from 'react-bootstrap-icons';
import { daysUntil, dueLabel, formatDate, keyDates } from './mockData';
import './ReservationTimeline.css';

const milestones = [
  { id: 1, title: 'Quote accepted', date: keyDates.quoteAccepted },
  { id: 2, title: 'Deposit paid', date: keyDates.deposit },
  { id: 3, title: 'Cocktail menu tasting', date: keyDates.tasting },
  { id: 4, title: 'Remaining balance due', date: keyDates.balanceDue },
  { id: 5, title: 'Final headcount & menu lock', date: keyDates.headcount },
  { id: 6, title: 'Event day', date: keyDates.event },
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
                  {item.status === 'current' && ` · ${dueLabel(item.date).toLowerCase()}`}
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
