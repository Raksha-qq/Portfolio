import React, { useEffect, useRef } from 'react';

export default function HeadlineIQVisual() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let time = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let mouse = { x: 0.5, y: 0.5, active: false };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const categories = [
      { name: 'SCI / TECH', conf: 0.887, angle: -Math.PI / 4 },
      { name: 'BUSINESS', conf: 0.062, angle: Math.PI / 4 },
      { name: 'WORLD NEWS', conf: 0.038, angle: (3 * Math.PI) / 4 },
      { name: 'SPORTS', conf: 0.013, angle: (-3 * Math.PI) / 4 },
    ];

    const render = () => {
      time += 0.018;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.35;

      // Coordinate axes
      ctx.strokeStyle = 'rgba(240, 240, 235, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, 16);
      ctx.lineTo(cx, h - 16);
      ctx.moveTo(16, cy);
      ctx.lineTo(w - 16, cy);
      ctx.stroke();

      // Outer Embedding Field Circle
      ctx.strokeStyle = 'rgba(240, 240, 235, 0.12)';
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 512-dim Embedding Filament Rays
      const filamentCount = 28;
      for (let i = 0; i < filamentCount; i++) {
        const theta = (i / filamentCount) * Math.PI * 2 + time * 0.2;
        const len = radius * (0.4 + Math.sin(time * 2 + i) * 0.25);
        const fx = cx + Math.cos(theta) * len;
        const fy = cy + Math.sin(theta) * len;

        ctx.strokeStyle = i % 4 === 0 ? 'rgba(197, 255, 72, 0.25)' : 'rgba(240, 240, 235, 0.04)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(fx, fy);
        ctx.stroke();
      }

      // Draw Category Cluster Nodes
      categories.forEach((cat) => {
        const nx = cx + Math.cos(cat.angle) * radius;
        const ny = cy + Math.sin(cat.angle) * radius;
        const isLeading = cat.conf > 0.5;

        // Vector line to category node
        ctx.strokeStyle = isLeading ? 'rgba(197, 255, 72, 0.6)' : 'rgba(240, 240, 235, 0.15)';
        ctx.lineWidth = isLeading ? 1.5 : 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        // Node circle
        ctx.fillStyle = isLeading ? '#c5ff48' : 'rgba(240, 240, 235, 0.3)';
        ctx.beginPath();
        ctx.arc(nx, ny, isLeading ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Category Tag
        ctx.fillStyle = isLeading ? '#c5ff48' : 'rgba(240, 240, 235, 0.6)';
        ctx.font = 'bold 9px "DM Mono", monospace';
        const textOffsetX = Math.cos(cat.angle) > 0 ? 10 : -80;
        ctx.fillText(`${cat.name} (${(cat.conf * 100).toFixed(1)}%)`, nx + textOffsetX, ny + 3);
      });

      // Center Node: Universal Sentence Encoder Anchor
      ctx.fillStyle = '#c5ff48';
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing Ring around Center
      const pulseR = 8 + (Math.sin(time * 3) + 1) * 6;
      ctx.strokeStyle = 'rgba(197, 255, 72, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
      ctx.stroke();

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
        background: 'radial-gradient(circle at 50% 50%, #151917 0%, #0d0f0e 100%)',
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
        <span>NLP // SENTENCE_EMBEDDING_512D</span>
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
        ACCURACY: 88.75% // AG NEWS
      </div>
    </div>
  );
}
