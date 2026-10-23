// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import { Row, Col, Card, Button, Table, Dropdown, ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import {
  Speedometer2, Inbox, CalendarEvent, CreditCard, Envelope, People, PersonGear,
  CheckCircleFill, CashStack, Wallet2,
} from 'react-bootstrap-icons';
import DashboardLayout from '../components/DashboardLayout';
import StatusPill from '../components/common/StatusPill';
import { currency, formatDate } from '../features/dashboard/mockData';
import './AdminDashboard.css';

// ─── Mock Data ───
const admin = { name: 'Jordan Ellis', email: 'admin@beyondthebar.com' };

const initialQuotes = [
  { id: 'Q-311', name: 'Monica Reyes', type: 'Wedding', date: '2027-04-17', guests: 140, package: 'Signature', received: '2026-10-22', status: 'new' },
  { id: 'Q-310', name: 'Coastal Health Partners', type: 'Corporate event', date: '2026-12-11', guests: 220, package: 'Premier', received: '2026-10-21', status: 'new' },
  { id: 'Q-309', name: 'Devon Price', type: 'Birthday', date: '2026-11-28', guests: 45, package: 'Essentials', received: '2026-10-20', status: 'quoted' },
  { id: 'Q-307', name: 'Lena Okafor', type: 'Private party', date: '2026-12-05', guests: 60, package: 'Not sure yet', received: '2026-10-18', status: 'quoted' },
];

const initialBookings = [
  { id: 'B-208', client: 'Harper Mitchell', event: 'Harper & James Wedding', date: '2026-11-14', guests: 180, bartenders: 3, total: 2190, paid: 740, status: 'confirmed' },
  { id: 'B-211', client: 'Riverside Arts Guild', event: 'Holiday Fundraiser', date: '2026-11-21', guests: 120, bartenders: 2, total: 1350, paid: 500, status: 'confirmed' },
  { id: 'B-214', client: 'Marcus Tate', event: '40th Birthday', date: '2026-11-28', guests: 50, bartenders: 1, total: 520, paid: 0, status: 'pending' },
  { id: 'B-215', client: 'Atlas Logistics', event: 'Year-End Party', date: '2026-12-12', guests: 260, bartenders: 4, total: 3600, paid: 1000, status: 'confirmed' },
];

const initialPayments = [
  { id: 'P-901', client: 'Marcus Tate', kind: 'Deposit', amount: 250, status: 'pending' },
  { id: 'P-898', client: 'Harper Mitchell', kind: 'Glassware add-on', amount: 240, status: 'paid' },
];

const initialRefunds = [
  { id: 'R-41', client: 'Sam Whitaker', amount: 250, reason: 'Event postponed — date unavailable', status: 'pending' },
];

const initialMessages = [
  { id: 1, from: 'Harper Mitchell', subject: 'Signature cocktail swap', body: 'Can we swap the mezcal for tequila blanco in the second drink?', date: '2026-10-19', unread: false },
  { id: 2, from: 'Riverside Arts Guild', subject: 'Venue load-in time', body: 'The venue opens at 3:30 PM for vendors. Does that work for setup?', date: '2026-10-22', unread: true },
  { id: 3, from: 'Marcus Tate', subject: 'Deposit question', body: 'Is the deposit refundable if we move the party a week?', date: '2026-10-22', unread: true },
];

const initialUsers = [
  { id: 1, name: 'Harper Mitchell', email: 'harper.mitchell@email.com', role: 'client', status: 'active' },
  { id: 2, name: 'Marcus Tate', email: 'marcus.t@email.com', role: 'client', status: 'active' },
  { id: 3, name: 'Andre Collins', email: 'andre@beyondthebar.com', role: 'admin', status: 'active' },
  { id: 4, name: 'Jordan Ellis', email: 'admin@beyondthebar.com', role: 'admin', status: 'active' },
];

const initialRequests = [
  { id: 1, kind: 'Add contact', client: 'Harper Mitchell', detail: 'Sarah Mitchell · (904) 555-0142', date: '2026-10-21', status: 'pending' },
  { id: 2, kind: 'Password reset', client: 'Marcus Tate', detail: 'marcus.t@email.com', date: '2026-10-22', status: 'pending' },
  { id: 3, kind: 'Close account', client: 'Old Account', detail: 'old@email.com', date: '2026-10-15', status: 'pending' },
];

