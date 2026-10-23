// src/components/PageShell.js — Navbar + dark page header + footer for standalone pages
import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './Navbar';
import Footer from './Footer';
import './PageShell.css';

const PageShell = ({ eyebrow, title, subtitle, children }) => (
  <div className="page-shell">
    <NavBar />
    <header className="page-header">
      <Container>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </Container>
    </header>
    <main className="page-body">{children}</main>
    <Footer />
  </div>
);

export default PageShell;
