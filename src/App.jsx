import React from 'react';
import GenerativeBackground from './components/GenerativeBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Expertise from './components/Expertise';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="portfolio-app" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* 1. Signature Generative Visual Engine */}
      <GenerativeBackground />

      {/* 2. Micro Grid Architecture Overlay */}
      <div className="bg-grid-overlay" aria-hidden="true" />

      {/* 3. Global Minimal Navigation */}
      <Navbar />

      {/* 4. Core Editorial Sections */}
      <main id="main-content">
        <Hero />
        <Projects />
        <About />
        <Expertise />
        <Contact />
      </main>

      {/* 5. Minimal Technical Footer */}
      <Footer />
    </div>
  );
}
