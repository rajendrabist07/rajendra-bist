import React, { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

// Project mock visual previews as SVG
const ProjectPreview = ({ type }) => {
  const previews = {
    portfolio: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="400" height="220" fill="#0a0a0f"/>
        {/* Navbar */}
        <rect x="0" y="0" width="400" height="36" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
        <circle cx="20" cy="18" r="5" fill="#00d4ff"/>
        <text x="30" y="22" fontFamily="monospace" fontSize="9" fill="#fff" opacity="0.8">RB.</text>
        <rect x="260" y="12" width="32" height="12" rx="4" fill="rgba(255,255,255,0.06)"/>
        <rect x="298" y="12" width="32" height="12" rx="4" fill="rgba(255,255,255,0.06)"/>
        <rect x="336" y="12" width="40" height="12" rx="4" fill="#00d4ff" opacity="0.8"/>
        {/* Hero text */}
        <rect x="24" y="55" width="180" height="18" rx="4" fill="rgba(255,255,255,0.15)"/>
        <rect x="24" y="80" width="240" height="12" rx="3" fill="rgba(255,255,255,0.06)"/>
        <rect x="24" y="98" width="200" height="12" rx="3" fill="rgba(255,255,255,0.04)"/>
        <rect x="24" y="122" width="90" height="28" rx="8" fill="#00d4ff" opacity="0.9"/>
        <rect x="122" y="122" width="90" height="28" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        {/* Orb */}
        <circle cx="320" cy="100" r="80" fill="radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)" opacity="0.4"/>
        <circle cx="320" cy="100" r="60" fill="rgba(0,212,255,0.06)"/>
      </svg>
    ),
    ecommerce: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="400" height="220" fill="#0a0a14"/>
        <rect x="0" y="0" width="400" height="36" fill="rgba(255,255,255,0.04)"/>
        <text x="16" y="22" fontFamily="monospace" fontSize="8" fill="#00d4ff" opacity="0.8">ShopUI</text>
        <rect x="300" y="10" width="20" height="16" rx="3" fill="rgba(255,255,255,0.06)"/>
        <rect x="326" y="10" width="52" height="16" rx="3" fill="#00d4ff" opacity="0.8"/>
        {/* Products grid */}
        {[0,1,2,3,5,6,7,8].map((i) => {
          const col = i % 4, row = Math.floor(i / 4)
          return (
            <g key={i}>
              <rect x={16 + col * 94} y={50 + row * 80} width="82" height="68" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
              <rect x={24 + col * 94} y={56 + row * 80} width="66" height="38" rx="4" fill="rgba(168,85,247,0.15)"/>
              <rect x={24 + col * 94} y={100 + row * 80} width="40" height="6" rx="2" fill="rgba(255,255,255,0.12)"/>
              <rect x={24 + col * 94} y={110 + row * 80} width="24" height="5" rx="2" fill="rgba(0,212,255,0.5)"/>
            </g>
          )
        })}
      </svg>
    ),
    landing: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.15"/>
          </linearGradient>
        </defs>
        <rect width="400" height="220" fill="#050508"/>
        <rect width="400" height="220" fill="url(#heroGrad)"/>
        <rect x="0" y="0" width="400" height="36" fill="rgba(5,5,8,0.9)"/>
        <circle cx="20" cy="18" r="6" fill="#a855f7"/>
        <rect x="130" y="12" width="28" height="12" rx="3" fill="rgba(255,255,255,0.06)"/>
        <rect x="164" y="12" width="28" height="12" rx="3" fill="rgba(255,255,255,0.06)"/>
        <rect x="198" y="12" width="28" height="12" rx="3" fill="rgba(255,255,255,0.06)"/>
        <rect x="340" y="10" width="48" height="16" rx="8" fill="#a855f7" opacity="0.9"/>
        <rect x="100" y="65" width="200" height="22" rx="4" fill="rgba(255,255,255,0.18)"/>
        <rect x="120" y="94" width="160" height="10" rx="3" fill="rgba(255,255,255,0.07)"/>
        <rect x="140" y="110" width="120" height="8" rx="2" fill="rgba(255,255,255,0.05)"/>
        <rect x="150" y="130" width="100" height="26" rx="13" fill="#a855f7" opacity="0.85"/>
        {/* Floating cards */}
        <rect x="10" y="160" width="110" height="46" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
        <rect x="145" y="168" width="110" height="46" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
        <rect x="280" y="160" width="110" height="46" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
      </svg>
    ),
    dashboard: (
      <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect width="400" height="220" fill="#080810"/>
        {/* Sidebar */}
        <rect x="0" y="0" width="64" height="220" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
        {[30,58,86,114].map(y => (
          <rect key={y} x="12" y={y} width="40" height="18" rx="5" fill="rgba(255,255,255,0.04)"/>
        ))}
        <rect x="12" y="30" width="40" height="18" rx="5" fill="rgba(0,212,255,0.15)"/>
        {/* Stats cards */}
        {[0,1,2,3].map(i => (
          <rect key={i} x={76 + i * 80} y="10" width="72" height="46" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
        ))}
        <rect x="84" y="18" width="32" height="6" rx="2" fill="rgba(255,255,255,0.08)"/>
        <rect x="84" y="30" width="48" height="12" rx="3" fill="#00d4ff" opacity="0.7"/>
        <rect x="164" y="18" width="32" height="6" rx="2" fill="rgba(255,255,255,0.08)"/>
        <rect x="164" y="30" width="48" height="12" rx="3" fill="#a855f7" opacity="0.7"/>
        <rect x="244" y="18" width="32" height="6" rx="2" fill="rgba(255,255,255,0.08)"/>
        <rect x="244" y="30" width="48" height="12" rx="3" fill="#22d3a4" opacity="0.7"/>
        {/* Chart area */}
        <rect x="76" y="64" width="200" height="100" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
        {[0,1,2,3,4,5,6].map((i, idx) => {
          const heights = [40,60,30,75,50,65,45]
          return (
            <rect key={i} x={88 + i * 26} y={154 - heights[idx]} width="18" height={heights[idx]} rx="4"
              fill={`rgba(0,212,255,${0.3 + idx * 0.05})`}/>
          )
        })}
        {/* Table */}
        <rect x="76" y="172" width="200" height="40" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
        {[0,1,2].map(i => (
          <rect key={i} x="84" y={180 + i * 10} width={120 - i * 20} height="6" rx="2" fill="rgba(255,255,255,0.06)"/>
        ))}
        {/* Right panel */}
        <rect x="284" y="64" width="108" height="148" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
        <circle cx="338" cy="104" r="28" fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="8"/>
        <circle cx="338" cy="104" r="28" fill="none" stroke="#00d4ff" strokeWidth="8" strokeDasharray="88 176" strokeLinecap="round" transform="rotate(-90 338 104)"/>
        <rect x="294" y="148" width="88" height="6" rx="2" fill="rgba(255,255,255,0.07)"/>
        <rect x="294" y="160" width="70" height="6" rx="2" fill="rgba(255,255,255,0.05)"/>
        <rect x="294" y="172" width="80" height="6" rx="2" fill="rgba(255,255,255,0.05)"/>
      </svg>
    ),
  }
  return previews[type] || previews.portfolio
}

