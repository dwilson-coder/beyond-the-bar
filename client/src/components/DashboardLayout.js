// src/components/DashboardLayout.js
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, X, BoxArrowRight, ArrowLeft, Bell } from 'react-bootstrap-icons';
import ThemeToggle from './common/ThemeToggle';
import './DashboardLayout.css';

const initials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/**
 * Shared shell for client + admin dashboards.
 * `sections` drive the sidebar; the active one comes from the URL hash.
 */
const DashboardLayout = ({ role, sections, activeId, title, subtitle, user, actions, children }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // New section → back to the top, close the mobile menu
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [activeId]);

  return (
    <div className="dash-shell">
      <aside className={`dash-sidebar ${menuOpen ? 'is-open' : ''}`} aria-label="Dashboard navigation">
        <div className="sidebar-brand">
          <Link to="/" className="sidebar-logo">
            Beyond <span>the</span> Bar
          </Link>
          <span className="sidebar-role">{role === 'admin' ? 'Admin Console' : 'Client Portal'}</span>
          <button type="button" className="sidebar-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {sections.map((section) => (
            <Link
              key={section.id}
              to={`${location.pathname}#${section.id}`}
              className={`sidebar-link ${activeId === section.id ? 'active' : ''}`}
              aria-current={activeId === section.id ? 'page' : undefined}
            >
              <span className="sidebar-icon">{section.icon}</span>
              <span className="sidebar-label">{section.label}</span>
              {section.badge ? <span className="sidebar-badge">{section.badge}</span> : null}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <span className="avatar">{initials(user.name)}</span>
            <div className="sidebar-user-text">
              <strong>{user.name}</strong>
              <small>{user.email}</small>
            </div>
          </div>
          <Link to="/" className="sidebar-link">
            <span className="sidebar-icon"><ArrowLeft /></span>
            <span className="sidebar-label">Back to site</span>
          </Link>
          <Link to="/login" className="sidebar-link">
            <span className="sidebar-icon"><BoxArrowRight /></span>
            <span className="sidebar-label">Log out</span>
          </Link>
        </div>
      </aside>

      {menuOpen && <div className="dash-backdrop" onClick={() => setMenuOpen(false)} />}

      <div className="dash-main">
        <header className="dash-topbar">
          <button type="button" className="icon-btn dash-menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <List size={20} />
          </button>
          <div className="dash-heading">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <div className="dash-actions">
            {actions}
            <button type="button" className="icon-btn" aria-label="Notifications">
              <Bell size={16} />
              <span className="notify-dot" />
            </button>
            <ThemeToggle className="icon-btn" />
            <span className="avatar avatar-sm d-none d-sm-grid">{initials(user.name)}</span>
          </div>
        </header>

        <main className="dash-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
