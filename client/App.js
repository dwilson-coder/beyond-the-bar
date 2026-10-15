// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import LogoGrid from './components/LogoGrid';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Login from './pages/Login';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';

// ─── ScrollToTop: resets scroll on route change ───
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// ─── HomePage: handles scroll-to-section after nav from other pages ───
const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState({}, document.title);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <LogoGrid />
      <About />
      <Services />
      <Gallery />
      <Pricing />
      <Contact />
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App d-flex flex-column min-vh-100">
        <Routes>
          {/* Home */}
          <Route path="/" element={
            <>
              <NavBar />
              <main className="flex-grow-1">
                <HomePage />
              </main>
              <Footer />
            </>
          } />

          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* Dashboards */}
          <Route path="/dashboard/client" element={<ClientDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />

          {/* Legal */}
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* 404 */}
          <Route path="*" element={
            <div className="p-5 text-center" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h1 className="display-4 fw-bold">404</h1>
              <p className="lead">Page not found.</p>
              <a href="/" className="btn btn-primary mt-3">Go Home</a>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;   