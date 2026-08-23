// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import {
  Row, Col, Card, Form, Button, Table, Badge, Alert,
  Tab, Tabs, ListGroup, Dropdown
} from 'react-bootstrap';
import {
  People, Calendar, CreditCard, Envelope,
  Lock, XCircle, CheckCircle, Shield
} from 'react-bootstrap-icons';
import DashboardLayout from '../components/DashboardLayout';

// ─── Mock Data ───
const mockUsers = [
  { id: 1, name: 'John Smith', email: 'john@email.com', role: 'client', status: 'active' },
  { id: 2, name: 'Jane Doe', email: 'jane@email.com', role: 'client', status: 'active' },
  { id: 3, name: 'Admin User', email: 'admin@beyondthebar.com', role: 'admin', status: 'active' },
];

const mockReservations = [
  { id: 1, client: 'John Smith', date: '2026-09-05', event: 'VIP Lounge Party', guests: 4, status: 'confirmed', payment: 'deposit' },
  { id: 2, client: 'Jane Doe', date: '2026-09-19', event: 'Late Night Grooves', guests: 2, status: 'pending', payment: 'none' },
];

const mockMessages = [
  { id: 1, from: 'John Smith', subject: 'Table request', body: 'Can we get a table near the DJ?', date: '2026-08-18' },
  { id: 2, from: 'Jane Doe', subject: 'Refund inquiry', body: 'When will my refund arrive?', date: '2026-08-19' },
];

const mockContactRequests = [
  { id: 1, client: 'John Smith', name: 'Sarah Smith', phone: '(407) 555-0199', status: 'pending' },
];

const mockPasswordRequests = [
  { id: 1, client: 'Jane Doe', email: 'jane@email.com', date: '2026-08-19', status: 'pending' },
];

const mockCloseRequests = [
  { id: 1, client: 'Old User', email: 'old@email.com', date: '2026-08-15', status: 'pending' },
];

