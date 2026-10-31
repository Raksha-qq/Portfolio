import React, { useState } from 'react';
import ProjectItem from './ProjectItem';
import BilletVisionVisual from './project-visuals/BilletVisionVisual';
import ChemScopeVisual from './project-visuals/ChemScopeVisual';
import TMinusVisual from './project-visuals/TMinusVisual';
import DigitLocalizeVisual from './project-visuals/DigitLocalizeVisual';
import BlockCertVisual from './project-visuals/BlockCertVisual';
import HeadlineIQVisual from './project-visuals/HeadlineIQVisual';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 'billetvision',
      num: '01',
      title: 'BilletVision',
      domain: 'cv_ai',
      category: 'Computer Vision / Industrial Automation',
      description:
        'An automated billet inspection and traceability system designed to inspect steel billets using computer vision. Engineered to perform non-contact dimension measurement, shape and defect-related geometric analysis, and OCR code identification in real-time industrial inspection workflows.',
      capabilities: [
        'Non-contact optical inspection',
        'Dimension measurement & tolerance verification',
        'Shape & defect-related geometric analysis',
        'OCR and identification of billet heat codes',
        'Inspection logging and audit traceability',
      ],
      technologies: ['Python', 'OpenCV', 'Computer Vision', 'OCR Engine', 'NumPy'],
      repoUrl: 'https://github.com/Raksha-qq',
      isResearch: true,
      visualComponent: <BilletVisionVisual />,
    },
    {
      id: 'chemscope',
      num: '02',
      title: 'ChemScope',
      domain: 'systems',
      category: 'Molecular Intelligence / Web Platform',
      description:
        'An interactive chemical information and visualization platform powered by the PubChem database. Built with a decoupled React frontend and FastAPI backend to deliver synchronous chemical compound retrieval, molecular graph visualizations, and property exploration.',
      capabilities: [
        'Interactive 2D/3D molecular graph rendering',
        'PubChem PUG REST API integration pipeline',
        'Chemical formula & molecular weight analysis',
        'Compound search with structural metadata',
        'FastAPI backend caching & query handling',
      ],
      technologies: ['React', 'FastAPI', 'Python', 'PubChem PUG REST API', 'Vite'],
      repoUrl: 'https://github.com/Raksha-qq/ChemScope',
      liveUrl: 'https://chemscope-frontend.vercel.app',
      visualComponent: <ChemScopeVisual />,
    },
    {
      id: 't-minus',
      num: '03',
      title: 'T-Minus',
      domain: 'systems',
      category: 'Aerospace Data / Mission Control',
      description:
        'An aerospace launch intelligence dashboard that retrieves and presents worldwide rocket launch schedules, mission profiles, and orbital trajectories. Integrates the Space Devs Launch Library 2 API with an interactive mission-control interface.',
      capabilities: [
        'Space Devs Launch Library 2 API ingestion',
        'Mission countdown & live schedule telemetry',
        'Launch vehicle specs & payload breakdowns',
        'Orbital insertion & launch site coordinate mapping',
        'Responsive telemetry dashboard UI',
      ],
      technologies: ['React', 'FastAPI', 'Python', 'Space Devs LL2 API', 'Vite'],
      repoUrl: 'https://github.com/Raksha-qq/T-minus',
      liveUrl: 'https://t-minus-one.vercel.app',
      visualComponent: <TMinusVisual />,
    },
    {
      id: 'digitlocalize',
      num: '04',
      title: 'DigitLocalize AI',
      domain: 'cv_ai',
      category: 'Computer Vision / Deep Learning',
      description:
        'A convolutional neural network architecture engineered to jointly solve handwritten digit classification (0-9) and continuous bounding-box spatial localization. Trained end-to-end as a multi-output Keras model on expanded coordinate canvases.',
      capabilities: [
        'Multi-output CNN architecture (Classification + Regression)',
        'Simultaneous class inference & bounding box localization',
        'Intersection-over-Union (IoU) evaluation metric pipeline',
        'Synthetic coordinate translation & canvas data augmentation',
        'Dual-loss balancing (Categorical Cross-Entropy + MSE)',
      ],
      technologies: ['Python', 'TensorFlow', 'Keras', 'Computer Vision', 'NumPy'],
      repoUrl: 'https://github.com/Raksha-qq/DigitLocalize-AI',
      visualComponent: <DigitLocalizeVisual />,
    },
    {
      id: 'blockcert',
      num: '05',
      title: 'BlockCert',
      domain: 'crypto_nlp',
      category: 'Cryptography / Decentralized Verification',
      description:
        'An end-to-end cryptographic platform for issuing, versioning, revoking, and independently verifying academic credentials. Combines Ed25519 asymmetric key signatures with tamper-evident SHA-256 hash chains for decentralized integrity verification.',
      capabilities: [
        'Ed25519 digital signature generation & verification',
        'SHA-256 tamper-evident hash chain ledger',
        'Decentralized independent credential proof validation',
        'Canonical JSON serialization & deterministic hashing',
        'Institutional revocation and versioning audit trails',
      ],
      technologies: ['Cryptography', 'Ed25519', 'SHA-256', 'Python', 'Distributed Systems'],
      repoUrl: 'https://github.com/Raksha-qq/BlockCert',
      visualComponent: <BlockCertVisual />,
    },
    {
      id: 'headlineiq',
      num: '06',
      title: 'HeadlineIQ',
      domain: 'crypto_nlp',
      category: 'Natural Language Processing / Transfer Learning',
      description:
        'A transfer-learning NLP system for real-time news topic classification. Ingests high-dimensional sentence embeddings from Google’s Universal Sentence Encoder (USE) into a fine-tuned classification head, achieving 88.75% test accuracy on the AG News benchmark.',
      capabilities: [
        'Google Universal Sentence Encoder 512-dim embeddings',
        'Real-time multi-class topic inference across 4 domains',
        '88.75% test accuracy on AG News benchmark dataset',
        'Transfer learning with fine-tuned dense classification head',
        'TFDS automated preprocessing and vectorization pipeline',
      ],
      technologies: ['Python', 'TensorFlow', 'TF Hub', 'USE', 'NLP', 'TFDS'],
      repoUrl: 'https://github.com/Raksha-qq/Headline_IQ',
      visualComponent: <HeadlineIQVisual />,
    },
  ];

  const additionalRepos = [
    {
      title: 'PetVision AI',
      category: 'Deep Learning / Transfer Learning',
      description:
        'Multi-breed cat and dog recognition system built with ResNet50 pretrained on ImageNet. Classifies across 23 distinct breeds with 86.85% test accuracy.',
      tags: ['ResNet50', 'ImageNet', 'Transfer Learning', 'Python'],
      repoUrl: 'https://github.com/Raksha-qq/PetVision',
    },
    {
      title: 'VisionMark / DeepLandmark',
      category: 'Computer Vision / CNN Classification',
      description:
        'Global landmark classification system utilizing VGG19 transfer learning on the Google Landmarks Dataset v2 (GLDv2) for photographic site identification.',
      tags: ['VGG19', 'Google Landmarks v2', 'Computer Vision', 'Keras'],
      repoUrl: 'https://github.com/Raksha-qq/Deep_Landmark',
    },
    {
      title: 'ChatBot Demo & Deployment',
      category: 'Frontend Engineering / React',
      description:
        'Component-driven conversational interface built in React exploring asynchronous state handling, responsive messaging layouts, and edge cloud deployment.',
      tags: ['React', 'JavaScript', 'CSS3', 'Vercel CI/CD'],
      repoUrl: 'https://github.com/Raksha-qq/ChatBot_2_Vercel_Check',
    },
    {
      title: 'WebWiz Interactive Gallery',
      category: 'Creative Web / Design Systems',
      description:
        'Visual exhibition platform featuring responsive CSS Grid arrangements, interactive art galleries, and modern client-side scripting.',
      tags: ['HTML5', 'CSS Grid', 'JavaScript', 'UI Design'],
      repoUrl: 'https://github.com/Raksha-qq/WebWiz-Induction-Proj',
    },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.domain === activeFilter);

  const filters = [
    { id: 'all', label: 'All Featured Systems', count: projects.length },
    { id: 'cv_ai', label: 'Computer Vision & AI', count: projects.filter((p) => p.domain === 'cv_ai').length },
    { id: 'systems', label: 'Full-Stack & Systems', count: projects.filter((p) => p.domain === 'systems').length },
    { id: 'crypto_nlp', label: 'Cryptography & NLP', count: projects.filter((p) => p.domain === 'crypto_nlp').length },
  ];

  return (
    <section id="work" className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Editorial Section Header */}
        <div className="section-header-wrap">
          <div>
            <div className="section-index-tag">[ 01 // SELECTED WORK ]</div>
            <h2 className="section-title">Engineered Systems</h2>
          </div>
          <div className="section-subtitle">
            Six practical software architectures spanning computer vision pipelines, biochemical intelligence platforms, aerospace telemetry, deep learning, and cryptographic ledgers.
          </div>
        </div>

        {/* Interactive Domain Filter Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '40px',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '16px',
          }}
        >
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  letterSpacing: '0.06em',
                  padding: '6px 14px',
                  backgroundColor: isActive ? 'var(--accent-primary-dim)' : 'transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: isActive
                    ? '1px solid var(--accent-primary)'
                    : '1px solid var(--border-subtle)',
                  borderRadius: '1px',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{f.label}</span>
                <span
                  style={{
                    fontSize: '0.68rem',
                    opacity: 0.7,
                    padding: '1px 5px',
                    backgroundColor: isActive ? 'rgba(197, 255, 72, 0.2)' : 'rgba(240, 240, 235, 0.05)',
                  }}
                >
                  0{f.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Showcase List */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredProjects.map((project, idx) => (
            <ProjectItem key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* Additional Open-Source & Research Repositories Section */}
        <div style={{ marginTop: 'clamp(64px, 10vh, 100px)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '28px',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div>
              <div className="tech-label" style={{ color: 'var(--accent-primary)', marginBottom: '4px' }}>
                [ ARCHIVE // ACTIVE REPOSITORIES ]
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                }}
              >
                Additional Research &amp; Open-Source Projects
              </h3>
            </div>
            <a
              href="https://github.com/Raksha-qq?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ fontSize: '0.76rem', padding: '8px 14px' }}
            >
              <GithubIcon size={14} />
              <span>Explore All on GitHub</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {additionalRepos.map((repo, idx) => (
              <a
                key={idx}
                href={repo.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '24px',
                  backgroundColor: 'rgba(20, 23, 21, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <span className="tech-label" style={{ fontSize: '0.66rem' }}>
                      {repo.category}
                    </span>
                    <ArrowUpRight size={14} style={{ color: 'var(--accent-primary)' }} />
                  </div>

                  <h4
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.15rem',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      marginBottom: '10px',
                    }}
                  >
                    {repo.title}
                  </h4>

                  <p
                    style={{
                      fontSize: '0.86rem',
                      lineHeight: 1.55,
                      color: 'var(--text-secondary)',
                      marginBottom: '18px',
                    }}
                  >
                    {repo.description}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {repo.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono"
                      style={{
                        fontSize: '0.68rem',
                        padding: '2px 8px',
                        backgroundColor: 'rgba(240, 240, 235, 0.04)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
