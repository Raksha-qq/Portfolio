import React, { useState } from 'react';
import { Mail, ArrowUpRight, Copy, Check, Send, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sentStatus, setSentStatus] = useState(false);

  const contactEmail = 'raks07.2020@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    // Simulate sending transmission
    setSentStatus(true);
    setTimeout(() => {
      // Open mailto fallback
      const subject = encodeURIComponent(`Inquiry from ${formState.name || 'Visitor'}`);
      const body = encodeURIComponent(`${formState.message}\n\nFrom: ${formState.email}`);
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-wrap">
          <div>
            <div className="section-index-tag">[ 04 // INITIATE TRANSMISSION ]</div>
            <h2 className="section-title">Have an interesting problem?</h2>
          </div>
          <div className="section-subtitle">
            Open for software engineering roles, research collaborations, and ambitious technical projects.
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(36px, 6vw, 64px)',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Left Column: Direct Links & Coordinates */}
          <div>
            <h3
              style={{
                fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
                fontWeight: 500,
                color: 'var(--text-primary)',
                marginBottom: '16px',
                lineHeight: 1.3,
              }}
            >
              Let’s build thoughtful, reliable, and intelligent software together.
            </h3>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                lineHeight: 1.65,
                marginBottom: '32px',
                maxWidth: '500px',
              }}
            >
              Whether discussing computer vision algorithms, full-stack API architectures, chemical intelligence platforms, or internship opportunities—my inbox is open.
            </p>

            {/* Quick Email Action Box */}
            <div
              style={{
                display: 'inline-flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 18px',
                backgroundColor: 'rgba(20, 23, 21, 0.8)',
                border: '1px solid var(--border-medium)',
                marginBottom: '36px',
              }}
            >
              <a
                href={`mailto:${contactEmail}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
                title="Send email to raks07.2020@gmail.com"
              >
                <Mail size={16} style={{ color: 'var(--accent-primary)' }} />
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.86rem',
                    color: 'var(--text-primary)',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  {contactEmail}
                </span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  backgroundColor: copied
                    ? 'rgba(197, 255, 72, 0.2)'
                    : 'rgba(240, 240, 235, 0.08)',
                  border: '1px solid var(--border-subtle)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: copied ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
                aria-label="Copy email address"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            {/* External Links */}
            <div>
              <div
                className="tech-label"
                style={{
                  marginBottom: '16px',
                  color: 'var(--text-tertiary)',
                }}
              >
                VERIFIED NETWORK CHANNELS
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                  href="https://github.com/Raksha-qq"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    backgroundColor: 'rgba(20, 23, 21, 0.5)',
                    border: '1px solid var(--border-subtle)',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <GithubIcon size={18} style={{ color: 'var(--text-primary)' }} />
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.9rem',
                          color: 'var(--text-primary)',
                          fontWeight: 500,
                        }}
                      >
                        GitHub
                      </div>
                      <div
                        className="font-mono"
                        style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}
                      >
                        github.com/Raksha-qq
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} style={{ color: 'var(--accent-primary)' }} />
                </a>

                <a
                  href="https://www.linkedin.com/in/raksha-mendon"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    backgroundColor: 'rgba(20, 23, 21, 0.5)',
                    border: '1px solid var(--border-subtle)',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <LinkedinIcon size={18} style={{ color: 'var(--text-primary)' }} />
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.9rem',
                          color: 'var(--text-primary)',
                          fontWeight: 500,
                        }}
                      >
                        LinkedIn
                      </div>
                      <div
                        className="font-mono"
                        style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}
                      >
                        linkedin.com/in/raksha-mendon
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} style={{ color: 'var(--accent-primary)' }} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Communication Terminal */}
          <div
            style={{
              backgroundColor: 'rgba(20, 23, 21, 0.85)',
              border: '1px solid var(--border-medium)',
              padding: 'clamp(24px, 4vw, 36px)',
              position: 'relative',
            }}
          >
            {/* Terminal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '16px',
                marginBottom: '24px',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={14} style={{ color: 'var(--accent-primary)' }} />
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-primary)',
                    letterSpacing: '0.08em',
                  }}
                >
                  DISPATCH_TERMINAL.SH
                </span>
              </div>

              <span
                className="font-mono"
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--accent-primary)',
                }}
              >
                CHANNEL_SECURE
              </span>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label
                  htmlFor="contact-name"
                  className="font-mono"
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '8px',
                    letterSpacing: '0.06em',
                  }}
                >
                  // SENDER IDENTITY
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your Name / Organization"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(16, 18, 17, 0.8)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    borderRadius: '1px',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="font-mono"
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '8px',
                    letterSpacing: '0.06em',
                  }}
                >
                  // RETURN ENDPOINT *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="email@domain.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(16, 18, 17, 0.8)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    borderRadius: '1px',
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="font-mono"
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '8px',
                    letterSpacing: '0.06em',
                  }}
                >
                  // MESSAGE PAYLOAD *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Briefly describe the inquiry, project scope, or opportunity..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(16, 18, 17, 0.8)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    borderRadius: '1px',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: '8px',
                }}
              >
                <span>{sentStatus ? 'ROUTING DISPATCH...' : 'TRANSMIT MESSAGE'}</span>
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
