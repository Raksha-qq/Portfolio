import React from 'react';
import ProjectItem from './ProjectItem';
import BilletVisionVisual from './project-visuals/BilletVisionVisual';
import ChemScopeVisual from './project-visuals/ChemScopeVisual';
import TMinusVisual from './project-visuals/TMinusVisual';

export default function Projects() {
  const projects = [
    {
      id: 'billetvision',
      num: '01',
      title: 'BilletVision',
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
      category: 'Molecular Intelligence / Web Development',
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
      category: 'Aerospace Data / Full-Stack Development',
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
            Three practical software architectures spanning computer vision pipelines, biochemical intelligence platforms, and aerospace telemetry systems.
          </div>
        </div>

        {/* Project Showcase List */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((project, idx) => (
            <ProjectItem key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
