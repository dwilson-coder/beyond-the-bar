import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Calendar, CheckCircle, Clock, XCircle } from 'react-bootstrap-icons';
import './ReservationTimeline.css';

const timelineItems = [
  { id: 1, title: 'Reservation Created', date: 'Aug 15, 2026', status: 'complete', icon: <Calendar size={16} /> },
  { id: 2, title: 'Deposit Paid ($75)', date: 'Aug 15, 2026', status: 'complete', icon: <CheckCircle size={16} /> },
  { id: 3, title: 'Event Confirmation', date: 'Aug 18, 2026', status: 'complete', icon: <CheckCircle size={16} /> },
  { id: 4, title: 'Full Payment Due', date: 'Sep 01, 2026', status: 'current', icon: <Clock size={16} /> },
  { id: 5, title: 'Event Day — VIP Lounge Party', date: 'Sep 05, 2026', status: 'upcoming', icon: <Calendar size={16} /> },
  { id: 6, title: 'Post-Event Review', date: 'Sep 06, 2026', status: 'upcoming', icon: <XCircle size={16} /> },
];

const ReservationTimeline = () => {
  return (
    <Card className="dash-card">
      <Card.Header>
        <Calendar className="me-2" /> Reservation Timeline
      </Card.Header>
      <Card.Body>
        <div className="timeline">
          {timelineItems.map((item, idx) => (
            <div key={item.id} className={`timeline-item ${item.status}`}>
              <div className="timeline-marker">
                <span className="marker-icon">{item.icon}</span>
              </div>
              <div className="timeline-content">
                <div className="d-flex justify-content-between align-items-center">
                  <strong className="timeline-title">{item.title}</strong>
                  <Badge
                    bg={item.status === 'complete' ? 'success' : item.status === 'current' ? 'primary' : 'secondary'}
                  >
                    {item.status}
                  </Badge>
                </div>
                <small className="text-muted">{item.date}</small>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReservationTimeline;   