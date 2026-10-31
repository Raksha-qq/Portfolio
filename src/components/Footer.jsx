import React from 'react';
import { ArrowUp } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: '#0c0e0d',
        padding: '48px 0 36px 0',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          {/* Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--accent-primary)',
                borderRadius: '1px',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '1rem',
                letterSpacing: '0.04em',
                color: 'var(--text-primary)',
              }}
            >
              R <span style={{ color: 'var(--accent-primary)' }}>/</span> SYSTEMS
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.06em',
              }}
            >
              // TECHNICAL MINIMALISM
            </span>
          </div>

          {/* Coordinates & System Status */}
          <div
            className="font-mono"
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <span>LOC: 22.2570° N, 84.9010° E</span>
            <span>•</span>
            <span style={{ color: 'var(--accent-primary)' }}>SYS: OPTIMAL</span>
          </div>

          {/* Return to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="btn-ghost"
            style={{
              padding: '6px 14px',
              fontSize: '0.75rem',
            }}
            aria-label="Back to top"
          >
            <span>RETURN TO APEX</span>
            <ArrowUp size={12} />
          </button>
        </div>

        {/* Bottom copyright line */}
        <div
          style={{
            borderTop: '1px solid rgba(240, 240, 235, 0.04)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-tertiary)',
          }}
        >
          <div>
            © {CURRENT_YEAR} R / SYSTEMS. Designed and engineered with technical precision.
          </div>
          <div>
            REACT 19 • VITE • CUSTOM CANVAS ENGINE • ZERO FRAMEWORK BLOAT
          </div>
        </div>
      </div>
    </footer>
  );
}
