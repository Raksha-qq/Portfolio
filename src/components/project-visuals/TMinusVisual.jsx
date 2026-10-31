import React, { useEffect, useRef } from 'react';

export default function TMinusVisual() {
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
      time += 0.015;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);

      // Coordinate center
      const cx = w * 0.42;
      const cy = h * 0.58;

      // 1. Radar Polar Grid Circles
      ctx.strokeStyle = 'rgba(240, 240, 235, 0.05)';
      ctx.lineWidth = 1;
      const radii = [45, 90, 135, 180, 225];
      radii.forEach((r) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Cardinal axes
      ctx.beginPath();
      ctx.moveTo(cx - 240, cy);
      ctx.lineTo(cx + 240, cy);
      ctx.moveTo(cx, cy - 240);
      ctx.lineTo(cx, cy + 240);
      ctx.stroke();

      // 2. Earth curvature arc at bottom left
      ctx.save();
      const earthRadius = Math.max(w, h) * 0.95;
      const earthCenterX = -w * 0.2;
      const earthCenterY = h * 1.5;

      ctx.strokeStyle = 'rgba(240, 240, 235, 0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(earthCenterX, earthCenterY, earthRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Atmospheric glow band
      ctx.strokeStyle = 'rgba(197, 255, 72, 0.1)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(earthCenterX, earthCenterY, earthRadius + 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 3. Orbital Trajectory Ellipse
      ctx.save();
      ctx.strokeStyle = 'rgba(197, 255, 72, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);

      const orbitRadiusX = w * 0.38;
      const orbitRadiusY = h * 0.28;
      const orbitTilt = -0.32;

      ctx.translate(cx, cy);
      ctx.rotate(orbitTilt);
      ctx.beginPath();
      ctx.ellipse(0, 0, orbitRadiusX, orbitRadiusY, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 4. Vehicle Position along Orbit
      const orbitProgress = (time * 0.3) % (Math.PI * 2);
      const vx = Math.cos(orbitProgress) * orbitRadiusX;
      const vy = Math.sin(orbitProgress) * orbitRadiusY;

      // Draw vehicle reticle
      ctx.fillStyle = '#c5ff48';
      ctx.beginPath();
      ctx.arc(vx, vy, 4, 0, Math.PI * 2);
      ctx.fill();

      // Vehicle velocity vector
      const vDirX = -Math.sin(orbitProgress) * 18;
      const vDirY = Math.cos(orbitProgress) * 18;
      ctx.strokeStyle = '#c5ff48';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(vx, vy);
      ctx.lineTo(vx + vDirX, vy + vDirY);
      ctx.stroke();

      // Telemetry annotation tag next to vehicle
      ctx.font = '8px "DM Mono", monospace';
      ctx.fillStyle = '#f0f0eb';
      ctx.fillText('STAGE_02 // ORBIT', vx + 8, vy - 6);

      // Apoapsis / Periapsis markers
      ctx.fillStyle = 'rgba(240, 240, 235, 0.6)';
      ctx.beginPath();
      ctx.arc(orbitRadiusX, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText('Ap: 412km', orbitRadiusX - 10, -8);

      ctx.beginPath();
      ctx.arc(-orbitRadiusX, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText('Pe: 188km', -orbitRadiusX - 10, 16);

      ctx.restore();

      // 5. Radar sweep beam
      ctx.save();
      const sweepAngle = time * 0.75;
      ctx.strokeStyle = 'rgba(197, 255, 72, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepAngle) * 200, cy + Math.sin(sweepAngle) * 200);
      ctx.stroke();
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
        background: 'radial-gradient(circle at 60% 40%, #141715 0%, #0d0f0e 100%)',
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
        <span>LL2 API // ORBITAL TELEMETRY</span>
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
        V: 7.78 km/s // INC: 51.6°
      </div>
    </div>
  );
}
