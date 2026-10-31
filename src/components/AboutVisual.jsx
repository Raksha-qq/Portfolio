import React, { useEffect, useRef } from 'react';

export default function AboutVisual() {
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

    const pillars = [
      { label: 'SYSTEMS', angle: 0, r: 90, sub: 'C++ / Architecture' },
      { label: 'VISION', angle: (Math.PI * 2) / 4, r: 90, sub: 'CV / OCR / Geometry' },
      { label: 'WEB / APIS', angle: (Math.PI * 4) / 4, r: 90, sub: 'React / FastAPI' },
      { label: 'AI & EXPLORATION', angle: (Math.PI * 6) / 4, r: 90, sub: 'ML / Security' },
    ];

    const render = () => {
      time += 0.012;

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

      // Coordinate axes
      ctx.strokeStyle = 'rgba(240, 240, 235, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, 20);
      ctx.lineTo(cx, h - 20);
      ctx.moveTo(20, cy);
      ctx.lineTo(w - 20, cy);
      ctx.stroke();

      // Outer concentric ring
      ctx.strokeStyle = 'rgba(240, 240, 235, 0.12)';
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(cx, cy, 115, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Dynamic inner polygon linking the pillars
      ctx.save();
      ctx.beginPath();
      const nodeCoords = [];

      pillars.forEach((p, idx) => {
        const currentRot = time * 0.4;
        const currentRadius = p.r + Math.sin(time * 1.5 + idx) * 8;
        const nx = cx + Math.cos(p.angle + currentRot) * currentRadius;
        const ny = cy + Math.sin(p.angle + currentRot) * currentRadius;
        nodeCoords.push({ nx, ny, p });

        if (idx === 0) ctx.moveTo(nx, ny);
        else ctx.lineTo(nx, ny);
      });
      ctx.closePath();

      ctx.fillStyle = 'rgba(197, 255, 72, 0.03)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(197, 255, 72, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Center core: R / SYSTEMS
      ctx.fillStyle = '#c5ff48';
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(197, 255, 72, 0.3)';
      ctx.beginPath();
      ctx.arc(cx, cy, 16, 0, Math.PI * 2);
      ctx.stroke();

      // Connect each node to center
      nodeCoords.forEach(({ nx, ny, p }, i) => {
        ctx.strokeStyle = 'rgba(240, 240, 235, 0.15)';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        // Node circle
        ctx.fillStyle = i === 1 ? '#c5ff48' : '#141715';
        ctx.strokeStyle = '#c5ff48';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(nx, ny, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Node label
        ctx.fillStyle = '#f0f0eb';
        ctx.font = '500 9px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.label, nx, ny - 12);

        ctx.fillStyle = 'rgba(240, 240, 235, 0.5)';
        ctx.font = '8px "DM Mono", monospace';
        ctx.fillText(p.sub, nx, ny + 16);
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
        minHeight: '340px',
        background: '#121513',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: 'var(--text-tertiary)',
        }}
      >
        // ARCHITECTURAL MATRIX
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          color: 'var(--accent-primary)',
        }}
      >
        CORE: LOGIC × EXPERIMENTATION
      </div>
    </div>
  );
}
