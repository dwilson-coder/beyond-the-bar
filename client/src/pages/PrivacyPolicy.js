// src/pages/PrivacyPolicy.js
import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavBar />
      
      <div className="legal-page py-5 flex-grow-1">
        <Container style={{ maxWidth: '800px' }}>
          <Link to="/" className="btn btn-sm btn-outline-secondary mb-4 d-inline-flex align-items-center">
            <ArrowLeft className="me-1" size={14} /> Back to Home
          </Link>
          
          <h1 className="fw-bold mb-4">Privacy Policy</h1>
          
          <div className="legal-content">
            <p className="text-muted mb-3">Last Updated: August 2026</p>
            
            <h5 className="fw-bold mt-4 mb-2">1. Information We Collect</h5>
            <p>We collect personal information such as your name, email address, and age verification data when you create an account or make a purchase.</p>
            
            <h5 className="fw-bold mt-4 mb-2">2. How We Use Your Data</h5>
            <p>Your information is used to process transactions, provide event updates, and improve our services. We do not sell your personal data to third parties.</p>
            
            <h5 className="fw-bold mt-4 mb-2">3. Data Security</h5>
            <p>We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
            
            <h5 className="fw-bold mt-4 mb-2">4. Cookies & Tracking</h5>
            <p>Our website uses cookies to enhance your browsing experience. You can disable cookies in your browser settings, but some features may not function properly.</p>
            
            <h5 className="fw-bold mt-4 mb-2">5. Third-Party Services</h5>
            <p>We may use third-party services such as Google Maps and payment processors. These services have their own privacy policies.</p>
            
            <h5 className="fw-bold mt-4 mb-2">6. Your Rights</h5>
            <p>You have the right to access, correct, or delete your personal data. Contact us at info@beyondthebar.com for any privacy-related requests.</p>
            
            <h5 className="fw-bold mt-4 mb-2">7. Contact Us</h5>
            <p>For any questions about this Privacy Policy, please contact us at <strong>info@beyondthebar.com</strong>.</p>
          </div>
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;   