// src/pages/PrivacyPolicy.js
import React from 'react';
import LegalDocument from '../components/LegalDocument';

// Placeholder policy — have this reviewed by an attorney before launch
const sections = [
  {
    heading: 'Information we collect',
    body: [
      'When you request a quote, create an account or book an event, we collect details such as your name, email, phone number, event date, venue and guest count.',
    ],
  },
  {
    heading: 'How we use your information',
    body: [
      'We use your information to respond to quote requests, plan and staff your event, send invoices and keep you updated about your booking. We do not sell your personal data.',
    ],
  },
  {
    heading: 'Data security',
    body: [
      'We use industry-standard safeguards to protect your information from unauthorized access, alteration or disclosure.',
    ],
  },
  {
    heading: 'Cookies',
    body: [
      'We use cookies and browser storage in four categories. Strictly necessary storage keeps you signed in and remembers your cookie choices; it is always on. Preference storage remembers settings such as light or dark mode. Analytics and marketing storage are not currently in use.',
      'When you first visit, we ask which optional categories you allow. You can change your choices at any time with “Cookie Settings” in the site footer. Your choices are saved in your browser.',
    ],
  },
  {
    heading: 'Third-party services',
    body: [
      'We may use trusted providers, such as payment processors and email services, to operate our business. These providers have their own privacy policies.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      'You may request access to, correction of or deletion of your personal information at any time by emailing info@beyondthebar.com.',
    ],
  },
  {
    heading: 'Contact us',
    body: ['Questions about this policy? Email info@beyondthebar.com or call (407) 555-0199.'],
  },
];

const PrivacyPolicy = () => (
  <LegalDocument
    title="Privacy Policy"
    subtitle="What we collect, why we collect it, and how we keep it safe."
    updated="October 2026"
    sections={sections}
  />
);

export default PrivacyPolicy;
