// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import LogoGrid from './components/LogoGrid';
import About from './components/About';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Login from './pages/Login';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CookieConsentProvider } from './context/CookieConsentContext';
import CookieConsent from './components/common/CookieConsent';

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
  const navigate = useNavigate();
  // Package picked in Pricing → prefilled in the quote form
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleSelectPackage = (name) => {
    setSelectedPackage({ name, at: Date.now() });
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
  };

  // ScrollToTop already handles arriving at the top; only act on a requested section.
  // Clear the request through the router (not history.replaceState, which breaks back/forward).
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    navigate(location.pathname, { replace: true, state: null });
  }, [location.state, location.pathname, navigate]);

  return (
    <>
      <Hero />
      <LogoGrid />
      <Services />
      <About />
      <HowItWorks />
      <Pricing onSelect={handleSelectPackage} />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact selectedPackage={selectedPackage} />
    </>
  );
};

function App() {
  return (
    <Router>
      <CookieConsentProvider>
        <AuthProvider>
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

              {/* Dashboards — role-protected */}
              <Route
                path="/dashboard/client"
                element={<ProtectedRoute role="client"><ClientDashboard /></ProtectedRoute>}
              />
              <Route
                path="/dashboard/admin"
                element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
              />

              {/* Legal */}
              <Route path="/terms" element={<TermsOfUse />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <CookieConsent />
        </AuthProvider>
      </CookieConsentProvider>
    </Router>
  );
}

export default App;   