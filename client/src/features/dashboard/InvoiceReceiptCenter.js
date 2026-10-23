import React, { useState } from 'react';
import { Card, Table, Button, Modal, Row, Col } from 'react-bootstrap';
import { Receipt, Eye, Printer, CheckCircleFill } from 'react-bootstrap-icons';
import StatusPill from '../../components/common/StatusPill';
import { invoices as initialInvoices, currency, formatDate, upcomingEvent } from './mockData';
import './InvoiceReceiptCenter.css';

const InvoiceReceiptCenter = () => {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [preview, setPreview] = useState(null);
  const [paidNotice, setPaidNotice] = useState(false);

  const totalPaid = invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const outstanding = invoices.filter((i) => i.status !== 'paid').reduce((s, i) => s + i.amount, 0);

  // Mock payment until a payment provider is wired up
  const payInvoice = (id) => {
    setInvoices((prev) => prev.map((inv) => (inv.id === id ? { ...inv, status: 'paid' } : inv)));
    setPaidNotice(true);
    setTimeout(() => setPaidNotice(false), 3000);
  };

  return (
    <Card className="dash-card">
      <Card.Header>
        <h2 className="dash-card-title"><Receipt /> Invoices &amp; payments</h2>
        {paidNotice && <span className="save-note" role="status"><CheckCircleFill /> Payment received</span>}
      </Card.Header>
      <Card.Body>
        <Row xs={1} md={3} className="g-3 mb-4">
          <Col>
            <div className="invoice-stat">
              <span className="stat-label">Paid to date</span>
              <strong>{currency(totalPaid)}</strong>
            </div>
          </Col>
          <Col>
            <div className={`invoice-stat ${outstanding ? 'is-due' : ''}`}>
              <span className="stat-label">Balance due</span>
              <strong>{currency(outstanding)}</strong>
            </div>
          </Col>
          <Col>
            <div className="invoice-stat">
              <span className="stat-label">Booking total</span>
              <strong>{currency(totalPaid + outstanding)}</strong>
            </div>
          </Col>
        </Row>

        <Table hover responsive className="dash-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Description</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td className="fw-semibold">{inv.id}</td>
                <td>{inv.description}</td>
                <td className="text-nowrap">{formatDate(inv.date)}</td>
                <td className="fw-semibold">{currency(inv.amount)}</td>
                <td><StatusPill status={inv.status} /></td>
                <td>
                  <div className="table-actions">
                    {inv.status !== 'paid' && (
                      <Button variant="primary" size="sm" onClick={() => payInvoice(inv.id)}>Pay now</Button>
                    )}
                    <Button variant="outline-secondary" size="sm" className="btn-quiet" onClick={() => setPreview(inv)} aria-label={`View ${inv.id}`}>
                      <Eye size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>

      <Modal show={preview !== null} onHide={() => setPreview(null)} centered className="invoice-modal">
        {preview && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Invoice {preview.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="invoice-doc">
                <div className="invoice-doc-head">
                  <div>
                    <span className="invoice-brand">Beyond <em>the</em> Bar</span>
                    <small>Mobile bartending · Jacksonville, FL</small>
                  </div>
                  <div className="text-end">
                    <strong>{preview.id}</strong>
                    <small>{formatDate(preview.date)}</small>
                  </div>
                </div>
                <div className="invoice-doc-for">
                  <small>Billed for</small>
                  <span>{upcomingEvent.title} · {formatDate(upcomingEvent.date)}</span>
                </div>
                <div className="invoice-doc-line">
                  <span>{preview.description}</span>
                  <span>{currency(preview.amount)}</span>
                </div>
                <div className="invoice-doc-line is-total">
                  <span>Total</span>
                  <span>{currency(preview.amount)}</span>
                </div>
                <div className="text-center mt-3">
                  <StatusPill status={preview.status} />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" className="btn-quiet" onClick={() => setPreview(null)}>Close</Button>
              <Button variant="primary" onClick={() => window.print()}><Printer className="me-2" />Print</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Card>
  );
};

export default InvoiceReceiptCenter;
