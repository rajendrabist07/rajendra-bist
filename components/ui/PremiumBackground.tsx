'use client';

import React from 'react';

export default function PremiumBackground() {
  return (
    <>
      {/* Fixed Radial Gradient Mesh with signature warm & cool duo */}
      <div className="terminal-gradient-mesh" aria-hidden="true" />

      {/* SVG Turbulence Noise Overlay */}
      <div className="terminal-noise-overlay" aria-hidden="true" />

      {/* Subtle Engineering Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />
    </>
  );
}
