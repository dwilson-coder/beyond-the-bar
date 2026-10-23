// src/pages/Login.js
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CalendarCheck, ChatDots, Receipt } from 'react-bootstrap-icons';
import ThemeToggle from '../components/common/ThemeToggle';
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
  const navigate = useNavigate();

  const switchMode = (next) => {
    setMode(next);
    setMessage(null);
    setFormData(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Mock auth — no backend yet
  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === 'reset') {
      setMessage({ variant: 'info', text: `If an account exists for ${formData.email}, a reset link is on its way.` });
      setTimeout(() => switchMode('login'), 3000);
    } else if (mode === 'signup') {
      if (!formData.isOver21) {
        setMessage({ variant: 'warning', text: 'You must be 21 or older to create an account.' });
        return;
      }
      setMessage({ variant: 'success', text: `Account created for ${formData.name}. Redirecting…` });
      setTimeout(() => navigate('/dashboard/client'), 1200);
    } else {
      const role = formData.email.includes('admin') ? 'admin' : 'client';
      setMessage({ variant: 'success', text: 'Logged in. Redirecting…' });
      setTimeout(() => navigate(`/dashboard/${role}`), 1200);
    }
  };

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

            <Button variant="primary" size="lg" type="submit" className="w-100">
              {cta}
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

          {mode === 'login' && (
            <p className="auth-demo">
              <strong>Demo:</strong> any email logs in as a client. Include “admin” in the email to see the admin dashboard.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;
