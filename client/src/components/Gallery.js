// src/components/Gallery.js
import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import EventCard from './EventCard';
import './Gallery.css';

const pexels = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;

// Placeholder event names — swap in real past bookings and photos
const initialEvents = [
  { id: 1, title: 'Harper & James', type: 'Wedding', location: 'Ponte Vedra Beach', image: pexels(1579739), wide: true },
  { id: 2, title: 'Riverside Holiday Mixer', type: 'Corporate', location: 'Downtown Jacksonville', image: pexels(209967) },
  { id: 3, title: 'A Very Gatsby 40th', type: 'Birthday', location: 'San Marco', image: pexels(1579736) },
  { id: 4, title: 'Rooftop Product Launch', type: 'Brand Event', location: 'Brooklyn, Jax', image: pexels(1579734) },
  { id: 5, title: 'Garden Rehearsal Dinner', type: 'Wedding', location: 'St. Augustine', image: pexels(1190298) },
];

const moreEvents = [
  { id: 6, title: 'Summer Poolside Social', type: 'Private Party', location: 'Atlantic Beach', image: pexels(373543), wide: true },
  { id: 7, title: 'Jazz & Old Fashioneds', type: 'Fundraiser', location: 'Riverside', image: pexels(1579732) },
  { id: 8, title: 'Graduation Garden Party', type: 'Private Party', location: 'Mandarin', image: pexels(209969) },
];

const Gallery = () => {
  const [showAll, setShowAll] = useState(false);
  const events = showAll ? [...initialEvents, ...moreEvents] : initialEvents;

  return (
    <section id="gallery" className="section section-alt">
      <Container>
        <div className="section-header">
          <span className="eyebrow">Recent Events</span>
          <h2 className="section-title">Where we've poured lately</h2>
          <p className="section-lead">
            From oceanfront ceremonies to downtown office parties — a few recent favorites.
          </p>
        </div>

        <div className="gallery-grid">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-5">
            <Button variant="outline-primary" size="lg" onClick={() => setShowAll(true)}>
              See More Events
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Gallery;
