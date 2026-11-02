// src/pages/Login.js
import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CalendarCheck, ChatDots, Receipt } from 'react-bootstrap-icons';
import ThemeToggle from '../components/common/ThemeToggle';
import { useAuth, dashboardPath } from '../context/AuthContext';
import authService, { authMode, demoAccounts } from '../services/authService';
import './Login.css';

const emptyForm = { name: '', email: '', password: '', isOver21: false };

const perks = [
  { icon: <CalendarCheck size={18} />, label: 'Track every detail of your booking' },
  { icon: <ChatDots size={18} />, label: 'Message your bar team directly' },
  { icon: <Receipt size={18} />, label: 'View invoices and pay your balance' },
];

const copy = {
  login: { title: 'Welcome back', subtitle: 'Log in to manage your upcoming event.', cta: 'Log In' },
  signup: { title: 'Create your account', subtitle: 'Save your event details and track your booking.', cta: 'Create Account' },
  reset: { title: 'Reset your password', subtitle: "Enter your email and we'll send you a reset link.", cta: 'Send Reset Link' },
};

const Login = () => {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { user, loading, login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Send users back to the dashboard they were trying to open, if any
  const from = location.state?.from;
  const destinationFor = (account) =>
    from?.pathname?.startsWith(dashboardPath(account)) ? `${from.pathname}${from.hash || ''}` : dashboardPath(account);

  const switchMode = (next) => {
    setMode(next);
    setMessage(null);
    setFormData(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (mode === 'signup' && !formData.isOver21) {
      setMessage({ variant: 'warning', text: 'You must be 21 or older to create an account.' });
      return;
    }

    setSubmitting(true);
    try {
      if (mode === 'reset') {
        const text = await authService.requestPasswordReset(formData.email);
        setMessage({ variant: 'info', text });
      } else {
        const account =
          mode === 'signup'
            ? await register({ name: formData.name, email: formData.email, password: formData.password })
            : await login(formData.email, formData.password);
        navigate(destinationFor(account), { replace: true });
      }
    } catch (err) {
      setMessage({ variant: 'danger', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = (account) => {
    setMode('login');
    setMessage(null);
    setFormData({ ...emptyForm, email: account.email, password: account.password });
  };

  // Already signed in → straight to the dashboard
  if (!loading && user && !submitting) {
    return <Navigate to={destinationFor(user)} replace />;
  }

  const { title, subtitle, cta } = copy[mode];

  return (
    <div className="auth-page">
      <aside className="auth-visual">
        <div className="auth-visual-overlay" />
        <div className="auth-visual-content">
          <Link to="/" className="auth-brand">
            Beyond <span>the</span> Bar
          </Link>
          <div>
            <h2 className="auth-visual-title">
              Your event, your bar — <em>all in one place.</em>
            </h2>
            <ul className="auth-perks">
              {perks.map((perk) => (
                <li key={perk.label}>
                  <span className="auth-perk-icon">{perk.icon}</span>
                  {perk.label}
                </li>
              ))}
            </ul>
          </div>
          <p className="auth-visual-foot">Mobile bartending · Jacksonville &amp; Northeast Florida</p>
        </div>
      </aside>

      <main className="auth-panel">
        <div className="auth-topbar">
          <Link to="/" className="auth-back">
            <ArrowLeft size={14} /> Back to site
          </Link>
          <ThemeToggle className="icon-btn" />
        </div>

        <div className="auth-form-wrap">
          <h1 className="auth-title">{title}</h1>
          <p className="auth-subtitle">{subtitle}</p>

          {message && <Alert variant={message.variant} className="auth-alert">{message.text}</Alert>}

          <Form onSubmit={handleSubmit} className="auth-form">
            {mode === 'signup' && (
              <Form.Group controlId="auth-name">
                <Form.Label>Full name</Form.Label>
                <Form.Control name="name" value={formData.name} onChange={handleChange} required autoComplete="name" />
              </Form.Group>
            )}

            <Form.Group controlId="auth-email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" />
            </Form.Group>

            {mode !== 'reset' && (
              <Form.Group controlId="auth-password">
                <div className="d-flex justify-content-between align-items-baseline">
                  <Form.Label>Password</Form.Label>
                  {mode === 'login' && (
                    <button type="button" className="auth-link" onClick={() => switchMode('reset')}>
                      Forgot password?
                    </button>
                  )}
                </div>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={mode === 'signup' ? 8 : undefined}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                />
                {mode === 'signup' && <Form.Text>At least 8 characters.</Form.Text>}
              </Form.Group>
            )}

            {mode === 'signup' && (
              <Form.Check
                type="checkbox"
                id="auth-over-21"
                name="isOver21"
                label="I confirm I am 21 years of age or older"
                checked={formData.isOver21}
                onChange={handleChange}
              />
            )}

            <Button variant="primary" size="lg" type="submit" className="w-100" disabled={submitting}>
              {submitting ? <><Spinner animation="border" size="sm" className="me-2" />Please wait…</> : cta}
            </Button>
          </Form>

          <p className="auth-switch">
            {mode === 'login' && (
              <>New to Beyond The Bar? <button type="button" className="auth-link" onClick={() => switchMode('signup')}>Create an account</button></>
            )}
            {mode === 'signup' && (
              <>Already have an account? <button type="button" className="auth-link" onClick={() => switchMode('login')}>Log in</button></>
            )}
            {mode === 'reset' && (
              <button type="button" className="auth-link" onClick={() => switchMode('login')}>Back to log in</button>
            )}
          </p>

          {authMode === 'mock' && mode === 'login' && (
            <div className="auth-demo">
              <p>
                <strong>Demo mode.</strong> Accounts are stored in this browser until MongoDB is connected.
                Password for both: <code>password123</code>
              </p>
              <div className="auth-demo-actions">
                {demoAccounts.map((account) => (
                  <button key={account.id} type="button" className="auth-demo-btn" onClick={() => fillDemo(account)}>
                    <span>{account.role === 'admin' ? 'Admin' : 'Client'} demo</span>
                    <small>{account.email}</small>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;
