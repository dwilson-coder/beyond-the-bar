// src/pages/TermsOfUse.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfUse = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavBar />
      
      <div className="legal-page py-5 flex-grow-1">
        <Container style={{ maxWidth: '800px' }}>
          <Link to="/" className="btn btn-sm btn-outline-secondary mb-4 d-inline-flex align-items-center">
            <ArrowLeft className="me-1" size={14} /> Back to Home
          </Link>
          
          <h1 className="fw-bold mb-4">Terms of Use</h1>
          
          <div className="legal-content">
            <p className="text-muted mb-3">Last Updated: August 2026</p>
            
            <h5 className="fw-bold mt-4 mb-2">1. Acceptance of Terms</h5>
            <p>By accessing and using the Beyond The Bar website, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.</p>
            
            <h5 className="fw-bold mt-4 mb-2">2. Age Restriction</h5>
            <p>All users must be over the age of 32 to create an account and access premium features of the Beyond The Bar platform.</p>
            
            <h5 className="fw-bold mt-4 mb-2">3. User Accounts</h5>
            <p>You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your responsibility.</p>
            
            <h5 className="fw-bold mt-4 mb-2">4. Event Services</h5>
            <p>Beyond The Bar provides event booking and ticketing services. All purchases are final unless otherwise stated in the event description.</p>
            
            <h5 className="fw-bold mt-4 mb-2">5. Limitation of Liability</h5>
            <p>Beyond The Bar shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
            
            <h5 className="fw-bold mt-4 mb-2">6. Changes to Terms</h5>
            <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the updated terms.</p>
          </div>
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfUse;   