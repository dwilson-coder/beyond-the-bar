// src/components/common/useTheme.js
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'btb-theme';

// Prefer the theme already applied this session, then the saved one
const getInitialTheme = () => {
  const applied = document.documentElement.getAttribute('data-theme');
  if (applied) return applied;
  try {
    return localStorage.getItem(STORAGE_KEY) || 'light';
  } catch {
    return 'light';
  }
};

const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage unavailable (private mode) — theme still applies for this session
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return { theme, toggleTheme };
};

export default useTheme;
