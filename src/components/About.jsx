import React from 'react';
import AboutVisual from './AboutVisual';
import { Cpu, Layers } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-wrap">
          <div>
            <div className="section-index-tag">[ 02 // ABOUT &amp; PHILOSOPHY ]</div>
            <h2 className="section-title">The Analytical Mindset</h2>
          </div>
          <div className="section-subtitle">
            Exploring the balance between strict computational systems and creative algorithmic expression.
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* Left Column: Narrative Content */}
          <div>
            {/* Identity badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 12px',
                backgroundColor: 'rgba(240, 240, 235, 0.04)',
                border: '1px solid var(--border-medium)',
                marginBottom: '24px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: 'var(--accent-primary)',
                }}
              />
              <span
                className="font-mono"
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.06em',
                  color: 'var(--text-primary)',
                }}
              >
                OPERATOR: Raksha Mendon
              </span>
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: '24px',
                lineHeight: 1.3,
              }}
            >
              Designing software as coherent, measurable systems rather than disconnected features.
            </h3>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                color: 'var(--text-secondary)',
                fontSize: '1.02rem',
                lineHeight: 1.7,
              }}
            >
              <p>
                I am a Computer Science student driven by a curiosity about how software interacts with complex data and physical realities. Whether extracting real-time dimensional measurements from steel billets with computer vision or synthesizing multi-parameter orbital telemetry, I enjoy solving problems that demand precision and structured thinking.
              </p>
              <p>
                My technical journey centers on understanding core computing foundations: data structures, algorithmic efficiency, backend service design, and intuitive frontend interfaces. I value practical, testable code over buzzwords, focusing on software that works reliably under constraints.
              </p>
              <p>
                Alongside systems development, I explore creative technology—building generative canvas systems, interactive mathematical visuals, and interfaces that make complex scientific information approachable and engaging.
              </p>
            </div>

            {/* Core Values / Focus Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginTop: '36px',
              }}
            >
              <div
                style={{
                  padding: '20px',
                  backgroundColor: 'rgba(20, 23, 21, 0.6)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ color: 'var(--accent-primary)', marginBottom: '10px' }}>
                  <Layers size={18} />
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                  }}
                >
                  Systematic Engineering
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Clear modularity, type discipline, and clean API boundaries.
                </div>
              </div>

              <div
                style={{
                  padding: '20px',
                  backgroundColor: 'rgba(20, 23, 21, 0.6)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ color: 'var(--accent-primary)', marginBottom: '10px' }}>
                  <Cpu size={18} />
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                  }}
                >
                  Algorithmic Rigor
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Deep intuition for data structures, OpenCV pipelines, and time complexity.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Matrix Visual & Technical Profile */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ width: '100%', height: '360px' }}>
              <AboutVisual />
            </div>

            {/* Technical Parameters Table */}
            <div
              style={{
                backgroundColor: 'rgba(20, 23, 21, 0.6)',
                border: '1px solid var(--border-subtle)',
                padding: '24px',
              }}
            >
              <div
                className="tech-label"
                style={{
                  marginBottom: '16px',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '8px',
                }}
              >
                TECHNICAL PROFILE METADATA
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: '12px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                }}
              >
                <div style={{ color: 'var(--text-tertiary)' }}>ROLE</div>
                <div style={{ color: 'var(--text-primary)' }}>CS Student &amp; Software Developer</div>

                <div style={{ color: 'var(--text-tertiary)' }}>INSTITUTION</div>
                <div style={{ color: 'var(--text-primary)' }}>National Institute of Technology (NIT)</div>

                <div style={{ color: 'var(--text-tertiary)' }}>INTERESTS</div>
                <div style={{ color: 'var(--accent-primary)' }}>
                  Systems, Computer Vision, AI/ML, Cyber Security
                </div>

                <div style={{ color: 'var(--text-tertiary)' }}>PHILOSOPHY</div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  Logic first, functional clarity, generative craft
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .about-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
