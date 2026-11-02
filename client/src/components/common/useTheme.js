// src/components/common/useTheme.js
import { useEffect, useState } from 'react';
import { CONSENT_EVENT, hasConsent } from '../../services/cookieConsent';

const STORAGE_KEY = 'btb-theme';

// The theme is only saved between visits when the visitor allows preference storage
const readSavedTheme = () => {
  if (!hasConsent('preferences')) return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const persistTheme = (theme) => {
  try {
    if (hasConsent('preferences')) localStorage.setItem(STORAGE_KEY, theme);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable (private mode) — theme still applies for this session
  }
};

// Called before React renders so returning visitors don't see a light flash
export const applySavedTheme = () => {
  const saved = readSavedTheme();
  if (saved) document.documentElement.setAttribute('data-theme', saved);
};

const getInitialTheme = () => document.documentElement.getAttribute('data-theme') || readSavedTheme() || 'light';

const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    persistTheme(theme);
  }, [theme]);

  // Save or forget the theme as soon as cookie choices change
  useEffect(() => {
    const onConsentChange = () => persistTheme(document.documentElement.getAttribute('data-theme') || 'light');
    window.addEventListener(CONSENT_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_EVENT, onConsentChange);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return { theme, toggleTheme };
};

export default useTheme;
