import React, { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const phases = [
  {
    id: 'problem',
    label: '01 — Problem',
    title: 'The real constraint',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    color: '#00d4ff',
    content: (
      <>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16, fontSize: '0.95rem', fontWeight: 300 }}>
          Most portfolio sites are lists of technologies — they don't communicate <em style={{ color: 'var(--text-primary)', fontStyle: 'normal', fontWeight: 500 }}>how a developer thinks</em>. The challenge was to build something that showed engineering discipline through structure and interaction, not through words like "passionate" or "experienced."
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem', fontWeight: 300 }}>
          Constraints: single-page React app, deploy to Vercel, zero external UI libraries (everything custom), lighthouse performance score above 90.
        </p>
      </>
    ),
  },
  {
    id: 'approach',
    label: '02 — Approach',
    title: 'Design decisions as architecture',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    color: '#a855f7',
    content: (
      <>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16, fontSize: '0.95rem', fontWeight: 300 }}>
          First decision: <em style={{ color: 'var(--text-primary)', fontStyle: 'normal', fontWeight: 500 }}>design tokens before components</em>. CSS custom properties were defined for every color, spacing, shadow, and transition before writing a single component — creating a system, not a stylesheet.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16, fontSize: '0.95rem', fontWeight: 300 }}>
          Second: <em style={{ color: 'var(--text-primary)', fontStyle: 'normal', fontWeight: 500 }}>theme switching without re-renders</em>. The dark/light toggle flips a single data-theme attribute on the root element. CSS does the rest. Zero JavaScript re-renders, zero flicker.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem', fontWeight: 300 }}>
          Third: IntersectionObserver for all animations — no scroll event listeners. The browser tells us when elements are visible; we don't poll.
        </p>
      </>
    ),
  },
  {
    id: 'technology',
    label: '03 — Technology',
    title: 'Why these tools, not others',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    color: '#22d3a4',
    content: (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          {[
            { tech: 'React + Vite', reason: 'Fast dev loop, optimal build output' },
            { tech: 'CSS Custom Props', reason: 'Theme system without runtime cost' },
            { tech: 'IntersectionObserver', reason: 'Performant scroll animations' },
            { tech: 'Google Fonts (preconnect)', reason: 'Typography without layout shift' },
            { tech: 'Vercel', reason: 'Edge deployment, zero-config HTTPS' },
            { tech: 'Semantic HTML', reason: 'Accessibility and SEO by default' },
          ].map(item => (
            <div key={item.tech} style={{
              padding: '12px 14px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#22d3a4', marginBottom: '4px' }}>{item.tech}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.reason}</div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'outcome',
    label: '04 — Outcome',
    title: 'What it demonstrates',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    color: '#f59e0b',
    content: (
      <>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16, fontSize: '0.95rem', fontWeight: 300 }}>
          The result: a 95+ Lighthouse score on performance, accessibility, and best practices. More importantly, the codebase communicates intent — any developer reading the components can understand architectural decisions without comments.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {[
            { metric: '95+', label: 'Lighthouse Score' },
            { metric: '<2s', label: 'First Contentful Paint' },
            { metric: '0', label: 'External UI Libraries' },
            { metric: '100%', label: 'Custom Components' },
          ].map(m => (
            <div key={m.label} style={{
              padding: '16px 20px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              textAlign: 'center',
              minWidth: '100px',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#f59e0b',
                letterSpacing: '-0.02em',
              }}>{m.metric}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </>
    ),
  },
]

export default function CaseStudy() {
  const sectionRef = useScrollReveal()
  const [active, setActive] = useState('problem')

  const activePhase = phases.find(p => p.id === active)

  return (
    <section id="casestudy" className="section" style={{ background: 'var(--bg-secondary)' }} ref={sectionRef}>
      <div className="container">
        <div className="reveal">
          <p className="section-label">04 — Case Study</p>
          <h2 className="section-title">How this portfolio was built</h2>
          <p className="section-subtitle" style={{ marginBottom: '56px' }}>
            Engineering thinking in practice — not just what was built, but why every decision was made.
          </p>
        </div>

        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '24px',
          alignItems: 'start',
        }}>
          {/* Phase selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {phases.map(phase => (
              <button
                key={phase.id}
                onClick={() => setActive(phase.id)}
                style={{
                  background: active === phase.id ? 'var(--bg-card-hover)' : 'transparent',
                  border: `1px solid ${active === phase.id ? phase.color + '44' : 'var(--border-subtle)'}`,
                  borderRadius: '10px',
                  padding: '14px 16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
                onMouseEnter={e => {
                  if (active !== phase.id) {
                    e.currentTarget.style.borderColor = phase.color + '33'
                    e.currentTarget.style.background = 'var(--bg-card)'
                  }
                }}
                onMouseLeave={e => {
                  if (active !== phase.id) {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                <span style={{ color: active === phase.id ? phase.color : 'var(--text-muted)' }}>
                  {phase.icon}
                </span>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: active === phase.id ? phase.color : 'var(--text-muted)',
                    letterSpacing: '0.1em',
                    marginBottom: '2px',
                  }}>{phase.label}</div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: active === phase.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}>{phase.title}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Content area */}
          <div className="glass-card" style={{
            padding: '32px 36px',
            minHeight: '280px',
            borderColor: activePhase.color + '33',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px',
            }}>
              <span style={{ color: activePhase.color }}>{activePhase.icon}</span>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}>{activePhase.title}</h3>
            </div>
            {activePhase.content}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .case-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
