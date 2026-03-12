import React from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const highlights = [
  { number: '2+', label: 'Years Building' },
  { number: '10+', label: 'Projects Shipped' },
  { number: '5+', label: 'Technologies' },
  { number: '∞', label: 'Still Curious' },
]

const principles = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Interfaces that scale, not just render',
    body: 'Every component I build is designed to survive — under load, under changing requirements, under new team members.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Code readable months later',
    body: 'Naming, structure, and intentionality — code is communication. I write for the next engineer, not the compiler.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'HTML & CSS as architecture',
    body: 'Semantic HTML and scalable CSS are not setup steps — they are decisions with long-term consequences.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Systems thinking over framework thinking',
    body: 'React and Next.js are abstractions. I learn the abstraction by understanding what it abstracts away first.',
  },
]

export default function About() {
  const sectionRef = useScrollReveal()

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className="container">
        <div className="reveal">
          <p className="section-label">01 — About</p>
          <h2 className="section-title">The thinking behind the work</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          marginTop: '56px',
          alignItems: 'start',
        }} className="about-grid">
          {/* Left: narrative */}
          <div className="reveal">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', fontWeight: 300 }}>
                My curiosity about the web started with a simple question: <em style={{ color: 'var(--text-primary)', fontStyle: 'normal', fontWeight: 500 }}>why does this look the way it does?</em> That question pulled me from the surface — colors, layouts, animations — down into the underlying structure: boxes, flow, specificity, the cascade.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', fontWeight: 300 }}>
                The deeper I went, the more I understood that web development isn't about knowing frameworks. It's about understanding <em style={{ color: 'var(--text-primary)', fontStyle: 'normal', fontWeight: 500 }}>constraints</em> — what the browser wants to do, what HTTP promises, what JavaScript can and cannot guarantee.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', fontWeight: 300 }}>
                Today, I build full-stack products: semantic HTML, scalable CSS architectures, JavaScript-driven interfaces, and Node.js backends that talk to MongoDB and MySQL. I reach for React and Next.js when the problem warrants it — not by default.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', fontWeight: 300 }}>
                I value <em style={{ color: 'var(--accent-cyan)', fontStyle: 'normal', fontWeight: 500 }}>clean thinking over noisy code</em>, and foundations over trends. If you enjoy discussing how web systems actually work — beyond the framework layer — let's connect.
              </p>
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '36px', flexWrap: 'wrap' }}>
              {[
                { label: 'GitHub', href: 'https://github.com/rajendrabist07', color: '#f0f0f5' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rajendra-bist-169926370', color: '#0a66c2' },
                { label: 'Facebook', href: 'https://www.facebook.com/share/1Qfrt2ghkT/', color: '#1877f2' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ fontSize: '0.82rem', padding: '8px 18px' }}
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Right: stats + principles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Stats */}
            <div className="reveal" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}>
              {highlights.map(h => (
                <div key={h.label} className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.2rem',
                    fontWeight: 800,
                    color: 'var(--accent-cyan)',
                    marginBottom: '4px',
                    letterSpacing: '-0.03em',
                  }}>{h.number}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>{h.label}</div>
                </div>
              ))}
            </div>

            {/* Principles */}
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {principles.map(p => (
                <div key={p.title} className="glass-card" style={{ padding: '18px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    color: 'var(--accent-cyan)',
                    flexShrink: 0,
                    marginTop: '2px',
                    opacity: 0.8,
                  }}>{p.icon}</div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '4px',
                    }}>{p.title}</div>
                    <div style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      fontWeight: 300,
                    }}>{p.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
