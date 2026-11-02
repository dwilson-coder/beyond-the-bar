import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { FileEarmarkText, Upload, Trash } from 'react-bootstrap-icons';
import StatusPill from '../../components/common/StatusPill';
import { addDays, todayIso } from '../../utils/date';
import { formatDate, keyDates } from './mockData';
import './DocumentUploads.css';

const docTypes = ['Venue requirements', 'Certificate of insurance request', 'Guest list', 'Floor plan', 'Other'];

const mockDocuments = [
  { id: 1, name: 'Signed_Service_Agreement.pdf', type: 'Agreement', date: keyDates.deposit, size: '412 KB', status: 'verified' },
  { id: 2, name: 'Oceanfront_Pavilion_Vendor_Rules.pdf', type: 'Venue requirements', date: addDays(keyDates.deposit, 7), size: '1.2 MB', status: 'verified' },
  { id: 3, name: 'Reception_Floor_Plan.png', type: 'Floor plan', date: addDays(keyDates.tasting, 2), size: '2.4 MB', status: 'pending' },
];

const formatSize = (bytes) =>
  bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

const DocumentUploads = () => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [docType, setDocType] = useState(docTypes[0]);
  const [dragActive, setDragActive] = useState(false);

  const addFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    const today = todayIso();
    setDocuments((prev) => [
      ...files.map((f, i) => ({
        id: Date.now() + i,
        name: f.name,
        type: docType,
        date: today,
        size: formatSize(f.size),
        status: 'pending',
      })),
      ...prev,
    ]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <Card className="dash-card">
      <Card.Header>
        <h2 className="dash-card-title"><FileEarmarkText /> Documents</h2>
        <span className="dash-card-sub">{documents.length} files</span>
      </Card.Header>
      <Card.Body>
        <Form.Group controlId="doc-type" className="mb-3 doc-type">
          <Form.Label>Document type</Form.Label>
          <Form.Select value={docType} onChange={(e) => setDocType(e.target.value)}>
            {docTypes.map((t) => <option key={t}>{t}</option>)}
          </Form.Select>
        </Form.Group>

        <label
          className={`upload-zone ${dragActive ? 'is-active' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          <span className="upload-icon"><Upload size={22} /></span>
          <span className="upload-title">Drop files here or <u>browse</u></span>
          <span className="upload-hint">PDF, PNG or JPG up to 10 MB</span>
          <input
            type="file"
            multiple
            hidden
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = '';
            }}
          />
        </label>

        <ul className="doc-list">
          {documents.map((doc) => (
            <li key={doc.id} className="doc-item">
              <span className="doc-icon"><FileEarmarkText size={18} /></span>
              <div className="doc-info">
                <strong>{doc.name}</strong>
                <small>{doc.type} · {doc.size} · {formatDate(doc.date)}</small>
              </div>
              <StatusPill status={doc.status} />
              <button
                type="button"
                className="icon-btn doc-remove"
                onClick={() => setDocuments((prev) => prev.filter((d) => d.id !== doc.id))}
                aria-label={`Remove ${doc.name}`}
              >
                <Trash size={14} />
              </button>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default DocumentUploads;
