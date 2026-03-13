import React from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const principles = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    text: 'Interfaces that scale, not just render',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    text: 'Code readable months later',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" />
      </svg>
    ),
    text: 'HTML & CSS as architecture',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    text: 'Systems thinking over framework thinking',
  },
]

function PhotoCard() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        inset: '-30px',
        background: 'radial-gradient(ellipse at 60% 40%, rgba(0,212,255,0.2) 0%, rgba(168,85,247,0.14) 45%, transparent 70%)',
        filter: 'blur(25px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />
      {/* Grid texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
        borderRadius: '24px',
        zIndex: 0,
      }} />
      {/* Gradient border */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        borderRadius: '24px',
        padding: '3px',
        background: 'linear-gradient(135deg, rgba(0,212,255,0.5) 0%, rgba(168,85,247,0.4) 50%, rgba(0,212,255,0.2) 100%)',
      }}>
        <div style={{ borderRadius: '22px', overflow: 'hidden', background: 'var(--bg-secondary)', position: 'relative' }}>
          {/* Photo */}
          <img
            src="/rajendra.jpg"
            alt="Rajendra Bist — Full-Stack Developer"
            loading="lazy"
            style={{
              width: '100%',
              aspectRatio: '3/4',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
            }}
          />
          {/* Bottom overlay */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            padding: '28px 18px 18px',
            background: 'linear-gradient(transparent, rgba(5,5,8,0.97) 45%)',
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.05rem',
              color: '#f0f0f5',
              marginBottom: '2px',
              letterSpacing: '-0.01em',
            }}>Rajendra Bist</p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--accent-cyan)',
              letterSpacing: '0.06em',
              marginBottom: '12px',
            }}>Full-Stack Developer</p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              background: 'rgba(34,211,164,0.12)',
              border: '1px solid rgba(34,211,164,0.3)',
              borderRadius: '999px',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#22d3a4',
                boxShadow: '0 0 6px #22d3a4',
                animation: 'ab-pulse 2s ease infinite',
              }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#22d3a4' }}>
                Open to opportunities
              </span>
            </div>
          </div>
          {/* Location badge */}
          <div style={{
            position: 'absolute',
            top: '14px', right: '14px',
            padding: '5px 10px',
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em' }}>
              Nepal 🇳🇵
            </span>
          </div>
        </div>
      </div>

      {/* Floating chip — top-left */}
      <div style={{
        position: 'absolute', top: '-18px', left: '-18px', zIndex: 10,
        padding: '10px 14px',
        background: 'rgba(5,5,8,0.92)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,212,255,0.3)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(0,212,255,0.08)',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)', lineHeight: 1, marginBottom: '2px' }}>~</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Passionate Builder</div>
      </div>

      {/* Floating chip — bottom-right */}
      <div style={{
        position: 'absolute', bottom: '-18px', right: '-18px', zIndex: 10,
        padding: '10px 14px',
        background: 'rgba(5,5,8,0.92)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(168,85,247,0.3)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(168,85,247,0.08)',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-purple)', lineHeight: 1, marginBottom: '2px' }}>~</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Projects in Progress</div>
      </div>

      <style>{`
        @keyframes ab-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
      `}</style>
    </div>
  )
}

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
          gridTemplateColumns: '360px 1fr',
          gap: '72px',
          marginTop: '60px',
          alignItems: 'start',
        }} className="about-grid">

          {/* Left: Photo */}
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
            <PhotoCard />
          </div>

          {/* Right: Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.02rem', fontWeight: 300 }}>
                My curiosity about the web started with a simple question:{' '}
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>why does this look the way it does?</span>{' '}
                That question pulled me from the surface — colors, layouts, animations — down into the underlying
                structure: boxes, flow, specificity, the cascade.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.02rem', fontWeight: 300 }}>
                The deeper I went, the more I understood that web development isn't about knowing frameworks.
                It's about understanding{' '}
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>constraints</span>{' '}
                — what the browser wants to do, what HTTP promises, what JavaScript can and cannot guarantee.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.02rem', fontWeight: 300 }}>
                Today I build full-stack products: semantic HTML, scalable CSS architectures, JavaScript-driven
                interfaces, and Node.js backends connected to MongoDB and MySQL. I use React and Next.js not as
                shortcuts, but as abstractions over principles I understand deeply.
              </p>
              {/* Pull quote */}
              <div style={{
                borderLeft: '3px solid var(--accent-cyan)',
                paddingLeft: '18px',
                paddingTop: '4px',
              }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1.55,
                  letterSpacing: '-0.01em',
                }}>
                  "I value clean thinking over noisy code,<br />
                  and <span className="gradient-text">foundations over trends</span>."
                </p>
              </div>
            </div>

            {/* Principles grid */}
            <div className="reveal">
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                color: 'var(--text-muted)', letterSpacing: '0.12em',
                textTransform: 'uppercase', marginBottom: '12px',
              }}>What I care about</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {principles.map(p => (
                  <div key={p.text} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                    padding: '12px 14px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'
                      e.currentTarget.style.background = 'var(--bg-card-hover)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)'
                      e.currentTarget.style.background = 'var(--bg-card)'
                    }}
                  >
                    <span style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '1px' }}>{p.icon}</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{p.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech tags */}
            <div className="reveal">
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                color: 'var(--text-muted)', letterSpacing: '0.12em',
                textTransform: 'uppercase', marginBottom: '12px',
              }}>Current stack</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'React Native'].map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                    padding: '5px 12px',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    color: 'var(--text-secondary)',
                    background: 'var(--bg-card)',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--accent-cyan)'
                      e.currentTarget.style.color = 'var(--accent-cyan)'
                      e.currentTarget.style.background = 'var(--accent-cyan-dim)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)'
                      e.currentTarget.style.color = 'var(--text-secondary)'
                      e.currentTarget.style.background = 'var(--bg-card)'
                    }}
                  >{t}</span>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="reveal">
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {[
                  { label: 'GitHub ↗', href: 'https://github.com/rajendrabist07' },
                  { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/rajendra-bist-169926370' },
                  { label: 'Facebook ↗', href: 'https://www.facebook.com/share/1Qfrt2ghkT/' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ fontSize: '0.82rem', padding: '9px 18px' }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
      `}</style>
    </section>
  )
}
