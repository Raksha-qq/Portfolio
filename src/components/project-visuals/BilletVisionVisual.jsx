import React, { useEffect, useRef } from 'react';

const telemetry = {
  width: '150.2 mm',
  height: '149.8 mm',
  tolerance: 'VALID (±0.4%)',
  code: 'B-7729-RKL',
};

export default function BilletVisionVisual() {
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

    const render = () => {
      time += 0.02;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);

      // Background technical grid
      ctx.strokeStyle = 'rgba(240, 240, 235, 0.04)';
      ctx.lineWidth = 1;
      const step = 28;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Center steel billet cross-section
      const centerX = w / 2;
      const centerY = h / 2;
      const billetSize = Math.min(w, h) * 0.44;

      const bx = centerX - billetSize / 2;
      const by = centerY - billetSize / 2;

      // Outer boundary inspection box
      ctx.strokeStyle = 'rgba(240, 240, 235, 0.22)';
      ctx.strokeRect(bx, by, billetSize, billetSize);

      // Chamfered / rounded corner profile of the steel billet
      ctx.save();
      ctx.strokeStyle = '#c5ff48';
      ctx.lineWidth = 1.5;
      ctx.fillStyle = 'rgba(197, 255, 72, 0.03)';

      const corner = 14;
      ctx.beginPath();
      ctx.moveTo(bx + corner, by);
      ctx.lineTo(bx + billetSize - corner, by);
      ctx.quadraticCurveTo(bx + billetSize, by, bx + billetSize, by + corner);
      ctx.lineTo(bx + billetSize, by + billetSize - corner);
      ctx.quadraticCurveTo(bx + billetSize, by + billetSize, bx + billetSize - corner, by + billetSize);
      ctx.lineTo(bx + corner, by + billetSize);
      ctx.quadraticCurveTo(bx, by + billetSize, bx, by + billetSize - corner);
      ctx.lineTo(bx, by + corner);
      ctx.quadraticCurveTo(bx, by, bx + corner, by);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Industrial Measurement Calipers / Annotations
      ctx.strokeStyle = 'rgba(197, 255, 72, 0.6)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      // Top dimension line
      const dimOffsetY = by - 16;
      ctx.beginPath();
      ctx.moveTo(bx, dimOffsetY);
      ctx.lineTo(bx + billetSize, dimOffsetY);
      ctx.moveTo(bx, dimOffsetY - 4);
      ctx.lineTo(bx, dimOffsetY + 4);
      ctx.moveTo(bx + billetSize, dimOffsetY - 4);
      ctx.lineTo(bx + billetSize, dimOffsetY + 4);
      ctx.stroke();

      // Right dimension line
      const dimOffsetX = bx + billetSize + 16;
      ctx.beginPath();
      ctx.moveTo(dimOffsetX, by);
      ctx.lineTo(dimOffsetX, by + billetSize);
      ctx.moveTo(dimOffsetX - 4, by);
      ctx.lineTo(dimOffsetX + 4, by);
      ctx.moveTo(dimOffsetX - 4, by + billetSize);
      ctx.lineTo(dimOffsetX + 4, by + billetSize);
      ctx.stroke();

      ctx.setLineDash([]);

      // Laser / Non-contact scanline sweep
      const scanProgress = (Math.sin(time * 0.8) + 1) / 2;
      const scanY = by + scanProgress * billetSize;

      const scanGrad = ctx.createLinearGradient(bx, scanY, bx + billetSize, scanY);
      scanGrad.addColorStop(0, 'rgba(197, 255, 72, 0)');
      scanGrad.addColorStop(0.5, 'rgba(197, 255, 72, 0.7)');
      scanGrad.addColorStop(1, 'rgba(197, 255, 72, 0)');

      ctx.fillStyle = scanGrad;
      ctx.fillRect(bx, scanY - 1.5, billetSize, 3);

      // OCR & Traceability Inspection Box
      const ocrX = bx + 14;
      const ocrY = by + billetSize - 32;
      ctx.strokeStyle = 'rgba(197, 255, 72, 0.85)';
      ctx.strokeRect(ocrX, ocrY, 92, 18);

      ctx.fillStyle = '#c5ff48';
      ctx.font = '10px "DM Mono", monospace';
      ctx.fillText('OCR: B-7729', ocrX + 6, ocrY + 12);

      // Corner target brackets
      const drawBracket = (x, y, dirX, dirY) => {
        ctx.strokeStyle = '#c5ff48';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + dirX * 12, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + dirY * 12);
        ctx.stroke();
      };

      drawBracket(bx - 6, by - 6, 1, 1);
      drawBracket(bx + billetSize + 6, by - 6, -1, 1);
      drawBracket(bx - 6, by + billetSize + 6, 1, -1);
      drawBracket(bx + billetSize + 6, by + billetSize + 6, -1, -1);

      // Dynamic cursor crosshair if hovered
      if (mouse.active) {
        const mx = mouse.x * w;
        const my = mouse.y * h;
        ctx.strokeStyle = 'rgba(240, 240, 235, 0.35)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(mx, 0);
        ctx.lineTo(mx, h);
        ctx.moveTo(0, my);
        ctx.lineTo(w, my);
        ctx.stroke();

        ctx.fillStyle = '#c5ff48';
        ctx.font = '9px "DM Mono", monospace';
        ctx.fillText(`PX:${Math.round(mx)} PY:${Math.round(my)}`, mx + 6, my - 6);
      }

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

      {/* Telemetry overlay labels */}
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
        <span>CAM_01 // EDGE_ANALYSIS</span>
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
        DIM: {telemetry.width} × {telemetry.height} [{telemetry.tolerance}]
      </div>
    </div>
  );
}
