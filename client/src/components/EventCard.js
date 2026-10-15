// src/components/EventCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './EventCard.css';

const EventCard = ({ image, date, title, location, price }) => {
  return (
    <div className="event-card-wrapper">
      <Card className="club-event-card">
        <div className="card-image-container">
          <span className="event-date-badge">{date}</span>
          <Card.Img variant="top" src={image} className="card-img" />
          <div className="card-overlay"></div>
        </div>
        
        <Card.Body className="card-body-content">
          <Card.Title className="event-title">{title}</Card.Title>
          <Card.Text className="event-location">
            <i className="bi bi-geo-alt-fill"></i> {location}
          </Card.Text>
          
          <div className="card-footer-action">
            <span className="event-price">${price}</span>
            <Button variant="outline-light" className="rsvp-btn">RSVP</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventCard;   