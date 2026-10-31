import React, { useEffect, useRef } from 'react';

export default function ChemScopeVisual() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let time = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Molecular graph model (Benzene + Carboxyl + Ester structure inspired by Acetylsalicylic acid / PubChem CID 2244)
    const baseNodes = [
      { id: 0, symbol: 'C', x: 0, y: -50, r: 12, label: 'C1' },
      { id: 1, symbol: 'C', x: 43.3, y: -25, r: 12, label: 'C2' },
      { id: 2, symbol: 'C', x: 43.3, y: 25, r: 12, label: 'C3' },
      { id: 3, symbol: 'C', x: 0, y: 50, r: 12, label: 'C4' },
      { id: 4, symbol: 'C', x: -43.3, y: 25, r: 12, label: 'C5' },
      { id: 5, symbol: 'C', x: -43.3, y: -25, r: 12, label: 'C6' },
      // Side branches
      { id: 6, symbol: 'O', x: 86.6, y: -50, r: 10, isAccent: true, label: 'O1' },
      { id: 7, symbol: 'OH', x: 126.6, y: -30, r: 10, label: 'OH' },
      { id: 8, symbol: 'O', x: -86.6, y: -45, r: 10, isAccent: true, label: 'O2' },
      { id: 9, symbol: 'CH3', x: -126.6, y: -20, r: 11, label: 'CH3' },
    ];

    const bonds = [
      { from: 0, to: 1, double: true },
      { from: 1, to: 2, double: false },
      { from: 2, to: 3, double: true },
      { from: 3, to: 4, double: false },
      { from: 4, to: 5, double: true },
      { from: 5, to: 0, double: false },
      { from: 1, to: 6, double: false },
      { from: 6, to: 7, double: false },
      { from: 5, to: 8, double: false },
      { from: 8, to: 9, double: false },
    ];

    let mouse = { x: 0, y: 0, active: false };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - (rect.left + rect.width / 2)) * 0.005;
      mouse.y = (e.clientY - (rect.top + rect.height / 2)) * 0.005;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let currentAngle = 0;

    const render = () => {
      time += 0.015;
      const targetAngle = mouse.active ? mouse.x * 2 : Math.sin(time * 0.5) * 0.3;
      currentAngle += (targetAngle - currentAngle) * 0.05;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);

      // Background lattice
      ctx.strokeStyle = 'rgba(240, 240, 235, 0.03)';
      ctx.lineWidth = 1;
      const hexStep = 44;
      for (let x = 0; x < w; x += hexStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      const centerX = w / 2;
      const centerY = h / 2;
      const scale = Math.min(w, h) / 300;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scale, scale);
      ctx.rotate(currentAngle);

      // Draw Bonds
      bonds.forEach((bond) => {
        const n1 = baseNodes[bond.from];
        const n2 = baseNodes[bond.to];

        ctx.strokeStyle = 'rgba(240, 240, 235, 0.35)';
        ctx.lineWidth = 2;

        if (bond.double) {
          // Double bond offset
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const nx = (-dy / len) * 3;
          const ny = (dx / len) * 3;

          ctx.beginPath();
          ctx.moveTo(n1.x + nx, n1.y + ny);
          ctx.lineTo(n2.x + nx, n2.y + ny);
          ctx.moveTo(n1.x - nx, n1.y - ny);
          ctx.lineTo(n2.x - nx, n2.y - ny);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      });

      // Draw Nodes (Atoms)
      baseNodes.forEach((node, i) => {
        const pulse = Math.sin(time * 2 + i) * 0.1 + 0.9;

        // Atom circle
        ctx.fillStyle = node.isAccent ? '#c5ff48' : '#141715';
        ctx.strokeStyle = node.isAccent ? '#c5ff48' : 'rgba(240, 240, 235, 0.6)';
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * (node.isAccent ? pulse : 1), 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Atom symbol
        ctx.fillStyle = node.isAccent ? '#0b0d0c' : '#f0f0eb';
        ctx.font = `600 ${node.symbol.length > 2 ? '8px' : '9px'} "Space Grotesk", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.symbol, node.x, node.y);

        // Technical coordinate badge
        ctx.fillStyle = 'rgba(240, 240, 235, 0.4)';
        ctx.font = '7px "DM Mono", monospace';
        ctx.fillText(node.label, node.x, node.y + node.r + 7);
      });

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '320px',
        background: 'radial-gradient(circle at 50% 50%, #131714 0%, #0d0f0e 100%)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: 'var(--text-secondary)',
          background: 'rgba(16, 18, 17, 0.85)',
          padding: '4px 8px',
          border: '1px solid var(--border-subtle)',
          letterSpacing: '0.06em',
        }}
      >
        <span>PUBCHEM // PUG_REST : C9H8O4</span>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: 'var(--accent-primary)',
          background: 'rgba(16, 18, 17, 0.85)',
          padding: '4px 8px',
          border: '1px solid var(--border-subtle)',
        }}
      >
        MOLECULAR GRAPH: 2D/3D SYNC
      </div>
    </div>
  );
}
