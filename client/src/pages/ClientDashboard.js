// src/pages/ClientDashboard.js
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import {
  HouseDoor, ClipboardCheck, ChatDots, Bag, FileEarmarkText, Receipt, Gift, CalendarEvent,
  GeoAlt, People, Clock, CupStraw, HourglassSplit, Wallet2, ChevronRight,
} from 'react-bootstrap-icons';
import DashboardLayout from '../components/DashboardLayout';
import StatusPill from '../components/common/StatusPill';
import EventProfileBuilder from '../features/dashboard/EventProfileBuilder';
import SmartAvailabilityChecker from '../features/dashboard/SmartAvailabilityChecker';
import DocumentUploads from '../features/dashboard/DocumentUploads';
import RealTimeChat from '../features/dashboard/RealTimeChat';
import ReservationTimeline from '../features/dashboard/ReservationTimeline';
import AddOnMarketplace from '../features/dashboard/AddOnMarketplace';
import LoyaltyRewards from '../features/dashboard/LoyaltyRewards';
import InvoiceReceiptCenter from '../features/dashboard/InvoiceReceiptCenter';
import { client, upcomingEvent, balanceDue, currency, daysUntil, formatDate } from '../features/dashboard/mockData';
import './ClientDashboard.css';

const sections = [
  { id: 'overview', label: 'Overview', icon: <HouseDoor />, title: 'Overview' },
  { id: 'event', label: 'Event Details', icon: <ClipboardCheck />, title: 'Event details' },
  { id: 'messages', label: 'Messages', icon: <ChatDots />, title: 'Messages', badge: 1 },
  { id: 'addons', label: 'Add-Ons', icon: <Bag />, title: 'Add-ons' },
  { id: 'documents', label: 'Documents', icon: <FileEarmarkText />, title: 'Documents' },
  { id: 'invoices', label: 'Invoices', icon: <Receipt />, title: 'Invoices & payments' },
  { id: 'rewards', label: 'Rewards', icon: <Gift />, title: 'Referral rewards' },
  { id: 'availability', label: 'Book Another Date', icon: <CalendarEvent />, title: 'Book another date' },
];

const nextSteps = [
  { label: 'Pay remaining balance', due: '2026-11-01', to: '#invoices' },
  { label: 'Add your day-of contact', due: '2026-11-04', to: '#event' },
  { label: 'Confirm final headcount', due: '2026-11-04', to: '#event' },
];

const Overview = () => {
  const days = daysUntil(upcomingEvent.date);

  return (
    <>
      <section className="event-hero">
        <div className="event-hero-main">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="event-hero-eyebrow">Upcoming event</span>
            <StatusPill status={upcomingEvent.status} />
          </div>
          <h2 className="event-hero-title">{upcomingEvent.title}</h2>
          <ul className="event-hero-meta">
            <li><CalendarEvent /> {formatDate(upcomingEvent.date, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</li>
            <li><Clock /> {upcomingEvent.time}</li>
            <li><GeoAlt /> {upcomingEvent.venue}, {upcomingEvent.address}</li>
          </ul>
          <div className="event-hero-actions">
            <Button as={Link} to="#event" variant="primary">Review event details</Button>
            <Button as={Link} to="#messages" variant="outline-light">Message {upcomingEvent.eventLead.split(' ')[0]}</Button>
          </div>
        </div>
        <div className="event-countdown" aria-label={`${days} days to go`}>
          <span className="countdown-value">{Math.max(days, 0)}</span>
          <span className="countdown-label">{days === 1 ? 'day to go' : 'days to go'}</span>
        </div>
      </section>

      <Row xs={2} xl={4} className="g-3 mb-4">
        <Col>
          <div className="stat-tile">
            <span className="stat-label"><Wallet2 /> Balance due</span>
            <span className="stat-value">{currency(balanceDue)}</span>
            <span className="stat-meta">Due {formatDate('2026-11-01', { month: 'short', day: 'numeric' })}</span>
          </div>
        </Col>
        <Col>
          <div className="stat-tile">
            <span className="stat-label"><People /> Guests</span>
            <span className="stat-value">{upcomingEvent.guests}</span>
            <span className="stat-meta">Headcount locks Nov 4</span>
          </div>
        </Col>
        <Col>
          <div className="stat-tile">
            <span className="stat-label"><CupStraw /> Package</span>
            <span className="stat-value">{upcomingEvent.package}</span>
            <span className="stat-meta">{upcomingEvent.bartenders} bartenders · full bar</span>
          </div>
        </Col>
        <Col>
          <div className="stat-tile">
            <span className="stat-label"><HourglassSplit /> Service</span>
            <span className="stat-value">5 hrs</span>
            <span className="stat-meta">Setup begins 4:00 PM</span>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        <Col xl={7}>
          <div className="dash-card next-steps">
            <div className="card-header">
              <h2 className="dash-card-title">Next steps</h2>
              <span className="dash-card-sub">{nextSteps.length} to do</span>
            </div>
            <ul className="step-list">
              {nextSteps.map((step) => (
                <li key={step.label}>
                  <Link to={step.to} className="step-link">
                    <span className="step-check" aria-hidden="true" />
                    <span className="step-text">
                      <strong>{step.label}</strong>
                      <small>Due {formatDate(step.due, { month: 'short', day: 'numeric' })} · {daysUntil(step.due)} days left</small>
                    </span>
                    <ChevronRight className="step-arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <RealTimeChat compact />
        </Col>
        <Col xl={5}>
          <ReservationTimeline />
        </Col>
      </Row>
    </>
  );
};

const views = {
  overview: <Overview />,
  event: <EventProfileBuilder />,
  messages: <RealTimeChat />,
  addons: <AddOnMarketplace />,
  documents: <DocumentUploads />,
  invoices: <InvoiceReceiptCenter />,
  rewards: <LoyaltyRewards />,
  availability: <SmartAvailabilityChecker />,
};

const ClientDashboard = () => {
  const { hash } = useLocation();
  const activeId = views[hash.slice(1)] ? hash.slice(1) : 'overview';
  const active = sections.find((s) => s.id === activeId);

  return (
    <DashboardLayout
      role="client"
      sections={sections}
      activeId={activeId}
      user={client}
      title={activeId === 'overview' ? `Welcome back, ${client.name.split(' ')[0]}` : active.title}
      subtitle={activeId === 'overview' ? "Here's where everything stands for your big day." : undefined}
    >
      {views[activeId]}
    </DashboardLayout>
  );
};

export default ClientDashboard;
