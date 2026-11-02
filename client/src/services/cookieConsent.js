// src/services/cookieConsent.js — visitor's cookie choices, persisted in localStorage
const STORAGE_KEY = 'btb-cookie-consent';
// Bump when categories change so visitors are asked again
const CONSENT_VERSION = 1;

export const CONSENT_EVENT = 'btb:consent-change';

export const consentCategories = [
  {
    id: 'necessary',
    label: 'Strictly necessary',
    description: 'Keep you signed in and remember your cookie choices. The site cannot work without these.',
    required: true,
  },
  {
    id: 'preferences',
    label: 'Preferences',
    description: 'Remember settings like light or dark mode between visits.',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description: 'Help us understand which pages are useful so we can improve the site. Not currently in use.',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Measure ad performance and show relevant offers on other sites. Not currently in use.',
  },
];

export const readConsent = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return stored?.version === CONSENT_VERSION ? stored : null;
  } catch {
    return null;
  }
};

export const saveConsent = ({ preferences = false, analytics = false, marketing = false }) => {
  const consent = {
    version: CONSENT_VERSION,
    necessary: true,
    preferences: Boolean(preferences),
    analytics: Boolean(analytics),
    marketing: Boolean(marketing),
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Storage blocked — choices apply for this page view only
  }

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  return consent;
};

export const hasConsent = (category) => category === 'necessary' || Boolean(readConsent()?.[category]);
