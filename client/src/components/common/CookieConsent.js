// src/components/common/CookieConsent.js — first-visit banner + customizable settings
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'react-bootstrap-icons';
import { useCookieConsent } from '../../context/CookieConsentContext';
import { consentCategories } from '../../services/cookieConsent';
import './CookieConsent.css';

const noOptional = { preferences: false, analytics: false, marketing: false };

const CookieConsent = () => {
  const { consent, bannerVisible, settingsOpen, save, acceptAll, rejectAll, openSettings, closeSettings } =
    useCookieConsent();
  const [draft, setDraft] = useState(noOptional);

  // Start each settings session from the saved choices
  useEffect(() => {
    if (settingsOpen) {
      setDraft({
        preferences: Boolean(consent?.preferences),
        analytics: Boolean(consent?.analytics),
        marketing: Boolean(consent?.marketing),
      });
    }
  }, [settingsOpen, consent]);

  return (
    <>
      {bannerVisible && !settingsOpen && (
        <section className="cookie-banner" aria-labelledby="cookie-banner-title">
          <div className="cookie-banner-head">
            <span className="cookie-banner-icon"><ShieldCheck size={18} /></span>
            <h2 id="cookie-banner-title">We value your privacy</h2>
          </div>
          <p>
            We use cookies and browser storage to keep you signed in and remember your preferences.
            Choose what you're comfortable with. You can change this any time.{' '}
            <Link to="/privacy">Privacy Policy</Link>
          </p>
          <div className="cookie-banner-actions">
            <Button variant="primary" onClick={acceptAll}>Accept all</Button>
            <Button variant="outline-primary" onClick={rejectAll}>Reject non-essential</Button>
            <button type="button" className="cookie-link" onClick={openSettings}>Customize</button>
          </div>
        </section>
      )}

      <Modal show={settingsOpen} onHide={closeSettings} centered className="cookie-modal" aria-labelledby="cookie-settings-title">
        <Modal.Header closeButton>
          <Modal.Title id="cookie-settings-title">Cookie settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="cookie-modal-intro">
            Pick which kinds of storage we can use. Strictly necessary storage is always on because
            login and these settings depend on it.
          </p>
          <ul className="cookie-options">
            {consentCategories.map((category) => (
              <li key={category.id}>
                <div className="cookie-option-text">
                  {category.required ? (
                    <span className="cookie-option-label">{category.label}</span>
                  ) : (
                    <label htmlFor={`consent-${category.id}`} className="cookie-option-label">{category.label}</label>
                  )}
                  <p id={`consent-${category.id}-desc`}>{category.description}</p>
                </div>
                {category.required ? (
                  <span className="cookie-always-on">Always on</span>
                ) : (
                  <Form.Check
                    type="switch"
                    id={`consent-${category.id}`}
                    checked={draft[category.id]}
                    onChange={(e) => setDraft((prev) => ({ ...prev, [category.id]: e.target.checked }))}
                    aria-describedby={`consent-${category.id}-desc`}
                  />
                )}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={rejectAll}>Reject non-essential</Button>
          <Button variant="outline-primary" onClick={acceptAll}>Accept all</Button>
          <Button variant="primary" onClick={() => save(draft)}>Save choices</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CookieConsent;
