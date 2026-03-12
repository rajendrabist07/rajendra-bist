import React from 'react'

function AmbientBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', top: '-8%', right: '0%',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 65%)',
        animation: 'orb-float 9s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', left: '-8%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 65%)',
        animation: 'orb-float 11s ease-in-out infinite reverse',
      }} />
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)',
      }} />
      <style>{`
        @keyframes orb-float {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(24px,-36px) scale(1.04); }
          66% { transform: translate(-18px, 22px) scale(0.97); }
        }
      `}</style>
    </div>
  )
}

function ScrollIndicator() {
  return (
    <div style={{
      position: 'absolute', bottom: '40px', left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: '8px',
      animation: 'hero-fade-in 0.6s ease 1.8s both',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
        letterSpacing: '0.18em', color: 'var(--text-muted)',
        textTransform: 'uppercase',
      }}>scroll</span>
      <div style={{
        width: '20px', height: '32px',
        border: '1.5px solid var(--border-subtle)',
        borderRadius: '10px',
        display: 'flex', justifyContent: 'center', paddingTop: '6px',
      }}>
        <div style={{
          width: '3px', height: '8px',
          background: 'var(--accent-cyan)',
          borderRadius: '2px',
          animation: 'scroll-dot 1.8s ease-in-out infinite',
        }} />
      </div>
      <style>{`
        @keyframes scroll-dot {
          0%,100% { transform: translateY(0); opacity: 1; }
          60% { transform: translateY(9px); opacity: 0.2; }
        }
        @keyframes hero-fade-in {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default function Hero() {
  const handleViewProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  const handleExploreWork  = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <AmbientBackground />

      <div className="container hero-grid" style={{
        position: 'relative', zIndex: 1,
        paddingTop: '100px',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '48px',
        alignItems: 'center',
      }}>

        {/* Left: Text content */}
        <div>
          {/* Status badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 14px',
            background: 'rgba(0,212,255,0.08)',
            border: '1px solid rgba(0,212,255,0.18)',
            borderRadius: '999px',
            marginBottom: '28px',
            animation: 'h-in 0.6s ease 0.2s both',
          }}>
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#22d3a4',
              boxShadow: '0 0 8px #22d3a4',
              animation: 'h-pulse 2s ease infinite',
            }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)', letterSpacing: '0.04em' }}>
              Open to opportunities
            </span>
          </div>

          {/* Name */}
          <div style={{ animation: 'h-in 0.7s ease 0.35s both' }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
              color: 'var(--text-muted)', marginBottom: '8px',
              letterSpacing: '0.1em',
            }}>Hello, I'm</p>
            <h1 style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1.0,
              marginBottom: '14px',
              letterSpacing: '-0.03em',
              fontFamily: 'var(--font-display)',
            }}>
              Rajendra<br />
              <span className="gradient-text">Bist</span>
            </h1>
          </div>

          {/* Role */}
          <div style={{ animation: 'h-in 0.7s ease 0.5s both' }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.7rem, 1.3vw, 0.85rem)',
              color: 'var(--text-accent)',
              letterSpacing: '0.06em',
              marginBottom: '24px',
              opacity: 0.85,
            }}>
              Full-Stack Developer · Systems-First Thinking · Web Architecture &amp; Scale
            </p>
          </div>

          {/* Statement */}
          <div style={{ animation: 'h-in 0.7s ease 0.65s both', maxWidth: '600px' }}>
            <p style={{
              fontSize: 'clamp(0.95rem, 1.6vw, 1.12rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '36px',
              fontWeight: 300,
            }}>
              I build web applications by focusing on fundamentals first — structure,
              constraints, and predictable behavior — then layering modern tools on top.
              I use React and Next.js not as shortcuts, but as abstractions over
              principles I understand deeply.
            </p>
          </div>

          {/* Value chips */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '8px',
            marginBottom: '40px',
            animation: 'h-in 0.7s ease 0.8s both',
          }}>
            {[
              '⬡ Interfaces that scale',
              '⬡ Code readable later',
              '⬡ HTML/CSS as architecture',
              '⬡ Full-stack systems',
            ].map(v => (
              <span key={v} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                padding: '5px 12px',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
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
                e.currentTarget.style.background = 'transparent'
              }}
              >{v}</span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: '12px', flexWrap: 'wrap',
            animation: 'h-in 0.7s ease 1s both',
          }}>
            <button className="btn-primary" onClick={handleViewProjects}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              View Projects
            </button>
            <button className="btn-secondary" onClick={handleExploreWork}>
              Explore Work
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12,5 19,12 12,19"/>
              </svg>
            </button>
            <a href="https://github.com/rajendrabist07" target="_blank" rel="noopener noreferrer"
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Right: Developer photo */}
        <div style={{
          animation: 'h-photo-in 0.9s ease 0.5s both',
          flexShrink: 0,
        }} className="hero-photo">
          <div style={{
            position: 'relative',
            width: '280px',
          }}>
            {/* Outer glow */}
            <div style={{
              position: 'absolute', inset: '-20px',
              background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }} />
            {/* Rotating dashed ring */}
            <div style={{
              position: 'absolute', inset: '-12px',
              borderRadius: '50%',
              border: '1px dashed rgba(0,212,255,0.25)',
              animation: 'ring-spin 20s linear infinite',
            }} />
            {/* Photo circle */}
            <div style={{
              width: '280px', height: '280px',
              borderRadius: '50%',
              padding: '4px',
              background: 'linear-gradient(135deg, rgba(0,212,255,0.6) 0%, rgba(168,85,247,0.5) 50%, rgba(0,212,255,0.2) 100%)',
              position: 'relative',
              zIndex: 1,
            }}>
              <div style={{
                width: '100%', height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'var(--bg-secondary)',
              }}>
                <img
                  src="/rajendra.jpg"
                  alt="Rajendra Bist"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                    transform: 'scale(1.08)',
                  }}
                />
              </div>
            </div>

            {/* Floating badge: React */}
            <div style={{
              position: 'absolute', top: '20px', right: '-20px', zIndex: 10,
              padding: '8px 12px',
              background: 'rgba(5,5,8,0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(97,218,251,0.3)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <svg viewBox="0 0 24 24" width="14" height="14">
                <circle cx="12" cy="12" r="12" fill="#20232a"/>
                <g fill="none" stroke="#61dafb" strokeWidth="1.2">
                  <ellipse cx="12" cy="12" rx="8" ry="3"/>
                  <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(60 12 12)"/>
                  <ellipse cx="12" cy="12" rx="8" ry="3" transform="rotate(120 12 12)"/>
                </g>
                <circle cx="12" cy="12" r="1.8" fill="#61dafb"/>
              </svg>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#61dafb' }}>React</span>
            </div>

            {/* Floating badge: Node.js */}
            <div style={{
              position: 'absolute', bottom: '28px', left: '-24px', zIndex: 10,
              padding: '8px 12px',
              background: 'rgba(5,5,8,0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(104,160,99,0.3)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#68a063', display: 'inline-block' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#68a063' }}>Node.js</span>
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator />

      <style>{`
        @keyframes h-in {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes h-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.5; transform:scale(1.4); }
        }
        @keyframes h-photo-in {
          from { opacity: 0; transform: translateX(30px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-photo { display: none !important; }
        }
      `}</style>
    </section>
  )
}
