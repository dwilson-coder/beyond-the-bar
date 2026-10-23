// src/components/Contact.js — Quote request form
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Envelope, Telephone, GeoAlt, Clock, CheckLg } from 'react-bootstrap-icons';
import { packages } from './Pricing';
import './Contact.css';

const eventTypes = ['Wedding', 'Corporate event', 'Private party', 'Birthday', 'Fundraiser', 'Other'];

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  eventDate: '',
  eventType: '',
  guests: '',
  location: '',
  package: '',
  message: '',
};

const contactDetails = [
  { icon: <Telephone size={18} />, label: 'Phone', value: '(407) 555-0199', href: 'tel:+14075550199' },
  { icon: <Envelope size={18} />, label: 'Email', value: 'info@beyondthebar.com', href: 'mailto:info@beyondthebar.com' },
  { icon: <GeoAlt size={18} />, label: 'Service area', value: 'Jacksonville & Northeast Florida' },
  { icon: <Clock size={18} />, label: 'Response time', value: 'Within one business day' },
];

const today = new Date().toISOString().split('T')[0];

const Contact = ({ selectedPackage }) => {
  const [form, setForm] = useState(emptyForm);
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Prefill the package when a visitor picks one in the Packages section
  useEffect(() => {
    if (selectedPackage?.name) {
      setForm((prev) => ({ ...prev, package: selectedPackage.name }));
    }
  }, [selectedPackage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // TODO: POST to the backend once the quote API exists
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }
    setSubmitted(true);
  };

  const reset = () => {
    setForm(emptyForm);
    setValidated(false);
    setSubmitted(false);
  };

  return (
    <section id="quote" className="section section-dark quote-section">
      <Container>
        <Row className="g-5 align-items-start">
          <Col lg={5}>
            <span className="eyebrow">Request a Quote</span>
            <h2 className="section-title">
              Let's plan your <em>bar</em>.
            </h2>
            <p className="section-lead mb-5">
              Tell us a little about your event and we'll send a tailored proposal, drink menu
              ideas and a shopping list — no obligation.
            </p>
            <ul className="contact-details">
              {contactDetails.map((item) => (
                <li key={item.label}>
                  <span className="contact-icon">{item.icon}</span>
                  <div>
                    <span className="contact-label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="contact-value">{item.value}</a>
                    ) : (
                      <span className="contact-value">{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={7}>
            <div className="quote-card">
              {submitted ? (
                <div className="quote-success" role="status">
                  <span className="quote-success-icon"><CheckLg size={28} /></span>
                  <h3>Thanks, {form.name.split(' ')[0]}!</h3>
                  <p>
                    We've received your request for {form.eventDate || 'your event'} and will be in
                    touch at <strong>{form.email}</strong> within one business day.
                  </p>
                  <Button variant="outline-primary" onClick={reset}>Send another request</Button>
                </div>
              ) : (
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group controlId="quote-name">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control name="name" value={form.name} onChange={handleChange} required autoComplete="name" />
                        <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="quote-email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required autoComplete="email" />
                        <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="quote-phone">
                        <Form.Label>Phone <span className="optional">(optional)</span></Form.Label>
                        <Form.Control type="tel" name="phone" value={form.phone} onChange={handleChange} autoComplete="tel" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="quote-date">
                        <Form.Label>Event date</Form.Label>
                        <Form.Control type="date" name="eventDate" min={today} value={form.eventDate} onChange={handleChange} required />
                        <Form.Control.Feedback type="invalid">Please choose a future date.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="quote-type">
                        <Form.Label>Event type</Form.Label>
                        <Form.Select name="eventType" value={form.eventType} onChange={handleChange} required>
                          <option value="">Select…</option>
                          {eventTypes.map((type) => (
                            <option key={type}>{type}</option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Please choose an event type.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="quote-guests">
                        <Form.Label>Estimated guests</Form.Label>
                        <Form.Control type="number" name="guests" min={1} value={form.guests} onChange={handleChange} required />
                        <Form.Control.Feedback type="invalid">Please estimate your guest count.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="quote-location">
                        <Form.Label>Venue or city</Form.Label>
                        <Form.Control name="location" value={form.location} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="quote-package">
                        <Form.Label>Package</Form.Label>
                        <Form.Select name="package" value={form.package} onChange={handleChange}>
                          <option value="">Not sure yet</option>
                          {packages.map((p) => (
                            <option key={p.name}>{p.name}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group controlId="quote-message">
                        <Form.Label>Tell us about your event <span className="optional">(optional)</span></Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Theme, favorite drinks, timeline, anything we should know…"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Button variant="primary" size="lg" type="submit" className="w-100">
                        Request My Quote
                      </Button>
                      <p className="quote-fineprint">No spam, ever. We'll only use your details to respond to this request.</p>
                    </Col>
                  </Row>
                </Form>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
