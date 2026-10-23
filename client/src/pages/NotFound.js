// src/pages/NotFound.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const NotFound = () => (
  <PageShell
    eyebrow="Error 404"
    title="This page has left the party."
    subtitle="The link may be broken or the page may have moved."
  >
    <Container>
      <div className="d-flex flex-wrap gap-3">
        <Button as={Link} to="/" variant="primary" size="lg">Back to home</Button>
        <Button as={Link} to="/" state={{ scrollTo: 'quote' }} variant="outline-primary" size="lg">
          Request a quote
        </Button>
      </div>
    </Container>
  </PageShell>
);

export default NotFound;
