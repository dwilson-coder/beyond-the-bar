// server/middleware/errorMiddleware.js
const { isProduction } = require('../config/env');

const notFound = (req, res) => {
  res.status(404).json({ message: `Not found: ${req.method} ${req.originalUrl}` });
};

// Express 5 forwards rejected promises from async handlers here
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Request body must be valid JSON.' });
  }

  if (err.name === 'ValidationError') {
    const errors = Object.fromEntries(Object.entries(err.errors).map(([field, e]) => [field, e.message]));
    return res.status(400).json({ message: 'Please check the highlighted fields.', errors });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid id.' });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: 'That record already exists.' });
  }

  const status = err.status || 500;
  if (status >= 500) console.error(err);

  res.status(status).json({
    message: status >= 500 && isProduction ? 'Something went wrong.' : err.message,
  });
};

module.exports = { notFound, errorHandler };
