# R / SYSTEMS // Portfolio

<div align="center">

[![Live Deployment](https://img.shields.io/badge/Production-Live%20on%20Vercel-success?style=for-the-badge&logo=vercel&logoColor=white&color=000000)](https://portfolio-pi-azure-25.vercel.app/)
[![React 19](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Oxlint](https://img.shields.io/badge/Linter-Oxlint-FF6B6B?style=for-the-badge)](https://oxc.rs/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

### [Explore Live Deployment ↗](https://portfolio-pi-azure-25.vercel.app/)

<p align="center">
  <strong>Personal portfolio of Raksha Mendon</strong><br />
  Computer Science student at NIT Rourkela exploring software architecture, computer vision, molecular intelligence, aerospace telemetry, and creative technology.
</p>

</div>

---

## ⚡ Overview

**R / SYSTEMS** is a high-performance, dark-aesthetic portfolio engineered with technical precision and generative elegance. Built from scratch without bloated UI kits, it combines clean editorial typography, real-time interactive HTML5 canvas simulations, and responsive systems architecture.

- **Production URL**: [https://portfolio-pi-azure-25.vercel.app/](https://portfolio-pi-azure-25.vercel.app/)
- **Repository**: [https://github.com/Raksha-qq/Portfolio](https://github.com/Raksha-qq/Portfolio)
- **Primary Domain**: Computer Vision & Systems Engineering
- **Operator**: Raksha Mendon ([@Raksha-qq](https://github.com/Raksha-qq))

---

## 🔬 Featured Systems

### 1. [BilletVision](https://github.com/Raksha-qq) — Industrial Computer Vision
An automated billet inspection and traceability system designed to inspect steel billets using computer vision.
- **Capabilities**: Non-contact optical measurement, shape & defect geometric analysis, OCR code reading for billet traceability, and inspection logging.
- **Interactive Visual**: Custom HTML5 Canvas simulation rendering real-time edge analysis, coordinate crosshairs, and live dimension telemetry overlay.
- **Tech**: Python, OpenCV, Computer Vision, OCR Engine, NumPy.

### 2. [ChemScope](https://github.com/Raksha-qq/ChemScope) — Molecular Intelligence Platform
An interactive chemical information and visualization platform powered by the PubChem database.
- **Capabilities**: PubChem PUG REST API integration pipeline, interactive 2D/3D molecular graph rendering, chemical formula & molecular weight analysis, and query caching.
- **Interactive Visual**: Interactive rotating molecular lattice structure with dynamic node attraction.
- **Tech**: React, FastAPI, Python, PubChem PUG REST API, Vite.
- **Live Platform**: [chemscope-frontend.vercel.app](https://chemscope-frontend.vercel.app)

### 3. [T-Minus](https://github.com/Raksha-qq/T-minus) — Aerospace Launch Intelligence
A launch telemetry dashboard that aggregates worldwide rocket launch schedules, mission profiles, and orbital trajectories.
- **Capabilities**: Space Devs Launch Library 2 API ingestion, real-time mission countdowns, vehicle specs, and orbital insertion mapping.
- **Interactive Visual**: Mission-control radar sweep simulation displaying orbital trajectories and planetary horizon curvature.
- **Tech**: React, FastAPI, Python, Space Devs LL2 API, Vite.
- **Live Platform**: [t-minus-one.vercel.app](https://t-minus-one.vercel.app)

---

## 🎨 Architectural & Design Highlights

- **Signature Generative Background**: A unified HTML5 Canvas visual engine combining Brownian particle motion, interactive pointer attraction, and perspective topographic wave lines.
- **Technical Minimalist Aesthetic**: Monospaced metadata tags (`DM Mono`), high-contrast headings (`Space Grotesk`), and accent highlights (`#c5ff48`).
- **Zero Framework Bloat**: Custom styling and layout using CSS custom properties and CSS Grid — no bulky CSS utility libraries or runtime overhead.
- **Direct Mail Pipeline**: Interactive transmission module pre-wired to `raks07.2020@gmail.com` with quick-copy clipboard functionality.
- **Accessibility & Performance**: Native `prefers-reduced-motion` compliance, lightweight footprint (< 86 kB gzipped bundle), and sub-millisecond route transitions.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Core** | React 19, JavaScript (ES6+), Vite |
| **Graphics & Sim** | HTML5 Canvas API (High-DPR, Custom Simulation Engines) |
| **Icons** | Lucide React |
| **Styling** | Modern Vanilla CSS, CSS Grid, CSS Variables |
| **Linter & Tooling** | Oxlint (100+ rules, 0 errors) |
| **Deployment** | Vercel (Edge Network, Automated CI/CD) |

---

## 📂 Project Structure

```text
Portfolio/
├── public/
│   ├── favicon.svg             # Custom minimal SVG favicon
│   └── icons.svg
├── src/
│   ├── assets/                 # Static media assets
│   ├── components/
│   │   ├── project-visuals/    # Custom HTML5 Canvas simulation components
│   │   │   ├── BilletVisionVisual.jsx
│   │   │   ├── ChemScopeVisual.jsx
│   │   │   └── TMinusVisual.jsx
│   │   ├── About.jsx           # Analytical Mindset & Operator profile
│   │   ├── AboutVisual.jsx     # 4-pillar architectural matrix canvas
│   │   ├── Contact.jsx         # Transmission terminal & mail routing
│   │   ├── Expertise.jsx       # Technical capability matrix
│   │   ├── Footer.jsx          # Technical telemetry footer & coordinates
│   │   ├── GenerativeBackground.jsx # Unified generative canvas engine
│   │   ├── Hero.jsx            # Editorial typography & UTC system clock
│   │   ├── Icons.jsx           # Custom SVG social icons
│   │   ├── Navbar.jsx          # Minimal blur header & Connect mailto link
│   │   ├── ProjectItem.jsx     # Modular showcase row component
│   │   └── Projects.jsx        # Project catalog container
│   ├── styles/
│   │   ├── animations.css      # Keyframe pulses, scanlines & reticles
│   │   ├── global.css          # Reset, layout utilities & button styles
│   │   └── variables.css       # Color palette, spacing & fonts
│   ├── App.jsx                 # Core application shell
│   ├── index.css
│   └── main.jsx
├── index.html                  # HTML entry with Space Grotesk & DM Mono
├── package.json
└── vite.config.js
```

---

## 🚀 Local Development

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Raksha-qq/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local Vite development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Run production build:**
   ```bash
   npm run build
   ```

5. **Run linter:**
   ```bash
   npm run lint
   ```

---

## 📬 Contact & Channels

- **Operator**: Raksha Mendon
- **Email**: [raks07.2020@gmail.com](mailto:raks07.2020@gmail.com)
- **LinkedIn**: [linkedin.com/in/raksha-mendon-b300a3377](https://www.linkedin.com/in/raksha-mendon-b300a3377/)
- **GitHub**: [@Raksha-qq](https://github.com/Raksha-qq)
- **Coordinates**: NIT Rourkela (`22.2570° N, 84.9010° E`)
