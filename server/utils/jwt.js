// server/utils/jwt.js — token signing + auth cookie settings
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn, isProduction } = require('../config/env');

const AUTH_COOKIE = 'btb_token';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const signToken = (user) => jwt.sign({ sub: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });

const verifyToken = (token) => jwt.verify(token, jwtSecret);

// httpOnly so page scripts can never read the token
const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax',
  path: '/',
};

const setAuthCookie = (res, user) => {
  res.cookie(AUTH_COOKIE, signToken(user), { ...cookieOptions, maxAge: SEVEN_DAYS_MS });
};

const clearAuthCookie = (res) => {
  res.clearCookie(AUTH_COOKIE, cookieOptions);
};

module.exports = { AUTH_COOKIE, verifyToken, setAuthCookie, clearAuthCookie };
