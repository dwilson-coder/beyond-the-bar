// src/components/LegalDocument.js
import React from 'react';
import { Container } from 'react-bootstrap';
import PageShell from './PageShell';

const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Renders a legal page from [{ heading, body: [paragraphs] }]
const LegalDocument = ({ title, subtitle, updated, sections }) => (
  <PageShell eyebrow="Legal" title={title} subtitle={subtitle}>
    <Container>
      <div className="legal-layout">
        <nav aria-label="On this page">
          <ul className="legal-toc">
            {sections.map((s) => (
              <li key={s.heading}>
                <a href={`#${slug(s.heading)}`}>{s.heading}</a>
              </li>
            ))}
          </ul>
        </nav>
        <article className="legal-content">
          <span className="legal-updated">Last updated {updated}</span>
          {sections.map((s, idx) => (
            <section key={s.heading} id={slug(s.heading)}>
              <h2>{idx + 1}. {s.heading}</h2>
              {s.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </Container>
  </PageShell>
);

export default LegalDocument;
