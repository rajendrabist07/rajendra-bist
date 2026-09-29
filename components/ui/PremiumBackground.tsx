'use client';

import React from 'react';

export default function PremiumBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Fixed Radial Gradient Mesh */}
      <div className="terminal-gradient-mesh" />

      {/* Asymmetrical Floating Ambient Glow Orbs (GPU Transform / Opacity only) */}
      <div className="ambient-orb-1" />
      <div className="ambient-orb-2" />

      {/* SVG Turbulence Noise Texture Overlay */}
      <div className="terminal-noise-overlay" />

      {/* Subtle Technical Grid Matrix */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
}
