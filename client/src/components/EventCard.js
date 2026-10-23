// src/components/EventCard.js
import React from 'react';
import './EventCard.css';

const EventCard = ({ image, title, type, location, wide }) => {
  return (
    <figure className={`event-tile ${wide ? 'is-wide' : ''}`}>
      <img src={image} alt={`${title} — ${type}`} loading="lazy" />
      <figcaption>
        <span className="event-type">{type}</span>
        <span className="event-title">{title}</span>
        <span className="event-location">{location}</span>
      </figcaption>
    </figure>
  );
};

export default EventCard;
