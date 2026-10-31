import React, { useState, useEffect } from 'react';
import { ArrowDown, Terminal } from 'lucide-react';

export default function Hero() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toISOString().substring(11, 19) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'calc(var(--nav-height) + 40px)',
        paddingBottom: '60px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="container" style={{ position: 'relative' }}>
        {/* Top Technical Metadata Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '32px',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span className="tech-label tech-label-accent">
              <span className="status-dot animate-pulse-dot" />
              R / SYSTEMS : KERNEL v2.6
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.08em',
              }}
            >
              COMPUTER SCIENCE / CREATIVE TECHNOLOGY
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="status-pill">
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#c5ff48',
                }}
              />
              <span>SYSTEM STATUS: OPERATIONAL</span>
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.05em',
              }}
            >
              {currentTime || '00:00:00 UTC'}
            </div>
          </div>
        </div>

        {/* Main Editorial Hero Typography */}
        <div style={{ maxWidth: '980px', marginTop: '20px' }}>
          <div
            className="tech-label"
            style={{
              marginBottom: '20px',
              color: 'var(--accent-primary)',
            }}
          >
            [ STATEMENT // 00 ]
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.6rem, 5.8vw, 5.2rem)',
              lineHeight: 1.05,
              fontWeight: 500,
              letterSpacing: '-0.04em',
              marginBottom: '32px',
              color: 'var(--text-primary)',
            }}
          >
            Curiosity is a form of{' '}
            <span
              style={{
                color: 'var(--accent-primary)',
                fontStyle: 'normal',
                position: 'relative',
                display: 'inline-block',
              }}
            >
              creation.
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              marginBottom: '44px',
              fontWeight: 400,
            }}
          >
            Computer Science student exploring software, intelligent systems, and creative technology. Building practical, production-grounded systems with technical precision and generative elegance.
          </p>

          {/* Action Triggers */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <a href="#work" className="btn-primary">
              <span>View Selected Systems</span>
              <ArrowDown size={14} />
            </a>

            <a href="#about" className="btn-ghost">
              <Terminal size={14} />
              <span>System Architecture &amp; About</span>
            </a>
          </div>
        </div>

        {/* Hero Telemetry & Coordinate Strip */}
        <div
          style={{
            marginTop: 'clamp(64px, 12vh, 120px)',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}
        >
          <div>
            <div className="tech-label" style={{ marginBottom: '6px' }}>
              PRIMARY DOMAIN
            </div>
            <div
              className="font-mono"
              style={{ fontSize: '0.86rem', color: 'var(--text-primary)' }}
            >
              Computer Vision &amp; Systems
            </div>
          </div>

          <div>
            <div className="tech-label" style={{ marginBottom: '6px' }}>
              CURRENT FOCUS
            </div>
            <div
              className="font-mono"
              style={{ fontSize: '0.86rem', color: 'var(--text-primary)' }}
            >
              Intelligent Software &amp; Full-Stack
            </div>
          </div>

          <div>
            <div className="tech-label" style={{ marginBottom: '6px' }}>
              METHODOLOGY
            </div>
            <div
              className="font-mono"
              style={{ fontSize: '0.86rem', color: 'var(--text-primary)' }}
            >
              Algorithmic Rigor + Generative Craft
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '12px',
            }}
          >
            <a
              href="#work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.08em',
              }}
              aria-label="Scroll to projects"
            >
              <span>SCROLL TO PROCEED</span>
              <ArrowDown size={12} className="animate-pulse-dot" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
