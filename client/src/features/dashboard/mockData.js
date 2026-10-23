// src/features/dashboard/mockData.js
// Shared demo data for the client dashboard until the API exists

export const client = {
  name: 'Harper Mitchell',
  email: 'harper.mitchell@email.com',
};

export const upcomingEvent = {
  title: 'Harper & James Wedding',
  type: 'Wedding',
  date: '2026-11-14',
  time: '5:00 PM – 10:00 PM',
  venue: 'Oceanfront Pavilion',
  address: 'Ponte Vedra Beach, FL',
  guests: 180,
  package: 'Signature',
  bartenders: 3,
  status: 'confirmed',
  eventLead: 'Andre Collins',
};

export const invoices = [
  { id: 'INV-1042', date: '2026-10-02', description: 'Booking deposit', amount: 500, status: 'paid' },
  { id: 'INV-1057', date: '2026-10-16', description: 'Glassware rental (180 guests)', amount: 240, status: 'paid' },
  { id: 'INV-1063', date: '2026-11-01', description: 'Remaining balance — Signature package', amount: 1450, status: 'unpaid' },
];

export const balanceDue = invoices
  .filter((inv) => inv.status !== 'paid')
  .reduce((sum, inv) => sum + inv.amount, 0);

export const formatDate = (iso, options = { month: 'short', day: 'numeric', year: 'numeric' }) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', options);

export const daysUntil = (iso) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((new Date(`${iso}T00:00:00`) - today) / 86400000);
};

export const currency = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