const projects = [
  {
    id: 1,
    type: 'portfolio',
    number: '01',
    title: 'Developer Portfolio',
    subtitle: 'UI Engineering & Component Architecture',
    description: 'A personal portfolio built to demonstrate UI engineering discipline — not just what I build, but how I think about component architecture, design systems, and frontend performance under real constraints.',
    features: ['Dark/Light glass theme', 'Smooth scroll reveal animations', 'Component-based architecture', 'Responsive layout system'],
    stack: ['React', 'Tailwind CSS', 'Vite', 'CSS Animations'],
    accent: '#00d4ff',
    live: 'https://rajendrabist.vercel.app',
    github: 'https://github.com/rajendrabist07',
  },
  {
    id: 2,
    type: 'ecommerce',
    number: '02',
    title: 'E-Commerce UI',
    subtitle: 'State Management & API Integration',
    description: 'A production-quality e-commerce interface with real API data fetching, shopping cart state management, and dynamic filter/search systems. Designed to handle real-world product catalog complexity.',
    features: ['Product listing with live API', 'Shopping cart state logic', 'Filter & search system', 'Dynamic UI rendering'],
    stack: ['React', 'Context API', 'REST API', 'TypeScript'],
    accent: '#a855f7',
    live: '#',
    github: 'https://github.com/rajendrabist07',
  },
  {
    id: 3,
    type: 'landing',
    number: '03',
    title: 'Landing Page Engineering',
    subtitle: 'Layout Precision & Micro-interactions',
    description: 'A high-fidelity product landing page inspired by top-tier tech companies. Every layout decision, visual hierarchy choice, and micro-interaction is intentional — demonstrating frontend layout mastery.',
    features: ['Layout precision & visual hierarchy', 'CSS micro-interactions', 'Performance-first loading', 'Scroll-triggered animations'],
    stack: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    accent: '#22d3a4',
    live: '#',
    github: 'https://github.com/rajendrabist07',
  },
  {
    id: 4,
    type: 'dashboard',
    number: '04',
    title: 'Analytics Dashboard',
    subtitle: 'Complex UI Systems & Data Visualization',
    description: 'An analytics dashboard with interactive charts, real-time stat cards, sortable data tables, and multi-dimensional KPI visualization. Built to scale to hundreds of data points without losing performance.',
    features: ['Interactive chart components', 'Real-time stat cards', 'Sortable data tables', 'Responsive grid layout'],
    stack: ['React', 'Recharts', 'TypeScript', 'Tailwind CSS'],
    accent: '#f59e0b',
    live: '#',
    github: 'https://github.com/rajendrabist07',
  },
]

