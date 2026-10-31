import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = ['contact', 'expertise', 'about', 'work'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(section);
          return;
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Expertise', href: '#expertise', id: 'expertise' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: isScrolled
          ? 'rgba(16, 18, 17, 0.88)'
          : 'rgba(16, 18, 17, 0.45)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: isScrolled
          ? '1px solid var(--border-medium)'
          : '1px solid var(--border-subtle)',
        transition: 'all var(--transition-normal)',
      }}
    >
      <div
        className="container"
        style={{
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand identity: R / SYSTEMS */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
          }}
          aria-label="R / SYSTEMS home"
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--accent-primary)',
              borderRadius: '1px',
              boxShadow: '0 0 10px var(--accent-primary)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '1.05rem',
              letterSpacing: '0.04em',
              color: 'var(--text-primary)',
            }}
          >
            R <span style={{ color: 'var(--accent-primary)', margin: '0 4px' }}>/</span> SYSTEMS
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: '0.68rem',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.08em',
              padding: '2px 6px',
              border: '1px solid var(--border-subtle)',
              borderRadius: '2px',
              display: 'none',
            }}
          >
            SYS.DEV
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '32px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link, idx) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.06em',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 4px',
                  position: 'relative',
                  transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isActive
                    ? 'var(--accent-primary)'
                    : 'var(--text-secondary)';
                }}
              >
                <span
                  style={{
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                    fontSize: '0.72rem',
                  }}
                >
                  0{idx + 1}.
                </span>
                {link.label}
              </a>
            );
          })}

          <a
            href="#contact"
            className="btn-ghost"
            style={{
              padding: '8px 16px',
              fontSize: '0.78rem',
            }}
          >
            <span>Connect</span>
            <ArrowUpRight size={14} />
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            border: '1px solid var(--border-medium)',
            color: 'var(--text-primary)',
          }}
          className="mobile-nav-toggle"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'rgba(16, 18, 17, 0.98)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
          className="mobile-dropdown"
        >
          {navLinks.map((link, idx) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                color: activeSection === link.id ? 'var(--accent-primary)' : 'var(--text-primary)',
                padding: '10px 0',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{link.label}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                [ 0{idx + 1} ]
              </span>
            </a>
          ))}
          <div style={{ paddingTop: '12px' }}>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Initialize Contact</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
          .mobile-dropdown {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
