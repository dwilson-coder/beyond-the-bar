// src/pages/TermsOfUse.js
import React from 'react';
import LegalDocument from '../components/LegalDocument';

// Placeholder terms — have these reviewed by an attorney before launch
const sections = [
  {
    heading: 'Acceptance of terms',
    body: [
      'By using the Beyond The Bar website or booking our services, you agree to these Terms of Use. If you do not agree, please do not use the site or our services.',
    ],
  },
  {
    heading: 'Age requirement',
    body: [
      'You must be at least 21 years old to create an account or book bartending services. Our bartenders will not serve alcohol to anyone under 21, and may request identification from any guest.',
    ],
  },
  {
    heading: 'Bookings & deposits',
    body: [
      'A booking is confirmed once your service agreement is signed and your deposit is received. The remaining balance is due by the date shown on your invoice.',
      'Cancellation and rescheduling terms are set out in your individual service agreement.',
    ],
  },
  {
    heading: 'Responsible service',
    body: [
      'Our staff follow responsible alcohol service practices. Bartenders may refuse service to any guest who appears intoxicated or is unable to provide valid identification, and may end service early if conditions become unsafe.',
    ],
  },
  {
    heading: 'Your account',
    body: [
      'You are responsible for keeping your login credentials confidential and for all activity under your account. Let us know right away if you suspect unauthorized use.',
    ],
  },
  {
    heading: 'Limitation of liability',
    body: [
      'To the fullest extent permitted by law, Beyond The Bar is not liable for indirect, incidental or consequential damages arising from use of the website or our services.',
    ],
  },
  {
    heading: 'Changes to these terms',
    body: [
      'We may update these terms from time to time. Continued use of the site after changes are posted means you accept the updated terms.',
    ],
  },
];

const TermsOfUse = () => (
  <LegalDocument
    title="Terms of Use"
    subtitle="The ground rules for using our website and booking our bartending services."
    updated="October 2026"
    sections={sections}
  />
);

export default TermsOfUse;