const AdminDashboard = () => {
  const [users, setUsers] = useState(mockUsers);
  const [message, setMessage] = useState('');

  const updateRole = (id, newRole) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    setMessage(`Role updated for user #${id}.`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleApprove = (type, id) => {
    setMessage(`${type} request #${id} approved.`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleReject = (type, id) => {
    setMessage(`${type} request #${id} rejected.`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <DashboardLayout role="admin">
      {message && <Alert variant="info" className="mb-4">{message}</Alert>}

      <Tabs defaultActiveKey="users" className="mb-4">

        {/* ─── User Accounts ─── */}
        <Tab eventKey="users" title="User Accounts">
          <Card className="dash-card">
            <Card.Header>
              <People className="me-2" /> Manage Users
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <Badge bg={u.role === 'admin' ? 'danger' : 'primary'}>{u.role}</Badge>
                      </td>
                      <td><Badge bg="success">{u.status}</Badge></td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="outline-primary" size="sm">Change Role</Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => updateRole(u.id, 'client')}>Client</Dropdown.Item>
                            <Dropdown.Item onClick={() => updateRole(u.id, 'admin')}>Admin</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        {/* ─── Reservations ─── */}
        <Tab eventKey="reservations" title="Reservations">
          <Card className="dash-card">
            <Card.Header>
              <Calendar className="me-2" /> All Reservations
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr><th>Client</th><th>Date</th><th>Event</th><th>Guests</th><th>Status</th><th>Payment</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {mockReservations.map(r => (
                    <tr key={r.id}>
                      <td>{r.client}</td>
                      <td>{r.date}</td>
                      <td>{r.event}</td>
                      <td>{r.guests}</td>
                      <td><Badge bg={r.status === 'confirmed' ? 'success' : 'warning'}>{r.status}</Badge></td>
                      <td className="text-capitalize">{r.payment}</td>
                      <td>
                        <Button variant="outline-success" size="sm" className="me-1" onClick={() => handleApprove('Reservation', r.id)}>
                          Confirm
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleReject('Reservation', r.id)}>
                          Reject
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        {/* ─── Payments & Refunds ─── */}
        <Tab eventKey="payments" title="Payments & Refunds">
          <Row>
            <Col md={6}>
              <Card className="dash-card">
                <Card.Header><CreditCard className="me-2" /> Payment Requests</Card.Header>
                <Card.Body>
                  <Table hover>
                    <thead><tr><th>Client</th><th>Amount</th><th>Type</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>
                      <tr>
                        <td>John Smith</td><td>$75</td><td>Deposit</td>
                        <td><Badge bg="warning">pending</Badge></td>
                        <td><Button variant="outline-success" size="sm" onClick={() => handleApprove('Payment', 1)}>Approve</Button></td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="dash-card">
                <Card.Header>Refund Requests</Card.Header>
                <Card.Body>
                  <Table hover>
                    <thead><tr><th>Client</th><th>Amount</th><th>Reason</th><th>Action</th></tr></thead>
                    <tbody>
                      <tr>
                        <td>Jane Doe</td><td>$150</td><td>Schedule conflict</td>
                        <td>
                          <Button variant="outline-success" size="sm" className="me-1" onClick={() => handleApprove('Refund', 1)}>Approve</Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleReject('Refund', 1)}>Reject</Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* ─── Messages ─── */}
        <Tab eventKey="messages" title="Messages">
          <Card className="dash-card">
            <Card.Header><Envelope className="me-2" /> Client Messages</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {mockMessages.map(m => (
                  <ListGroup.Item key={m.id} className="py-3">
                    <div className="d-flex justify-content-between">
                      <strong>{m.from}</strong>
                      <small className="text-muted">{m.date}</small>
                    </div>
                    <p className="mb-1 fw-semibold">{m.subject}</p>
                    <p className="mb-2 text-muted">{m.body}</p>
                    <Button variant="outline-primary" size="sm" onClick={() => handleApprove('Message', m.id)}>
                      Reply
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Tab>

        {/* ─── Contact Requests ─── */}
        <Tab eventKey="contacts" title="Contact Requests">
          <Card className="dash-card">
            <Card.Header><People className="me-2" /> Add Contact Requests</Card.Header>
            <Card.Body>
              <Table hover>
                <thead><tr><th>Client</th><th>New Contact</th><th>Phone</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {mockContactRequests.map(c => (
                    <tr key={c.id}>
                      <td>{c.client}</td>
                      <td>{c.name}</td>
                      <td>{c.phone}</td>
                      <td><Badge bg="warning">{c.status}</Badge></td>
                      <td>
                        <Button variant="outline-success" size="sm" className="me-1" onClick={() => handleApprove('Contact', c.id)}>
                          <CheckCircle size={12} /> Approve
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleReject('Contact', c.id)}>
                          <XCircle size={12} /> Reject
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        {/* ─── Password Requests ─── */}
        <Tab eventKey="passwords" title="Password Requests">
          <Card className="dash-card">
            <Card.Header><Lock className="me-2" /> Password Change Requests</Card.Header>
            <Card.Body>
              <Table hover>
                <thead><tr><th>Client</th><th>Email</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {mockPasswordRequests.map(p => (
                    <tr key={p.id}>
                      <td>{p.client}</td>
                      <td>{p.email}</td>
                      <td>{p.date}</td>
                      <td><Badge bg="warning">{p.status}</Badge></td>
                      <td>
                        <Button variant="outline-success" size="sm" onClick={() => handleApprove('Password', p.id)}>
                          Send Reset
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        {/* ─── Close Account Requests ─── */}
        <Tab eventKey="close" title="Close Requests">
          <Card className="dash-card">
            <Card.Header className="text-danger"><XCircle className="me-2" /> Account Closure Requests</Card.Header>
            <Card.Body>
              <Table hover>
                <thead><tr><th>Client</th><th>Email</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {mockCloseRequests.map(c => (
                    <tr key={c.id}>
                      <td>{c.client}</td>
                      <td>{c.email}</td>
                      <td>{c.date}</td>
                      <td><Badge bg="warning">{c.status}</Badge></td>
                      <td>
                        <Button variant="outline-success" size="sm" className="me-1" onClick={() => handleApprove('Closure', c.id)}>
                          Process
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleReject('Closure', c.id)}>
                          Deny
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

      </Tabs>
    </DashboardLayout>
  );
};

export default AdminDashboard;   