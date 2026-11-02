// src/context/CookieConsentContext.js — consent state + banner/settings visibility
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { readConsent, saveConsent } from '../services/cookieConsent';

const CookieConsentContext = createContext(null);

export const CookieConsentProvider = ({ children }) => {
  const [consent, setConsent] = useState(readConsent);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const save = useCallback((choices) => {
    setConsent(saveConsent(choices));
    setSettingsOpen(false);
  }, []);

  const acceptAll = useCallback(() => save({ preferences: true, analytics: true, marketing: true }), [save]);
  const rejectAll = useCallback(() => save({}), [save]);
  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  const value = useMemo(
    () => ({
      consent,
      // First visit (or outdated choices) → show the banner until the visitor decides
      bannerVisible: !consent,
      settingsOpen,
      save,
      acceptAll,
      rejectAll,
      openSettings,
      closeSettings,
    }),
    [consent, settingsOpen, save, acceptAll, rejectAll, openSettings, closeSettings]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) throw new Error('useCookieConsent must be used inside <CookieConsentProvider>.');
  return context;
};
