import React, { useState } from 'react';
import { Card, Table, Button, Badge, Modal, Row, Col } from 'react-bootstrap';
import { Receipt, Download, Eye } from 'react-bootstrap-icons';
import './InvoiceReceiptCenter.css';

const mockInvoices = [
  { id: 'INV-2026-001', date: '2026-08-15', amount: 75, type: 'Deposit', status: 'paid' },
  { id: 'INV-2026-002', date: '2026-08-20', amount: 150, type: 'VIP Package', status: 'paid' },
  { id: 'INV-2026-003', date: '2026-08-25', amount: 50, type: 'Add-On', status: 'pending' },
  { id: 'INV-2026-004', date: '2026-09-01', amount: 225, type: 'Balance Due', status: 'unpaid' },
];

const InvoiceReceiptCenter = () => {
  const [showModal, setShowModal] = useState(null);

  const totalPaid = mockInvoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const totalPending = mockInvoices.filter(i => i.status !== 'paid').reduce((s, i) => s + i.amount, 0);

  return (
    <Card className="dash-card">
      <Card.Header>
        <Receipt className="me-2" /> Invoice & Receipt Center
      </Card.Header>
      <Card.Body>
        {/* Summary */}
        <Row className="mb-4">
          <Col md={4}>
            <div className="invoice-summary-card paid">
              <small>Total Paid</small>
              <h5 className="mb-0">${totalPaid}</h5>
            </div>
          </Col>
          <Col md={4}>
            <div className="invoice-summary-card pending">
              <small>Pending</small>
              <h5 className="mb-0">${totalPending}</h5>
            </div>
          </Col>
          <Col md={4}>
            <div className="invoice-summary-card total">
              <small>Total</small>
              <h5 className="mb-0">${totalPaid + totalPending}</h5>
            </div>
          </Col>
        </Row>

        {/* Invoices Table */}
        <Table hover responsive className="mb-0">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockInvoices.map(inv => (
              <tr key={inv.id}>
                <td className="fw-semibold">{inv.id}</td>
                <td>{inv.date}</td>
                <td>{inv.type}</td>
                <td>${inv.amount}</td>
                <td>
                  <Badge bg={inv.status === 'paid' ? 'success' : inv.status === 'pending' ? 'warning' : 'danger'}>
                    {inv.status}
                  </Badge>
                </td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-1" onClick={() => setShowModal(inv)}>
                    <Eye size={12} />
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    <Download size={12} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>

      {/* View Invoice Modal */}
      <Modal show={showModal !== null} onHide={() => setShowModal(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Invoice {showModal?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="invoice-preview">
            <div className="d-flex justify-content-between mb-4">
              <div>
                <h6 className="fw-bold">BEYOND THE BAR</h6>
                <small className="text-muted">1686 Geraldine Dr, Jacksonville, FL 32205</small>
              </div>
              <div className="text-end">
                <h6 className="fw-bold">{showModal?.id}</h6>
                <small className="text-muted">{showModal?.date}</small>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <span>{showModal?.type}</span>
              <strong>${showModal?.amount}</strong>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>${showModal?.amount}</span>
            </div>
            <div className="text-center mt-4">
              <Badge bg={showModal?.status === 'paid' ? 'success' : 'danger'}>
                {showModal?.status.toUpperCase()}
              </Badge>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(null)}>Close</Button>
         <Button variant="primary">Print</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default InvoiceReceiptCenter;   