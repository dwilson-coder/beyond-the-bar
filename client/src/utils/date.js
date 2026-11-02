// src/utils/date.js — date helpers that stay in the visitor's local time zone

// YYYY-MM-DD in local time (toISOString() would shift to UTC and can land on tomorrow)
export const toIsoDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const todayIso = () => toIsoDate(new Date());

// Noon avoids daylight-saving edge cases when adding days
const atNoon = (iso) => new Date(`${iso}T12:00:00`);

export const addDays = (iso, days) => {
  const date = atNoon(iso);
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
};

// First Saturday at least `minDays` from today
export const nextSaturdayAfter = (minDays) => {
  const date = atNoon(addDays(todayIso(), minDays));
  date.setDate(date.getDate() + ((6 - date.getDay() + 7) % 7));
  return toIsoDate(date);
};

export const formatDate = (iso, options = { month: 'short', day: 'numeric', year: 'numeric' }) =>
  atNoon(iso).toLocaleDateString('en-US', options);

export const daysUntil = (iso) => Math.round((atNoon(iso) - atNoon(todayIso())) / 86400000);

// "5 days left", "Due today", "3 days overdue"
export const dueLabel = (iso) => {
  const days = daysUntil(iso);
  if (days < -1) return `${Math.abs(days)} days overdue`;
  if (days === -1) return '1 day overdue';
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  return `${days} days left`;
};
