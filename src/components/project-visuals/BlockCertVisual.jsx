import React, { useEffect, useRef } from 'react';

export default function BlockCertVisual() {
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

    const blocks = [
      { id: 101, title: 'GENESIS BLOCK', hash: '0x8f2a...1e4c', state: 'SEALED' },
      { id: 102, title: 'ISSUANCE CERT', hash: '0x4c99...a812', state: 'VERIFIED' },
      { id: 103, title: 'TRANSCRIPT V2', hash: '0x7e11...b304', state: 'ED25519_VALID' },
    ];

    const render = () => {
      time += 0.016;

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
      const step = 32;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      const cy = h / 2;
      const blockW = Math.min(w * 0.26, 120);
      const blockH = Math.min(h * 0.44, 96);
      const gap = Math.min(w * 0.08, 40);
      const totalW = blocks.length * blockW + (blocks.length - 1) * gap;
      const startX = (w - totalW) / 2;

      // Draw Hash Chain Connecting Bridges
      for (let i = 0; i < blocks.length - 1; i++) {
        const bx1 = startX + i * (blockW + gap) + blockW;
        const bx2 = startX + (i + 1) * (blockW + gap);

        // Chain line
        ctx.strokeStyle = 'rgba(197, 255, 72, 0.35)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(bx1, cy);
        ctx.lineTo(bx2, cy);
        ctx.stroke();
        ctx.setLineDash([]);

        // Pulsing Hash Particle along chain
        const particleOffset = ((time * 1.5 + i * 0.6) % 1);
        const px = bx1 + (bx2 - bx1) * particleOffset;
        ctx.fillStyle = '#c5ff48';
        ctx.beginPath();
        ctx.arc(px, cy, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Blocks
      blocks.forEach((block, idx) => {
        const bx = startX + idx * (blockW + gap);
        const by = cy - blockH / 2;

        const isHovered = mouse.active &&
          mouse.x * w >= bx && mouse.x * w <= bx + blockW &&
          mouse.y * h >= by && mouse.y * h <= by + blockH;

        // Block Container
        ctx.fillStyle = isHovered ? 'rgba(30, 38, 33, 0.9)' : 'rgba(20, 24, 22, 0.85)';
        ctx.strokeStyle = isHovered ? '#c5ff48' : 'rgba(240, 240, 235, 0.18)';
        ctx.lineWidth = isHovered ? 1.5 : 1;
        ctx.strokeRect(bx, by, blockW, blockH);
        ctx.fillRect(bx, by, blockW, blockH);

        // Header Tag
        ctx.fillStyle = isHovered ? '#c5ff48' : 'rgba(197, 255, 72, 0.8)';
        ctx.font = 'bold 9px "DM Mono", monospace';
        ctx.fillText(`[BLK #${block.id}]`, bx + 10, by + 18);

        // Title
        ctx.fillStyle = '#f0f0eb';
        ctx.font = '10px "Space Grotesk", sans-serif';
        ctx.fillText(block.title, bx + 10, by + 36);

        // Hash
        ctx.fillStyle = 'rgba(240, 240, 235, 0.45)';
        ctx.font = '8px "DM Mono", monospace';
        ctx.fillText(block.hash, bx + 10, by + 56);

        // Verification Pill inside Block
        ctx.fillStyle = isHovered ? 'rgba(197, 255, 72, 0.2)' : 'rgba(240, 240, 235, 0.06)';
        ctx.fillRect(bx + 8, by + blockH - 24, blockW - 16, 16);
        ctx.fillStyle = '#c5ff48';
        ctx.font = '7.5px "DM Mono", monospace';
        ctx.fillText(`✓ ${block.state}`, bx + 12, by + blockH - 13);
      });

      // Bottom SHA-256 Ledger Flow Visualizer
      ctx.fillStyle = 'rgba(240, 240, 235, 0.25)';
      ctx.font = '8.5px "DM Mono", monospace';
      const rollingHash = `PREV_HASH: 0x${Math.floor(Math.sin(time) * 100000000).toString(16)}... SIGNATURE: ED25519_VALIDATED`;
      ctx.fillText(rollingHash, 24, h - 20);

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
        <span>LEDGER // ED25519 + SHA-256</span>
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
        HASH CHAIN: IMMUTABLE [VERIFIED]
      </div>
    </div>
  );
}