const AdminDashboard = () => {
  const { hash } = useLocation();
  const [quotes, setQuotes] = useState(initialQuotes);
  const [bookings, setBookings] = useState(initialBookings);
  const [payments, setPayments] = useState(initialPayments);
  const [refunds, setRefunds] = useState(initialRefunds);
  const [messages, setMessages] = useState(initialMessages);
  const [users, setUsers] = useState(initialUsers);
  const [requests, setRequests] = useState(initialRequests);
  const [toast, setToast] = useState('');

  const notify = (text) => {
    setToast(text);
    setTimeout(() => setToast(''), 2500);
  };

  const setStatus = (setter, id, status, text) => {
    setter((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    notify(text);
  };

  const newQuotes = quotes.filter((q) => q.status === 'new').length;
  const unread = messages.filter((m) => m.unread).length;
  const openRequests = requests.filter((r) => r.status === 'pending').length;
  const bookedRevenue = bookings.reduce((s, b) => s + b.total, 0);
  const outstanding = bookings.reduce((s, b) => s + (b.total - b.paid), 0);

  const sections = [
    { id: 'overview', label: 'Overview', icon: <Speedometer2 />, title: 'Overview' },
    { id: 'quotes', label: 'Quote Requests', icon: <Inbox />, title: 'Quote requests', badge: newQuotes },
    { id: 'bookings', label: 'Bookings', icon: <CalendarEvent />, title: 'Bookings' },
    { id: 'payments', label: 'Payments', icon: <CreditCard />, title: 'Payments & refunds' },
    { id: 'messages', label: 'Messages', icon: <Envelope />, title: 'Messages', badge: unread },
    { id: 'users', label: 'Users', icon: <People />, title: 'User accounts' },
    { id: 'requests', label: 'Account Requests', icon: <PersonGear />, title: 'Account requests', badge: openRequests },
  ];

  const activeId = sections.some((s) => `#${s.id}` === hash) ? hash.slice(1) : 'overview';
  const active = sections.find((s) => s.id === activeId);

  // ─── Reusable tables ───
  const quotesTable = (rows) => (
    <Table hover responsive className="dash-table">
      <thead>
        <tr><th>Request</th><th>Event</th><th>Date</th><th>Guests</th><th>Package</th><th>Status</th><th className="text-end">Actions</th></tr>
      </thead>
      <tbody>
        {rows.map((q) => (
          <tr key={q.id}>
            <td>
              <strong className="d-block">{q.name}</strong>
              <small className="text-muted-token">{q.id} · received {formatDate(q.received, { month: 'short', day: 'numeric' })}</small>
            </td>
            <td>{q.type}</td>
            <td className="text-nowrap">{formatDate(q.date)}</td>
            <td>{q.guests}</td>
            <td>{q.package}</td>
            <td><StatusPill status={q.status} /></td>
            <td>
              <div className="table-actions">
                {q.status === 'new' ? (
                  <Button size="sm" variant="primary" onClick={() => setStatus(setQuotes, q.id, 'quoted', `Quote sent to ${q.name}`)}>Send quote</Button>
                ) : (
                  <Button size="sm" variant="outline-secondary" className="btn-quiet" onClick={() => setStatus(setQuotes, q.id, 'confirmed', `${q.name} marked as booked`)} disabled={q.status === 'confirmed'}>
                    {q.status === 'confirmed' ? 'Booked' : 'Mark booked'}
                  </Button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const bookingsTable = (rows) => (
    <Table hover responsive className="dash-table">
      <thead>
        <tr><th>Event</th><th>Date</th><th>Guests</th><th>Staff</th><th>Paid</th><th>Status</th><th className="text-end">Actions</th></tr>
      </thead>
      <tbody>
        {rows.map((b) => (
          <tr key={b.id}>
            <td>
              <strong className="d-block">{b.event}</strong>
              <small className="text-muted-token">{b.client} · {b.id}</small>
            </td>
            <td className="text-nowrap">{formatDate(b.date)}</td>
            <td>{b.guests}</td>
            <td>{b.bartenders}</td>
            <td className="text-nowrap">
              {currency(b.paid)} <small className="text-muted-token">/ {currency(b.total)}</small>
            </td>
            <td><StatusPill status={b.status} /></td>
            <td>
              <div className="table-actions">
                {b.status === 'pending' ? (
                  <>
                    <Button size="sm" variant="primary" onClick={() => setStatus(setBookings, b.id, 'confirmed', `${b.event} confirmed`)}>Confirm</Button>
                    <Button size="sm" variant="outline-danger" className="btn-danger-quiet" onClick={() => setStatus(setBookings, b.id, 'rejected', `${b.event} declined`)}>Decline</Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline-secondary" className="btn-quiet" as={Link} to="#messages">Message</Button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  // ─── Views ───
  const views = {
    overview: (
      <>
        <Row xs={2} xl={4} className="g-3 mb-4">
          <Col>
            <div className="stat-tile">
              <span className="stat-label"><Inbox /> New quotes</span>
              <span className="stat-value">{newQuotes}</span>
              <span className="stat-meta">Reply within 1 business day</span>
            </div>
          </Col>
          <Col>
            <div className="stat-tile">
              <span className="stat-label"><CalendarEvent /> Upcoming events</span>
              <span className="stat-value">{bookings.filter((b) => b.status !== 'rejected').length}</span>
              <span className="stat-meta">Next 60 days</span>
            </div>
          </Col>
          <Col>
            <div className="stat-tile">
              <span className="stat-label"><CashStack /> Booked revenue</span>
              <span className="stat-value">{currency(bookedRevenue)}</span>
              <span className="stat-meta">Nov – Dec 2026</span>
            </div>
          </Col>
          <Col>
            <div className="stat-tile">
              <span className="stat-label"><Wallet2 /> Outstanding</span>
              <span className="stat-value">{currency(outstanding)}</span>
              <span className="stat-meta">Balances not yet collected</span>
            </div>
          </Col>
        </Row>
        <Card className="dash-card">
          <Card.Header>
            <h2 className="dash-card-title"><Inbox /> Latest quote requests</h2>
            <Link to="#quotes" className="card-link">View all</Link>
          </Card.Header>
          <Card.Body>{quotesTable(quotes.slice(0, 3))}</Card.Body>
        </Card>
        <Card className="dash-card">
          <Card.Header>
            <h2 className="dash-card-title"><CalendarEvent /> Upcoming events</h2>
            <Link to="#bookings" className="card-link">View all</Link>
          </Card.Header>
          <Card.Body>{bookingsTable(bookings.slice(0, 3))}</Card.Body>
        </Card>
      </>
    ),

    quotes: (
      <Card className="dash-card">
        <Card.Header>
          <h2 className="dash-card-title"><Inbox /> All quote requests</h2>
          <span className="dash-card-sub">From the website quote form</span>
        </Card.Header>
        <Card.Body>{quotesTable(quotes)}</Card.Body>
      </Card>
    ),

    bookings: (
      <Card className="dash-card">
        <Card.Header>
          <h2 className="dash-card-title"><CalendarEvent /> All bookings</h2>
        </Card.Header>
        <Card.Body>{bookingsTable(bookings)}</Card.Body>
      </Card>
    ),

    payments: (
      <Row className="g-4">
        <Col xl={7}>
          <Card className="dash-card">
            <Card.Header><h2 className="dash-card-title"><CreditCard /> Payments</h2></Card.Header>
            <Card.Body>
              <Table hover responsive className="dash-table">
                <thead><tr><th>Client</th><th>Type</th><th>Amount</th><th>Status</th><th className="text-end">Action</th></tr></thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id}>
                      <td><strong>{p.client}</strong></td>
                      <td>{p.kind}</td>
                      <td>{currency(p.amount)}</td>
                      <td><StatusPill status={p.status} /></td>
                      <td>
                        <div className="table-actions">
                          {p.status === 'pending' && (
                            <Button size="sm" variant="primary" onClick={() => setStatus(setPayments, p.id, 'paid', `Payment from ${p.client} recorded`)}>Mark paid</Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={5}>
          <Card className="dash-card">
            <Card.Header><h2 className="dash-card-title"><Wallet2 /> Refund requests</h2></Card.Header>
            <Card.Body>
              {refunds.map((r) => (
                <div key={r.id} className="refund-item">
                  <div className="d-flex justify-content-between align-items-start gap-2">
                    <div>
                      <strong className="d-block">{r.client}</strong>
                      <small className="text-muted-token">{r.reason}</small>
                    </div>
                    <span className="refund-amount">{currency(r.amount)}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <StatusPill status={r.status} />
                    {r.status === 'pending' && (
                      <div className="table-actions">
                        <Button size="sm" variant="primary" onClick={() => setStatus(setRefunds, r.id, 'approved', 'Refund approved')}>Approve</Button>
                        <Button size="sm" variant="outline-danger" className="btn-danger-quiet" onClick={() => setStatus(setRefunds, r.id, 'denied', 'Refund denied')}>Deny</Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    ),

    messages: (
      <Card className="dash-card">
        <Card.Header>
          <h2 className="dash-card-title"><Envelope /> Client messages</h2>
          <span className="dash-card-sub">{unread} unread</span>
        </Card.Header>
        <ListGroup variant="flush" className="message-list">
          {messages.map((m) => (
            <ListGroup.Item key={m.id} className={m.unread ? 'is-unread' : ''}>
              <div className="d-flex justify-content-between gap-3">
                <strong>{m.from}</strong>
                <small className="text-muted-token text-nowrap">{formatDate(m.date, { month: 'short', day: 'numeric' })}</small>
              </div>
              <p className="message-subject">{m.subject}</p>
              <p className="message-body">{m.body}</p>
              <Button
                size="sm"
                variant={m.unread ? 'primary' : 'outline-secondary'}
                className={m.unread ? '' : 'btn-quiet'}
                onClick={() => {
                  setMessages((prev) => prev.map((x) => (x.id === m.id ? { ...x, unread: false } : x)));
                  notify(`Reply drafted to ${m.from}`);
                }}
              >
                Reply
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    ),

    users: (
      <Card className="dash-card">
        <Card.Header>
          <h2 className="dash-card-title"><People /> User accounts</h2>
          <span className="dash-card-sub">{users.length} users</span>
        </Card.Header>
        <Card.Body>
          <Table hover responsive className="dash-table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th className="text-end">Actions</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td><strong>{u.name}</strong></td>
                  <td>{u.email}</td>
                  <td><StatusPill status={u.role} /></td>
                  <td><StatusPill status={u.status} /></td>
                  <td>
                    <div className="table-actions">
                      <Dropdown align="end">
                        <Dropdown.Toggle size="sm" variant="outline-secondary" className="btn-quiet">Change role</Dropdown.Toggle>
                        <Dropdown.Menu>
                          {['client', 'admin'].map((role) => (
                            <Dropdown.Item
                              key={role}
                              active={u.role === role}
                              onClick={() => {
                                setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, role } : x)));
                                notify(`${u.name} is now ${role === 'admin' ? 'an admin' : 'a client'}`);
                              }}
                            >
                              {role === 'admin' ? 'Admin' : 'Client'}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    ),

    requests: (
      <Card className="dash-card">
        <Card.Header>
          <h2 className="dash-card-title"><PersonGear /> Account requests</h2>
          <span className="dash-card-sub">Contacts, password resets &amp; closures</span>
        </Card.Header>
        <Card.Body>
          <Table hover responsive className="dash-table">
            <thead><tr><th>Request</th><th>Client</th><th>Details</th><th>Date</th><th>Status</th><th className="text-end">Actions</th></tr></thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.kind}</strong></td>
                  <td>{r.client}</td>
                  <td>{r.detail}</td>
                  <td className="text-nowrap">{formatDate(r.date, { month: 'short', day: 'numeric' })}</td>
                  <td><StatusPill status={r.status} /></td>
                  <td>
                    <div className="table-actions">
                      {r.status === 'pending' && (
                        <>
                          <Button size="sm" variant="primary" onClick={() => setStatus(setRequests, r.id, 'approved', `${r.kind} approved`)}>Approve</Button>
                          <Button size="sm" variant="outline-danger" className="btn-danger-quiet" onClick={() => setStatus(setRequests, r.id, 'denied', `${r.kind} denied`)}>Deny</Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    ),
  };

  return (
    <DashboardLayout
      role="admin"
      sections={sections}
      activeId={activeId}
      user={admin}
      title={activeId === 'overview' ? `Good to see you, ${admin.name.split(' ')[0]}` : active.title}
      subtitle={activeId === 'overview' ? 'Bookings, quotes and payments at a glance.' : undefined}
    >
      {views[activeId]}
      {toast && (
        <div className="dash-toast" role="status">
          <CheckCircleFill /> {toast}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
