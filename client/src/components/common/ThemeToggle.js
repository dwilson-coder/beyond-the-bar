// src/components/common/ThemeToggle.js
import React from 'react';
import { Moon, Sun } from 'react-bootstrap-icons';
import useTheme from './useTheme';

const ThemeToggle = ({ className = 'theme-toggle' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={className}
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
};

export default ThemeToggle;
