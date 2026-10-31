import React, { useEffect, useRef } from 'react';

export default function DigitLocalizeVisual() {
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

      // 1. Matrix Coordinate Grid
      ctx.strokeStyle = 'rgba(240, 240, 235, 0.04)';
      ctx.lineWidth = 1;
      const step = 24;
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

      // 2. Synthetic 75x75 coordinate canvas bounds
      const canvasDim = Math.min(w, h) * 0.72;
      const cx = (w - canvasDim) / 2;
      const cy = (h - canvasDim) / 2;

      ctx.strokeStyle = 'rgba(240, 240, 235, 0.16)';
      ctx.strokeRect(cx, cy, canvasDim, canvasDim);

      // 3. Simulated Moving Digit Position
      const targetDigitX = mouse.active ? mouse.x : 0.5 + Math.sin(time * 0.8) * 0.22;
      const targetDigitY = mouse.active ? mouse.y : 0.5 + Math.cos(time * 0.9) * 0.22;

      const digitW = canvasDim * 0.32;
      const digitH = canvasDim * 0.42;
      const dx = cx + (targetDigitX * (canvasDim - digitW));
      const dy = cy + (targetDigitY * (canvasDim - digitH));

      // 4. Render Synthetic Handwritten Digit (Digit '8' / '3' strokes)
      ctx.save();
      ctx.strokeStyle = 'rgba(240, 240, 235, 0.75)';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const dMidX = dx + digitW / 2;
      const rTop = digitH * 0.22;
      const rBot = digitH * 0.28;

      ctx.beginPath();
      // Upper loop of '8'
      ctx.arc(dMidX, dy + rTop + 6, rTop, 0, Math.PI * 2);
      // Lower loop of '8'
      ctx.arc(dMidX, dy + digitH - rBot - 6, rBot, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 5. Predicted Bounding Box (Keras Localization Head Output)
      const pad = 8;
      const bx = dx - pad;
      const by = dy - pad;
      const bw = digitW + pad * 2;
      const bh = digitH + pad * 2;

      // Glow box
      ctx.strokeStyle = '#c5ff48';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 3]);
      ctx.strokeRect(bx, by, bw, bh);
      ctx.setLineDash([]);

      // Corner Crosshair Brackets
      const cLen = 10;
      ctx.strokeStyle = '#c5ff48';
      ctx.lineWidth = 2.5;

      // Top-Left
      ctx.beginPath();
      ctx.moveTo(bx, by + cLen);
      ctx.lineTo(bx, by);
      ctx.lineTo(bx + cLen, by);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(bx + bw - cLen, by);
      ctx.lineTo(bx + bw, by);
      ctx.lineTo(bx + bw, by + cLen);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(bx, by + bh - cLen);
      ctx.lineTo(bx, by + bh);
      ctx.lineTo(bx + cLen, by + bh);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(bx + bw - cLen, by + bh);
      ctx.lineTo(bx + bw, by + bh);
      ctx.lineTo(bx + bw, by + bh - cLen);
      ctx.stroke();

      // Label Tag above Bounding Box
      ctx.fillStyle = '#c5ff48';
      ctx.fillRect(bx, by - 20, 110, 20);
      ctx.fillStyle = '#0a0d0b';
      ctx.font = 'bold 10px "DM Mono", monospace';
      ctx.fillText('DIGIT: 8 [99.4%]', bx + 6, by - 6);

      // Coordinate Crosshairs through center
      ctx.strokeStyle = 'rgba(197, 255, 72, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(bx + bw / 2, 0);
      ctx.lineTo(bx + bw / 2, h);
      ctx.moveTo(0, by + bh / 2);
      ctx.lineTo(w, by + bh / 2);
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
        <span>TASK: JOINT_CLS_LOCALIZATION</span>
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
        IoU: 0.924 // MULTI-HEAD CNN
      </div>
    </div>
  );
}
