// server/routes/authRoutes.js
const express = require('express');
const rateLimit = require('express-rate-limit');
const { register, login, logout, me, forgotPassword } = require('../controllers/authController');
const { requireDb, protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Slow down password guessing and sign-up spam
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many attempts. Please try again in a few minutes.' },
});

router.post('/register', authLimiter, requireDb, register);
router.post('/login', authLimiter, requireDb, login);
router.post('/forgot-password', authLimiter, requireDb, forgotPassword);
router.post('/logout', logout);
router.get('/me', requireDb, protect, me);

module.exports = router;
