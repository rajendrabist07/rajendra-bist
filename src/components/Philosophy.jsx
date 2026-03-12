import React from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const principles = [
  {
    number: '01',
    title: 'Clean Architecture First',
    description: 'I design folder structure and component boundaries before writing a single line of logic. Separation of concerns is not a refactoring task — it is a design task.',
    accent: '#00d4ff',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="3" width="6" height="6" rx="1"/><rect x="9" y="3" width="6" height="6" rx="1"/>
        <rect x="16" y="3" width="6" height="6" rx="1"/><rect x="2" y="12" width="6" height="6" rx="1"/>
        <rect x="9" y="12" width="6" height="6" rx="1"/><rect x="16" y="12" width="6" height="6" rx="1"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Component Reusability',
    description: 'A component written once should be usable everywhere. I design with props interfaces that are narrow but composable — reducing API surface without limiting flexibility.',
    accent: '#a855f7',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Performance Awareness',
    description: 'Every render has a cost. I measure before optimizing, and optimize with precision. Lazy loading, memoization, and code splitting are tools — not default answers.',
    accent: '#22d3a4',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Scalable UI Thinking',
    description: 'A UI that works for 10 items must work for 10,000. I design with pagination, virtualization, and state complexity in mind from the start — not as an afterthought.',
    accent: '#f59e0b',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 3H3v7h18V3z"/><path d="M21 14H3v7h18v-7z"/><path d="M12 21v-7"/><path d="M12 10V3"/>
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Readable Over Clever',
    description: 'The best code is code the next developer — including future me — can read without effort. I prefer explicit over implicit, and clarity over brevity.',
    accent: '#ec4899',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Foundations Before Frameworks',
    description: 'I understand what React abstracts, what HTTP promises, and what the browser guarantees. Frameworks change. The platform does not. I invest in the platform.',
    accent: '#00d4ff',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M2 20h20"/><path d="M5 20V10l7-7 7 7v10"/><path d="M9 20v-6h6v6"/>
      </svg>
    ),
  },
]

export default function Philosophy() {
  const sectionRef = useScrollReveal()

  return (
    <section id="philosophy" className="section" ref={sectionRef}>
      <div className="container">
        <div className="reveal">
          <p className="section-label">05 — Philosophy</p>
          <h2 className="section-title">How I approach building software</h2>
          <p className="section-subtitle" style={{ marginBottom: '60px' }}>
            These aren't rules I follow — they're conclusions I've arrived at through building, breaking, and rebuilding systems.
          </p>
        </div>

        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {principles.map(p => (
            <div
              key={p.number}
              className="glass-card"
              style={{ padding: '28px 24px', position: 'relative', overflow: 'hidden' }}
            >
              {/* Background number watermark */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '16px',
                fontFamily: 'var(--font-display)',
                fontSize: '4rem',
                fontWeight: 800,
                color: p.accent,
                opacity: 0.04,
                lineHeight: 1,
                userSelect: 'none',
              }}>{p.number}</div>

              {/* Icon */}
              <div style={{
                display: 'inline-flex',
                padding: '12px',
                background: p.accent + '15',
                borderRadius: '12px',
                color: p.accent,
                marginBottom: '18px',
              }}>
                {p.icon}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '10px',
                letterSpacing: '-0.01em',
              }}>{p.title}</h3>

              <p style={{
                fontSize: '0.87rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                fontWeight: 300,
              }}>{p.description}</p>

              {/* Bottom accent line */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: `linear-gradient(90deg, ${p.accent}40, transparent)`,
                borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
              }} />
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="reveal" style={{ marginTop: '64px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            padding: '32px 48px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(20px)',
            borderRadius: 'var(--radius-xl)',
            maxWidth: '700px',
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.6,
              letterSpacing: '-0.01em',
              marginBottom: '16px',
            }}>
              "I value clean thinking over noisy code,<br />
              and <span className="gradient-text">foundations over trends</span>."
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
            }}>— Rajendra Bist</p>
          </div>
        </div>
      </div>
    </section>
  )
}
