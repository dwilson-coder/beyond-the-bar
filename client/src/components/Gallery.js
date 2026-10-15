// src/components/Gallery.js
import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import EventCard from './EventCard';
import './Gallery.css';

// Initial set of previous events
const initialEvents = [
  {
    id: 1,
    title: "Neon Nights",
    date: "AUG 28",
    location: "Main Hall, Orlando",
    price: "25",
    image: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    title: "VIP Lounge Party",
    date: "SEP 05",
    location: "Rooftop Bar",
    price: "50",
    image: "https://images.pexels.com/photos/209967/pexels-photo-209967.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    title: "DJ Takeover",
    date: "SEP 12",
    location: "Main Stage",
    price: "35",
    image: "https://images.pexels.com/photos/1579736/pexels-photo-1579736.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 4,
    title: "Late Night Grooves",
    date: "SEP 19",
    location: "Underground Club",
    price: "20",
    image: "https://images.pexels.com/photos/1579734/pexels-photo-1579734.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

// Additional events to load
const moreEvents = [
  {
    id: 5,
    title: "Summer Finale",
    date: "JUL 15",
    location: "Poolside Deck",
    price: "30",
    image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 6,
    title: "Retro Rewind",
    date: "JUN 22",
    location: "Main Hall",
    price: "25",
    image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 7,
    title: "Jazz & Cocktails",
    date: "MAY 10",
    location: "Lounge Area",
    price: "40",
    image: "https://images.pexels.com/photos/1579732/pexels-photo-1579732.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 8,
    title: "Spring Break Bash",
    date: "MAR 05",
    location: "Entire Venue",
    price: "60",
    image: "https://images.pexels.com/photos/209969/pexels-photo-209969.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const Gallery = () => {
  const [displayedEvents, setDisplayedEvents] = useState(initialEvents);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const handleLoadMore = () => {
    setDisplayedEvents([...displayedEvents, ...moreEvents]);
    setShowLoadMore(false); // Hide button after loading all
  };

  return (
    <section id="gallery" className="py-5">
      <Container>
        {/* Updated Title */}
        <h2 className="text-center mb-5 fw-bold">Previous Events</h2>
        
        <Row xs={1} md={2} lg={4} className="g-4">
          {displayedEvents.map((event) => (
            <Col key={event.id}>
              <EventCard 
                image={event.image}
                date={event.date}
                title={event.title}
                location={event.location}
                price={event.price}
              />
            </Col>
          ))}
        </Row>

        {/* Load More Button */}
        {showLoadMore && (
          <div className="text-center mt-5">
            <Button 
              variant="outline-light" 
              size="lg" 
              onClick={handleLoadMore}
              className="load-more-btn"
            >
              Load More Events
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Gallery;   