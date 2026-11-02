// src/services/authService.js
// Two interchangeable backends, chosen by REACT_APP_AUTH_MODE:
//   "api"  → Express + MongoDB server (httpOnly cookie sessions)
//   "mock" → demo accounts stored in this browser, for use before MongoDB is connected
import { ApiError, request } from './api';

export const authMode = process.env.REACT_APP_AUTH_MODE === 'api' ? 'api' : 'mock';

// ─── API mode ───
const apiAuth = {
  login: async (email, password) => (await request('/auth/login', { method: 'POST', body: { email, password } })).user,
  register: async (fields) => (await request('/auth/register', { method: 'POST', body: fields })).user,
  logout: () => request('/auth/logout', { method: 'POST' }),
  getCurrentUser: async () => {
    try {
      return (await request('/auth/me')).user;
    } catch (err) {
      if (err.status === 401 || err.status === 503 || err.status === 0) return null;
      throw err;
    }
  },
  requestPasswordReset: async (email) =>
    (await request('/auth/forgot-password', { method: 'POST', body: { email } })).message,
};

// ─── Mock mode (demo only — never use for real accounts) ───
const USERS_KEY = 'btb-mock-users';
const SESSION_KEY = 'btb-mock-session';

export const demoAccounts = [
  { id: 'demo-client', name: 'Harper Mitchell', email: 'client@demo.com', password: 'password123', role: 'client' },
  { id: 'demo-admin', name: 'Jordan Ellis', email: 'admin@demo.com', password: 'password123', role: 'admin' },
];

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode) — session lasts until refresh
  }
};

const publicUser = ({ password, ...user }) => user;
const allUsers = () => [...demoAccounts, ...read(USERS_KEY, [])];
const delay = () => new Promise((resolve) => setTimeout(resolve, 350));

let memorySession = null;

const mockAuth = {
  login: async (email, password) => {
    await delay();
    const user = allUsers().find((u) => u.email === email.trim().toLowerCase());
    if (!user || user.password !== password) throw new ApiError('Incorrect email or password.', 401);
    memorySession = publicUser(user);
    write(SESSION_KEY, memorySession);
    return memorySession;
  },
  register: async ({ name, email, password }) => {
    await delay();
    const normalized = email.trim().toLowerCase();
    if (allUsers().some((u) => u.email === normalized)) {
      throw new ApiError('An account with that email already exists.', 409);
    }
    const user = { id: `user-${Date.now()}`, name: name.trim(), email: normalized, password, role: 'client' };
    write(USERS_KEY, [...read(USERS_KEY, []), user]);
    memorySession = publicUser(user);
    write(SESSION_KEY, memorySession);
    return memorySession;
  },
  logout: async () => {
    memorySession = null;
    write(SESSION_KEY, null);
  },
  getCurrentUser: async () => read(SESSION_KEY, null) || memorySession,
  requestPasswordReset: async () => {
    await delay();
    return 'If an account exists for that email, a reset link is on its way.';
  },
};

const authService = authMode === 'api' ? apiAuth : mockAuth;

export default authService;
