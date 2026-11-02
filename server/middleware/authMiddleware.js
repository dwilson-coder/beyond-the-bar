// server/middleware/authMiddleware.js
const User = require('../models/User');
const { isDbReady } = require('../config/db');
const { AUTH_COOKIE, verifyToken } = require('../utils/jwt');

// 503 instead of hanging when MONGODB_URI hasn't been configured yet
const requireDb = (req, res, next) => {
  if (!isDbReady()) {
    return res.status(503).json({ message: 'Database is not connected. Set MONGODB_URI in server/.env.' });
  }
  next();
};

// Reads the token from the auth cookie (or a Bearer header for API clients)
const protect = async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = req.cookies?.[AUTH_COOKIE] || (header.startsWith('Bearer ') ? header.slice(7) : null);

  if (!token) return res.status(401).json({ message: 'Please log in to continue.' });

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    return res.status(401).json({ message: 'Your session has expired. Please log in again.' });
  }

  const user = await User.findById(payload.sub);
  if (!user || user.status !== 'active') {
    return res.status(401).json({ message: 'Please log in to continue.' });
  }

  req.user = user;
  next();
};

const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(403).json({ message: 'You do not have access to this resource.' });
  }
  next();
};

module.exports = { requireDb, protect, requireRole };
