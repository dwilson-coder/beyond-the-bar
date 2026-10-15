// src/components/DashboardLayout.js
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import {
  Calendar, CreditCard, Envelope, People,
  Shield, Gear, Person, Lock, XCircle
} from 'react-bootstrap-icons';
import './DashboardLayout.css';

const clientMenu = [
  { icon: <Calendar />, label: "Reservations", path: "/dashboard/client" },
  { icon: <CreditCard />, label: "Payments", path: "/dashboard/client#payments" },
  { icon: <Envelope />, label: "Messages", path: "/dashboard/client#messages" },
  { icon: <People />, label: "Points of Contact", path: "/dashboard/client#contacts" },
  { icon: <Lock />, label: "Change Password", path: "/dashboard/client#password" },
  { icon: <XCircle />, label: "Close Account", path: "/dashboard/client#close" },
];

const adminMenu = [
  { icon: <People />, label: "User Accounts", path: "/dashboard/admin#users" },
  { icon: <Calendar />, label: "Reservations", path: "/dashboard/admin#reservations" },
  { icon: <CreditCard />, label: "Payments & Refunds", path: "/dashboard/admin#payments" },
  { icon: <Envelope />, label: "Messages", path: "/dashboard/admin#messages" },
  { icon: <Person />, label: "Contact Requests", path: "/dashboard/admin#contacts" },
  { icon: <Lock />, label: "Password Requests", path: "/dashboard/admin#passwords" },
  { icon: <XCircle />, label: "Close Requests", path: "/dashboard/admin#close" },
];

const DashboardLayout = ({ role, children }) => {
  const location = useLocation();
  const menu = role === 'admin' ? adminMenu : clientMenu;

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="sidebar-brand">
          <span className="brand-text">BEYOND THE BAR</span>
          <span className="brand-role">{role.toUpperCase()}</span>
        </div>
        <Nav className="flex-column sidebar-nav">
          {menu.map((item, idx) => (
            <Nav.Item key={idx}>
              <Link
                to={item.path}
                className={`sidebar-link ${location.hash === item.path.split('#')[1] ? 'active' : ''}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </Link>
            </Nav.Item>
          ))}
        </Nav>
        <div className="sidebar-footer">
          <Link to="/" className="sidebar-link">
            <span className="sidebar-icon">←</span>
            <span className="sidebar-label">Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dash-main">
        <div className="dash-topbar">
          <h4 className="fw-bold mb-0">
            {role === 'admin' ? 'Admin Dashboard' : 'Client Dashboard'}
          </h4>
          <Link to="/" className="btn btn-sm btn-outline-secondary">Exit</Link>
        </div>
        <div className="dash-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;   