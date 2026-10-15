import React, { useState } from 'react';
import { Card, Button, Badge, Alert } from 'react-bootstrap';
import { FileEarmark, Upload, XCircle } from 'react-bootstrap-icons';
import './DocumentUploads.css';

const mockDocuments = [
  { id: 1, name: 'ID_Verification.pdf', type: 'ID', date: '2026-08-01', size: '2.4 MB', status: 'verified' },
  { id: 2, name: 'Payment_Method.png', type: 'Payment', date: '2026-08-10', size: '1.1 MB', status: 'verified' },
];

const docTypes = ['ID Verification', 'Payment Method', 'Event Waiver', 'Guest List', 'Other'];

const DocumentUploads = () => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [dragActive, setDragActive] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;
    const newDocs = Array.from(files).map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      type: 'Upload',
      date: new Date().toISOString().split('T')[0],
      size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
      status: 'pending'
    }));
    setDocuments([...documents, ...newDocs]);
    setMessage(`${files.length} document(s) uploaded successfully.`);
    setTimeout(() => setMessage(''), 3000);
    e.target.value = '';
  };

  const handleDrag = (e) => {
    e.preventDefault();
    setDragActive(e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    const newDocs = Array.from(files).map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      type: 'Upload',
      date: new Date().toISOString().split('T')[0],
      size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
      status: 'pending'
    }));
    setDocuments([...documents, ...newDocs]);
    setMessage(`${files.length} document(s) uploaded.`);
    setTimeout(() => setMessage(''), 3000);
  };

  const removeDoc = (id) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  return (
    <Card className="dash-card">
      <Card.Header>
        <FileEarmark className="me-2" /> Document Uploads
      </Card.Header>
      <Card.Body>
        {message && <Alert variant="success" className="py-2 mb-3">{message}</Alert>}

        {/* Upload Zone */}
        <div
          className={`upload-zone ${dragActive ? 'upload-zone-active' : ''}`}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <Upload size={32} className="mb-2" />
          <p className="mb-1">Drag & drop files here</p>
          <small className="text-muted">or</small>
          <div>
            <label className="btn btn-outline-primary btn-sm mt-2 mb-0">
              Browse Files
              <input type="file" multiple hidden onChange={handleUpload} />
            </label>
          </div>
          <small className="text-muted d-block mt-2">PDF, PNG, JPG up to 10MB</small>
        </div>

        {/* Document List */}
        <div className="doc-list mt-4">
          {documents.map(doc => (
            <div key={doc.id} className="doc-item">
              <div className="doc-icon">
                <FileEarmark size={20} />
              </div>
              <div className="doc-info">
                <strong>{doc.name}</strong>
                <small className="text-muted d-block">{doc.type} · {doc.size} · {doc.date}</small>
              </div>
              <Badge bg={doc.status === 'verified' ? 'success' : 'warning'}>{doc.status}</Badge>
              <button className="btn btn-sm btn-outline-danger p-1" onClick={() => removeDoc(doc.id)}>
                <XCircle size={14} />
              </button>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default DocumentUploads;   