import React from 'react';

/**
 * BlueprintBackground: Static CSS-only architectural blueprint grid.
 * Minor 24px grid, major 120px grid, with radial fade mask.
 * 0 JS execution cost, 0 ongoing main-thread idle cost.
 */
export default function BlueprintBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px),
            linear-gradient(var(--grid-major) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-major) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 24px 24px, 120px 120px, 120px 120px',
          backgroundPosition: '-1px -1px',
          maskImage: 'radial-gradient(ellipse at 50% 25%, black 35%, transparent 88%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 25%, black 35%, transparent 88%)',
        }}
      />
    </div>
  );
}
