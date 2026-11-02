// server/controllers/authController.js
const User = require('../models/User');
const { setAuthCookie, clearAuthCookie } = require('../utils/jwt');
const { validateRegister, validateLogin, isEmail, hasErrors } = require('../utils/validators');
const { sendPasswordResetRequest } = require('../services/emailService');

// POST /api/auth/register — public sign-up always creates a client account
const register = async (req, res) => {
  const errors = validateRegister(req.body);
  if (hasErrors(errors)) return res.status(400).json({ message: 'Please check the highlighted fields.', errors });

  const email = req.body.email.trim().toLowerCase();
  if (await User.exists({ email })) {
    return res.status(409).json({ message: 'An account with that email already exists.' });
  }

  const user = await User.create({
    name: req.body.name.trim(),
    email,
    password: req.body.password,
    phone: req.body.phone,
    role: 'client',
  });

  setAuthCookie(res, user);
  res.status(201).json({ user });
};

// POST /api/auth/login
const login = async (req, res) => {
  const errors = validateLogin(req.body);
  if (hasErrors(errors)) return res.status(400).json({ message: 'Please check the highlighted fields.', errors });

  const user = await User.findOne({ email: req.body.email.trim().toLowerCase() }).select('+password');

  // Same message for unknown email and wrong password
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(401).json({ message: 'Incorrect email or password.' });
  }

  if (user.status !== 'active') {
    return res.status(403).json({ message: 'This account has been disabled. Please contact us.' });
  }

  setAuthCookie(res, user);
  res.json({ user });
};

// POST /api/auth/logout
const logout = (req, res) => {
  clearAuthCookie(res);
  res.json({ message: 'Logged out.' });
};

// GET /api/auth/me
const me = (req, res) => {
  res.json({ user: req.user });
};

// POST /api/auth/forgot-password — always responds the same so emails can't be probed
const forgotPassword = async (req, res) => {
  const { email } = req.body || {};
  if (!isEmail(email)) return res.status(400).json({ message: 'A valid email is required.' });

  const user = await User.findOne({ email: email.trim().toLowerCase() });
  // TODO: generate a single-use reset token and email a reset link
  if (user) await sendPasswordResetRequest(user);

  res.json({ message: 'If an account exists for that email, a reset link is on its way.' });
};

module.exports = { register, login, logout, me, forgotPassword };
