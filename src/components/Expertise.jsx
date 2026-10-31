import React, { useState } from 'react';
import { Layout, Server, Wrench, Sparkles, Binary } from 'lucide-react';

export default function Expertise() {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const categories = [
    {
      id: 'languages',
      title: 'Programming Languages',
      icon: <Binary size={16} />,
      status: 'CORE_STACK',
      skills: [
        {
          name: 'C++',
          context: 'Object-oriented programming, memory management, pointers, and performance-critical DSA problem solving.',
          tag: 'Systems',
        },
        {
          name: 'Python',
          context: 'Primary language for computer vision (OpenCV), backend web services (FastAPI), and scientific computing.',
          tag: 'Backend & CV',
        },
        {
          name: 'JavaScript (ES6+)',
          context: 'Modern web scripting, asynchronous event loops, DOM manipulation, and interactive Canvas engines.',
          tag: 'Web',
        },
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend Engineering',
      icon: <Layout size={16} />,
      status: 'PRODUCTION',
      skills: [
        {
          name: 'React',
          context: 'Component-driven user interfaces, state management, custom lifecycle hooks, and high-performance canvas integrations.',
          tag: 'UI Framework',
        },
        {
          name: 'HTML5',
          context: 'Semantic markup, accessible structure (WCAG standards), canvas graphics, and SEO metadata.',
          tag: 'Structure',
        },
        {
          name: 'CSS3 / Modern CSS',
          context: 'CSS Grid, Flexbox, custom properties, responsive viewports, and hardware-accelerated animations.',
          tag: 'Design System',
        },
      ],
    },
    {
      id: 'backend',
      title: 'Backend & API Systems',
      icon: <Server size={16} />,
      status: 'PRODUCTION',
      skills: [
        {
          name: 'FastAPI',
          context: 'Asynchronous Python framework used in ChemScope and T-Minus for rapid REST API endpoints and data serialization.',
          tag: 'Web Framework',
        },
        {
          name: 'REST APIs',
          context: 'Designing and consuming HTTP/JSON interfaces, third-party data pipelines (PubChem, Space Devs LL2).',
          tag: 'Integration',
        },
      ],
    },
    {
      id: 'tools',
      title: 'Tools & Applied Foundations',
      icon: <Wrench size={16} />,
      status: 'ACTIVE_FOUNDATION',
      skills: [
        {
          name: 'Computer Vision',
          context: 'Optical dimension measurement, edge detection, contour analysis, and OCR for industrial inspection pipelines.',
          tag: 'Specialized',
        },
        {
          name: 'Data Structures & Algorithms',
          context: 'Algorithmic efficiency, time & space complexity analysis, graph traversals, and dynamic programming.',
          tag: 'Core CS',
        },
        {
          name: 'Git & GitHub',
          context: 'Version control, atomic commits, repository workflows, branch management, and collaborative code reviews.',
          tag: 'Workflow',
        },
      ],
    },
    {
      id: 'learning',
      title: 'Active Learning & Research Interests',
      icon: <Sparkles size={16} />,
      status: 'EXPLORATION',
      isLearning: true,
      skills: [
        {
          name: 'Artificial Intelligence & Machine Learning',
          context: 'Exploring neural network architectures, CNNs, image classification models, and transfer learning workflows.',
          tag: 'Research Area',
        },
        {
          name: 'Cybersecurity',
          context: 'Studying defensive security principles, network protocols, secure software design, and cryptographic systems.',
          tag: 'Research Area',
        },
      ],
    },
  ];

  const activeSkillDetails = selectedSkill || categories[0].skills[0];

  return (
    <section id="expertise" className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-wrap">
          <div>
            <div className="section-index-tag">[ 03 // TECHNICAL EXPERTISE ]</div>
            <h2 className="section-title">Capabilities &amp; Stack</h2>
          </div>
          <div className="section-subtitle">
            Grounded in core computational foundations and practical web architectures, with active research into intelligent and secure systems.
          </div>
        </div>

        {/* Categories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={{
                backgroundColor: cat.isLearning
                  ? 'rgba(197, 255, 72, 0.02)'
                  : 'rgba(20, 23, 21, 0.65)',
                border: cat.isLearning
                  ? '1px dashed var(--accent-primary-border)'
                  : '1px solid var(--border-subtle)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color var(--transition-fast)',
              }}
            >
              {/* Category Header */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: cat.isLearning ? 'var(--accent-primary)' : 'var(--text-primary)',
                    }}
                  >
                    {cat.icon}
                    <h3
                      style={{
                        fontSize: '0.92rem',
                        fontWeight: 500,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {cat.title}
                    </h3>
                  </div>

                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.08em',
                      color: cat.isLearning ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                      padding: '2px 6px',
                      background: 'rgba(240, 240, 235, 0.04)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {cat.status}
                  </span>
                </div>

                {/* Skills Interactive List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {cat.skills.map((skill) => {
                    const isSelected = activeSkillDetails.name === skill.name;
                    return (
                      <div
                        key={skill.name}
                        onClick={() => setSelectedSkill(skill)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          backgroundColor: isSelected
                            ? 'rgba(197, 255, 72, 0.08)'
                            : 'rgba(240, 240, 235, 0.02)',
                          border: isSelected
                            ? '1px solid var(--accent-primary)'
                            : '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span
                            style={{
                              width: '5px',
                              height: '5px',
                              backgroundColor: isSelected
                                ? 'var(--accent-primary)'
                                : 'var(--text-tertiary)',
                            }}
                          />
                          <span
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: '0.9rem',
                              color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)',
                              fontWeight: 500,
                            }}
                          >
                            {skill.name}
                          </span>
                        </div>

                        <span
                          className="font-mono"
                          style={{
                            fontSize: '0.68rem',
                            color: 'var(--text-tertiary)',
                          }}
                        >
                          {skill.tag}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {cat.isLearning && (
                <div
                  className="font-mono"
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-secondary)',
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: '1px dashed var(--border-subtle)',
                  }}
                >
                  * Clearly designated as learning and research domains.
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Skill Inspector Bar */}
        <div
          style={{
            padding: '24px',
            backgroundColor: 'rgba(16, 18, 17, 0.9)',
            border: '1px solid var(--accent-primary-border)',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '16px',
            alignItems: 'center',
          }}
          className="inspector-wrap"
        >
          <div>
            <div
              className="tech-label"
              style={{
                color: 'var(--accent-primary)',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>INSPECTOR // ACTIVE MODULE :</span>
              <span style={{ color: 'var(--text-primary)', textTransform: 'none' }}>
                {activeSkillDetails.name}
              </span>
            </div>

            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {activeSkillDetails.context}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
