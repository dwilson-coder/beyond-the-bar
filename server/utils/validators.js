// server/utils/validators.js — request body validation
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isEmail = (value) => typeof value === 'string' && EMAIL_PATTERN.test(value.trim());

const isNonEmpty = (value) => typeof value === 'string' && value.trim().length > 0;

// Each validator returns an object of field → message; empty means valid
const validateRegister = ({ name, email, password } = {}) => {
  const errors = {};
  if (!isNonEmpty(name)) errors.name = 'Name is required.';
  if (!isEmail(email)) errors.email = 'A valid email is required.';
  if (typeof password !== 'string' || password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }
  return errors;
};

const validateLogin = ({ email, password } = {}) => {
  const errors = {};
  if (!isEmail(email)) errors.email = 'A valid email is required.';
  if (!isNonEmpty(password)) errors.password = 'Password is required.';
  return errors;
};

const validateEvent = ({ title, date, guests } = {}) => {
  const errors = {};
  if (!isNonEmpty(title)) errors.title = 'Event name is required.';
  if (!date || Number.isNaN(Date.parse(date))) errors.date = 'A valid event date is required.';
  if (!Number.isInteger(Number(guests)) || Number(guests) < 1) errors.guests = 'Guest count must be at least 1.';
  return errors;
};

const hasErrors = (errors) => Object.keys(errors).length > 0;

module.exports = { isEmail, validateRegister, validateLogin, validateEvent, hasErrors };
