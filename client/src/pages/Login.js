// src/pages/Login.js
import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons'; // Install: npm install react-bootstrap-icons

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isOver32: false
  });
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (resetMode) {
      setMessage(`If an account exists for ${formData.email}, a reset link has been sent.`);
      setTimeout(() => {
        setResetMode(false);
        setFormData({ name: '', email: '', password: '', isOver32: false });
      }, 3000);
    } else if (isSignUp) {
      if (!formData.isOver32) {
        setMessage('You must confirm you are over 32 to sign up.');
        return;
      }
      setMessage(`Account created for ${formData.name}! Redirecting...`);
      setTimeout(() => navigate('/dashboard/client'), 1500);
    } else {
      const role = formData.email.includes('admin') ? 'admin' : 'client';
      setMessage(`Logged in successfully as ${role}`);
      setTimeout(() => navigate(`/dashboard/${role}`), 1500);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }} className="p-4 shadow position-relative">
        
        {/* Back to Home Button */}
        <div className="position-absolute top-0 start-0 p-3">
          <Link to="/" className="btn btn-sm btn-outline-secondary d-flex align-items-center">
            <ArrowLeft className="me-1" size={14} /> Home
          </Link>
        </div>

        <div className="mt-4">
          <h3 className="text-center mb-4">
            {resetMode ? 'Reset Password' : (isSignUp ? 'Sign Up' : 'Log In')}
          </h3>
          
          {message && <Alert variant={message.includes('successfully') || message.includes('created') ? 'success' : 'info'}>{message}</Alert>}

          <Form onSubmit={handleSubmit}>
            {isSignUp && !resetMode && (
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="name"
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                placeholder="Enter email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </Form.Group>

            {isSignUp && !resetMode && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="password"
                    placeholder="Create password" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check 
                    type="checkbox" 
                    name="isOver32"
                    id="check-over-32"
                    label="I confirm I am over 32 years old" 
                    checked={formData.isOver32}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </>
            )}

            {!isSignUp && !resetMode && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="password"
                    placeholder="Enter password" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                </Form.Group>
                <div className="text-end mb-3">
                  <Button variant="link" onClick={() => setResetMode(true)} className="p-0">Forgot Password?</Button>
                </div>
              </>
            )}

            <Button variant="primary" type="submit" className="w-100">
              {resetMode ? 'Send Reset Link' : (isSignUp ? 'Sign Up' : 'Log In')}
            </Button>
          </Form>

          <div className="mt-3 text-center">
            {!resetMode && (
              <small>
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <Button 
                  variant="link" 
                  onClick={() => { 
                    setIsSignUp(!isSignUp); 
                    setMessage(''); 
                    setFormData({ name: '', email: '', password: '', isOver32: false });
                  }} 
                  className="p-0"
                >
                  {isSignUp ? "Log In" : "Sign Up"}
                </Button>
              </small>
            )}
            {resetMode && (
               <Button variant="link" onClick={() => setResetMode(false)}>Back to Login</Button>
            )}
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Login;   