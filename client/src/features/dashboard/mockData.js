// src/features/dashboard/mockData.js
// Shared demo data for the dashboards until they read from /api/events.
// Dates are relative to today so the demo never goes stale.
import { addDays, nextSaturdayAfter, todayIso } from '../../utils/date';

export { formatDate, daysUntil, dueLabel } from '../../utils/date';

const eventDate = nextSaturdayAfter(21);

// Booking milestones, counted back from the event
export const keyDates = {
  quoteAccepted: addDays(eventDate, -60),
  deposit: addDays(eventDate, -56),
  tasting: addDays(eventDate, -40),
  balanceDue: addDays(eventDate, -14),
  headcount: addDays(eventDate, -10),
  event: eventDate,
};

// For admin lists: n days from today
export const fromToday = (days) => addDays(todayIso(), days);

export const upcomingEvent = {
  title: 'Harper & James Wedding',
  type: 'Wedding',
  date: eventDate,
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
  { id: 'INV-1042', date: keyDates.deposit, description: 'Booking deposit', amount: 500, status: 'paid' },
  { id: 'INV-1057', date: addDays(keyDates.tasting, 1), description: 'Glassware rental (180 guests)', amount: 240, status: 'paid' },
  { id: 'INV-1063', date: keyDates.balanceDue, description: 'Remaining balance — Signature package', amount: 1450, status: 'unpaid' },
];

export const balanceDue = invoices
  .filter((inv) => inv.status !== 'paid')
  .reduce((sum, inv) => sum + inv.amount, 0);

export const currency = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
