import React from 'react';
import { ExternalLink, Terminal } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectItem({ project, index }) {
  const isEven = index % 2 === 1;

  return (
    <article
      id={`project-${project.id}`}
      style={{
        paddingTop: index === 0 ? '0px' : 'clamp(48px, 8vh, 80px)',
        paddingBottom: 'clamp(48px, 8vh, 80px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'center',
        }}
        className={`project-grid ${isEven ? 'project-grid-reverse' : ''}`}
      >
        {/* Project Information Side */}
        <div className="project-info">
          {/* Header metadata tag */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: '0.85rem',
                color: 'var(--accent-primary)',
                fontWeight: 500,
                letterSpacing: '0.08em',
              }}
            >
              // {project.num}
            </span>
            <span
              style={{
                width: '32px',
                height: '1px',
                backgroundColor: 'var(--border-medium)',
              }}
            />
            <span className="tech-label" style={{ color: 'var(--text-secondary)' }}>
              {project.category}
            </span>
          </div>

          <h3
            style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: '18px',
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              marginBottom: '24px',
              maxWidth: '560px',
            }}
          >
            {project.description}
          </p>

          {/* Capabilities / Highlights */}
          <div style={{ marginBottom: '28px' }}>
            <div
              className="tech-label"
              style={{
                fontSize: '0.68rem',
                marginBottom: '12px',
                color: 'var(--text-tertiary)',
              }}
            >
              SYSTEM CAPABILITIES
            </div>
            <ul
              style={{
                listStyle: 'none',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '8px',
              }}
            >
              {project.capabilities.map((cap, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      backgroundColor: 'var(--accent-primary)',
                    }}
                  />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology stack tags */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '32px',
            }}
          >
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="font-mono"
                style={{
                  fontSize: '0.72rem',
                  padding: '3px 9px',
                  background: 'rgba(240, 240, 235, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  borderRadius: '1px',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                aria-label={`Open live deployment for ${project.title}`}
              >
                <span>Live Deployment</span>
                <ExternalLink size={14} />
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                aria-label={`Open GitHub repository for ${project.title}`}
              >
                <GithubIcon size={14} />
                <span>Source Repository</span>
              </a>
            )}

            {project.isResearch && (
              <div
                className="font-mono"
                style={{
                  fontSize: '0.74rem',
                  color: 'var(--text-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  border: '1px dashed var(--border-medium)',
                }}
              >
                <Terminal size={12} />
                <span>Academic &amp; Industrial Vision Pipeline</span>
              </div>
            )}
          </div>
        </div>

        {/* Visual Simulation Canvas Side */}
        <div
          className="project-visual-wrapper"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 11',
            minHeight: '340px',
            boxShadow: '0 20px 40px -20px rgba(0, 0, 0, 0.8)',
          }}
        >
          {project.visualComponent}
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .project-grid {
            grid-template-columns: 1fr 1.15fr !important;
          }
          .project-grid-reverse {
            grid-template-columns: 1.15fr 1fr !important;
          }
          .project-grid-reverse .project-info {
            order: 2;
          }
          .project-grid-reverse .project-visual-wrapper {
            order: 1;
          }
        }
      `}</style>
    </article>
  );
}
