'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArchitectureNode, ArchitectureEdge } from '@/content/projects/types';

export interface ArchitectureDiagramProps {
  architecture: {
    title: string;
    flowDescription: string;
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
    requestPath: string[];
  };
  projectTitle: string;
}

export default function ArchitectureDiagram({
  architecture,
  projectTitle,
}: ArchitectureDiagramProps) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to draw lines once on entering viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setHasDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { nodes, edges, requestPath } = architecture;

  // ViewBox coordinates
  const W = 880;
  const H = 220;

  // Map 0-100 coordinates to ViewBox pixels
  const getNodePos = (node: ArchitectureNode) => ({
    x: (node.x / 100) * (W - 140) + 70,
    y: (node.y / 100) * (H - 80) + 40,
  });

  const activeNode = nodes.find((n) => n.id === activeNodeId);

  return (
    <figure
      ref={containerRef}
      aria-label={`Architecture Diagram for ${projectTitle}`}
      className="relative rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-4 sm:p-6 overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[--border-hairline] font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[--accent]" />
          <span className="font-semibold text-[--text-primary]">Architecture (simplified)</span>
        </div>
        <span className="text-[--text-tertiary] text-[11px] hidden sm:inline">
          Interactive Node Map · Click / Hover for Details
        </span>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative w-full aspect-[88/26] min-h-[190px] select-none">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-full"
        >
          <defs>
            {/* Arrowhead marker */}
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="var(--accent)" opacity="0.8" />
            </marker>
            <marker
              id="arrowhead-active"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="var(--accent)" />
            </marker>
          </defs>

          {/* Edges */}
          {edges.map((edge) => {
            const fromNode = nodes.find((n) => n.id === edge.from);
            const toNode = nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            const p1 = getNodePos(fromNode);
            const p2 = getNodePos(toNode);

            const isIncident = activeNodeId && (edge.from === activeNodeId || edge.to === activeNodeId);

            // Path calculation (straight or curved based on layout)
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const isCurved = Math.abs(dy) > 20;

            const d = isCurved
              ? `M ${p1.x} ${p1.y} C ${p1.x + dx * 0.4} ${p1.y}, ${p2.x - dx * 0.4} ${p2.y}, ${p2.x} ${p2.y}`
              : `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <path
                  d={d}
                  fill="none"
                  stroke={isIncident ? 'var(--accent)' : 'var(--border-strong)'}
                  strokeWidth={isIncident ? 2.5 : 1.5}
                  strokeDasharray={edge.dashed ? '4 4' : hasDrawn ? 'none' : '400'}
                  strokeDashoffset={hasDrawn ? '0' : '400'}
                  markerEnd={isIncident ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
                  className="transition-all duration-300"
                  style={{
                    transitionProperty: 'stroke, stroke-width, stroke-dashoffset',
                    transitionDuration: hasDrawn ? '300ms' : '1000ms',
                  }}
                />
                {edge.label && (
                  <text
                    x={(p1.x + p2.x) / 2}
                    y={(p1.y + p2.y) / 2 - 8}
                    textAnchor="middle"
                    fill="var(--text-tertiary)"
                    className="font-mono text-[9px] select-none"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const pos = getNodePos(node);
            const isActive = activeNodeId === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                tabIndex={0}
                role="button"
                aria-label={`${node.label}: ${node.sublabel}`}
                onMouseEnter={() => setActiveNodeId(node.id)}
                onMouseLeave={() => setActiveNodeId(null)}
                onFocus={() => setActiveNodeId(node.id)}
                onBlur={() => setActiveNodeId(null)}
                onClick={() => setActiveNodeId(isActive ? null : node.id)}
                className="cursor-pointer focus:outline-none group"
              >
                {/* Node Box */}
                <rect
                  x="-55"
                  y="-22"
                  width="110"
                  height="44"
                  rx="6"
                  fill="var(--bg-surface-2)"
                  stroke={isActive ? 'var(--accent)' : 'var(--border-strong)'}
                  strokeWidth={isActive ? 2 : 1}
                  className="transition-all duration-200 group-hover:stroke-[var(--accent)] group-hover:fill-[var(--bg-surface-3)]"
                />

                {/* Node Label */}
                <text
                  x="0"
                  y="-4"
                  textAnchor="middle"
                  fill="var(--text-primary)"
                  className="font-sans font-bold text-[11px] select-none pointer-events-none"
                >
                  {node.label}
                </text>

                {/* Node Sublabel */}
                <text
                  x="0"
                  y="12"
                  textAnchor="middle"
                  fill="var(--text-tertiary)"
                  className="font-mono text-[9px] select-none pointer-events-none"
                >
                  {node.sublabel}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Live Technical Tooltip */}
        {activeNode && (
          <div
            role="tooltip"
            className="absolute bottom-2 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-xs rounded-[--radius-control] border border-[--border-strong] bg-[--bg-surface-3] p-2.5 shadow-xl font-mono text-xs text-[--text-secondary] pointer-events-none z-20 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between mb-1 text-[11px] font-bold text-[--text-primary]">
              <span>{activeNode.label}</span>
              <span className="text-[--accent] uppercase tracking-wider text-[9px]">
                {activeNode.type}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-[--text-secondary]">
              {activeNode.tooltip}
            </p>
          </div>
        )}
      </div>

      {/* Screen Reader Alternative */}
      <figcaption className="sr-only">
        Architecture diagram for {projectTitle}. {architecture.flowDescription}
      </figcaption>
      <ol className="sr-only">
        {requestPath.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </figure>
  );
}
