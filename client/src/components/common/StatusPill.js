// src/components/common/StatusPill.js
import React from 'react';
import './StatusPill.css';

// Maps a status word to a color tone; pass `tone` to override
const tones = {
  paid: 'success',
  confirmed: 'success',
  complete: 'success',
  verified: 'success',
  active: 'success',
  approved: 'success',
  available: 'success',
  sent: 'success',
  pending: 'warning',
  new: 'accent',
  current: 'accent',
  quoted: 'accent',
  limited: 'warning',
  unpaid: 'danger',
  overdue: 'danger',
  rejected: 'danger',
  booked: 'danger',
  denied: 'danger',
  admin: 'accent',
  client: 'neutral',
};

const StatusPill = ({ status, tone, children }) => (
  <span className={`status-pill tone-${tone || tones[status] || 'neutral'}`}>
    {children || status}
  </span>
);

export default StatusPill;
