import React, { useEffect, useRef } from 'react';

/**
 * GenerativeBackground — Unified generative visual system for R / SYSTEMS.
 * 
 * Unifies:
 * - Living particles (organic Brownian & harmonic motion)
 * - Infinite geometry (mathematical perspective grid & topographic waves)
 * - Digital flow (filament lines, vector trails)
 * - Controlled chaos (occasional moiré interference & subtle harmonic distortions)
 */
export default function GenerativeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Reduced motion preference check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse / Pointer state with smooth interpolation
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 160,
      active: false,
    };

    // Scroll state
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle high-DPI canvas resizing
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Particle system configuration
    const PARTICLE_COUNT = Math.min(Math.floor((width * height) / 18000), 75);
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseSize: Math.random() * 1.8 + 0.8,
        seed: Math.random() * 1000,
        energy: Math.random(),
        flowAngle: Math.random() * Math.PI * 2,
      });
    }

    // Topographic Grid points
    const gridCols = 24;
    const gridRows = 14;

    let time = 0;
    let chaosTimer = 0;
    let chaosIntensity = 0;

    const render = () => {
      time += 0.008;
      chaosTimer += 0.005;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Smooth scroll lerp
      scrollY += (targetScrollY - scrollY) * 0.08;
      const scrollFactor = scrollY / (document.documentElement.scrollHeight - height || 1);

      // Controlled Chaos cycle: subtle moiré burst every ~18-24 seconds
      const chaosCycle = Math.sin(chaosTimer);
      chaosIntensity = chaosCycle > 0.94 ? (chaosCycle - 0.94) * 16 : 0;

      // 1. Clear background (#101211)
      ctx.fillStyle = '#101211';
      ctx.fillRect(0, 0, width, height);

      // 2. INFINITE GEOMETRY: Procedural Topographic Wave Grid
      // Subtle mathematical landscape floating in the lower/mid region
      ctx.lineWidth = 1;
      const gridSpacingX = width / (gridCols - 1);
      const gridSpacingY = (height * 0.85) / (gridRows - 1);
      const gridStartY = height * 0.18;

      // Store calculated points for cross-connection
      const gridPoints = [];

      for (let r = 0; r < gridRows; r++) {
        const rowPoints = [];
        for (let c = 0; c < gridCols; c++) {
          const baseX = c * gridSpacingX;
          const baseY = gridStartY + r * gridSpacingY;

          // Wave equation influenced by time, scrollFactor, and distance to mouse
          const wave1 = Math.sin(c * 0.28 + time * 1.2 + scrollFactor * 3.5) * 16;
          const wave2 = Math.cos(r * 0.35 + time * 0.8) * 12;

          // Mouse proximity displacement (gentle gravitational warp)
          let dx = baseX - mouse.x;
          let dy = baseY - mouse.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          let mouseWarpX = 0;
          let mouseWarpY = 0;

          if (mouse.active && dist < mouse.radius * 1.5 && dist > 1) {
            const force = (1 - dist / (mouse.radius * 1.5)) * 24;
            mouseWarpX = (dx / dist) * force;
            mouseWarpY = (dy / dist) * force;
          }

          // Chaos distortion
          const chaosOffset = chaosIntensity > 0 ? Math.sin(r * 1.8 + time * 5) * chaosIntensity * 8 : 0;

          const px = baseX + mouseWarpX + chaosOffset;
          const py = baseY + wave1 + wave2 + mouseWarpY;

          rowPoints.push({ x: px, y: py, depth: r / gridRows });
        }
        gridPoints.push(rowPoints);
      }

      // Draw horizontal grid wave curves
      for (let r = 0; r < gridRows; r++) {
        const rowAlpha = (0.025 + (r / gridRows) * 0.04) * (1 - scrollFactor * 0.3);
        ctx.strokeStyle = `rgba(240, 240, 235, ${rowAlpha.toFixed(4)})`;
        ctx.beginPath();
        for (let c = 0; c < gridCols; c++) {
          const pt = gridPoints[r][c];
          if (c === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            const prev = gridPoints[r][c - 1];
            const cx = (prev.x + pt.x) / 2;
            const cy = (prev.y + pt.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
          }
        }
        ctx.stroke();
      }

      // Draw selective vertical mathematical lines for perspective depth
      for (let c = 0; c < gridCols; c += 2) {
        ctx.strokeStyle = 'rgba(240, 240, 235, 0.022)';
        ctx.beginPath();
        for (let r = 0; r < gridRows; r++) {
          const pt = gridPoints[r][c];
          if (r === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // 3. LIVING PARTICLES & DIGITAL FLOW (Harmonic Particle System)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Flow field vector based on sinusoids
          const angle = Math.sin(p.x * 0.003 + time * 0.4) + Math.cos(p.y * 0.003 + time * 0.3);
          p.flowAngle += (angle - p.flowAngle) * 0.02;

          p.vx += Math.cos(p.flowAngle) * 0.012;
          p.vy += Math.sin(p.flowAngle) * 0.012;

          // Drag to prevent runaway speed
          p.vx *= 0.985;
          p.vy *= 0.985;

          // Gentle mouse reaction
          if (mouse.active) {
            const mdx = p.x - mouse.x;
            const mdy = p.y - mouse.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < mouse.radius && mdist > 2) {
              const pushForce = (1 - mdist / mouse.radius) * 0.35;
              p.vx += (mdx / mdist) * pushForce;
              p.vy += (mdy / mdist) * pushForce;
            }
          }

          p.x += p.vx;
          p.y += p.vy;

          // Wrap around canvas edges smoothly
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }

        // Draw particle node
        const pulse = Math.sin(time * 2 + p.seed) * 0.3 + 0.7;
        const isAccent = i % 7 === 0;

        ctx.fillStyle = isAccent
          ? `rgba(197, 255, 72, ${(0.45 * pulse).toFixed(3)})`
          : `rgba(240, 240, 235, ${(0.22 * pulse).toFixed(3)})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseSize * (isAccent ? 1.25 : 1), 0, Math.PI * 2);
        ctx.fill();

        // 4. DIGITAL FLOW: Inter-particle filaments & geometry connection
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distDx = p.x - p2.x;
          const distDy = p.y - p2.y;
          const pdist = Math.sqrt(distDx * distDx + distDy * distDy);

          const maxDist = 110;
          if (pdist < maxDist) {
            const alpha = (1 - pdist / maxDist) * (isAccent || j % 7 === 0 ? 0.16 : 0.06);
            ctx.strokeStyle = isAccent || j % 7 === 0
              ? `rgba(197, 255, 72, ${alpha.toFixed(4)})`
              : `rgba(240, 240, 235, ${alpha.toFixed(4)})`;

            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 5. CONTROLLED CHAOS: Subtle Moiré Interference Pattern
      if (chaosIntensity > 0.05) {
        ctx.save();
        ctx.strokeStyle = `rgba(197, 255, 72, ${(chaosIntensity * 0.08).toFixed(4)})`;
        ctx.lineWidth = 0.5;
        const centerX = width * 0.7;
        const centerY = height * 0.45;
        for (let rad = 20; rad < 280; rad += 14) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, rad + Math.sin(time * 6 + rad * 0.1) * 4, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Render subtle edge telemetry ticks
      ctx.strokeStyle = 'rgba(240, 240, 235, 0.06)';
      ctx.lineWidth = 1;
      // Top left corner crosshair
      ctx.beginPath();
      ctx.moveTo(32, 28);
      ctx.lineTo(32, 40);
      ctx.moveTo(26, 34);
      ctx.lineTo(38, 34);
      ctx.stroke();

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Initial render
    render();

    // Visibility change handling to save GPU cycles when unfocused
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (!prefersReducedMotion) {
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          opacity: 0.92,
        }}
      />
      {/* Subtle vignette for editorial focus */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 45%, transparent 40%, rgba(16, 18, 17, 0.75) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