export default function Projects() {
  const sectionRef = useScrollReveal()
  const [hovered, setHovered] = useState(null)

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <div className="container">
        <div className="reveal">
          <p className="section-label">03 — Projects</p>
          <h2 className="section-title">Selected work</h2>
          <p className="section-subtitle" style={{ marginBottom: '60px' }}>
            Each project is a deliberate exercise in engineering thinking — not just functionality, but structure, performance, and maintainability.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="reveal glass-card"
              style={{
                display: 'grid',
                gridTemplateColumns: idx % 2 === 0 ? '1fr 1.1fr' : '1.1fr 1fr',
                gap: '0',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                borderColor: hovered === project.id ? project.accent + '44' : undefined,
              }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Preview — left or right based on index */}
              {idx % 2 !== 0 && (
                <div style={{
                  background: 'var(--bg-secondary)',
                  borderRight: '1px solid var(--glass-border)',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <ProjectPreview type={project.type} />
                </div>
              )}

              {/* Content */}
              <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: project.accent,
                    opacity: 0.7,
                  }}>{project.number}</span>
                  <div style={{ flex: 1, height: '1px', background: project.accent + '22' }} />
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '4px',
                  letterSpacing: '-0.02em',
                }}>{project.title}</h3>

                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: project.accent,
                  marginBottom: '16px',
                  opacity: 0.8,
                  letterSpacing: '0.04em',
                }}>{project.subtitle}</p>

                <p style={{
                  fontSize: '0.92rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  fontWeight: 300,
                  marginBottom: '20px',
                }}>{project.description}</p>

                {/* Feature list */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
                  {project.features.map(f => (
                    <li key={f} style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      fontSize: '0.82rem', color: 'var(--text-secondary)',
                    }}>
                      <span style={{ color: project.accent, opacity: 0.7, fontSize: '0.6rem' }}>◆</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Stack tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '24px' }}>
                  {project.stack.map(tech => (
                    <span key={tech} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      padding: '4px 10px',
                      border: `1px solid ${project.accent}30`,
                      borderRadius: '5px',
                      color: 'var(--text-muted)',
                      background: project.accent + '08',
                    }}>{tech}</span>
                  ))}
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '9px 18px',
                      background: project.accent,
                      color: '#000',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-body)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${project.accent}40` }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <ExternalIcon /> Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '9px 18px',
                      background: 'transparent',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      fontFamily: 'var(--font-body)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = project.accent; e.currentTarget.style.color = project.accent }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                  >
                    <GithubIcon /> Source
                  </a>
                </div>
              </div>

              {/* Preview — right side for even indices */}
              {idx % 2 === 0 && (
                <div style={{
                  background: 'var(--bg-secondary)',
                  borderLeft: '1px solid var(--glass-border)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <ProjectPreview type={project.type} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .glass-card { grid-template-columns: 1fr !important; }
          .glass-card > div:last-child:not([style*="padding"]),
          .glass-card > div:first-child:not([style*="padding"]) { display: none !important; }
        }
      `}</style>
    </section>
  )
}
