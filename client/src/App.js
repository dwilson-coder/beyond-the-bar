// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
  // Package picked in Pricing → prefilled in the quote form
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleSelectPackage = (name) => {
    setSelectedPackage({ name, at: Date.now() });
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
  };

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;   