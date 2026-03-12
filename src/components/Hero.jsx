import React, { useEffect, useRef, useState } from 'react'

// Animated orb background
function AmbientBackground() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      {/* Orb 1 — cyan */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '5%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)',
        animation: 'orb-float 8s ease-in-out infinite',
      }} />
      {/* Orb 2 — purple */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)',
        animation: 'orb-float 10s ease-in-out infinite reverse',
      }} />
      {/* Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      }} />
      <style>{`
        @keyframes orb-float {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(20px,-30px) scale(1.05); }
          66% { transform: translate(-15px, 20px) scale(0.97); }
        }
      `}</style>
    </div>
  )
}

// Scroll indicator
function ScrollIndicator() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '40px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      animation: 'fade-up 1s ease 1.5s both',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.15em',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
      }}>scroll</span>
      <div style={{
        width: '20px',
        height: '32px',
        border: '1.5px solid var(--border-subtle)',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '6px',
      }}>
        <div style={{
          width: '3px',
          height: '8px',
          background: 'var(--accent-cyan)',
          borderRadius: '2px',
          animation: 'scroll-dot 1.6s ease-in-out infinite',
        }} />
      </div>
      <style>{`
        @keyframes scroll-dot {
          0%,100% { transform: translateY(0); opacity: 1; }
          60% { transform: translateY(8px); opacity: 0.3; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}

// Animated status badge
function StatusBadge() {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 14px',
      background: 'var(--accent-cyan-dim)',
      border: '1px solid rgba(0,212,255,0.2)',
      borderRadius: '999px',
      marginBottom: '28px',
      animation: 'fade-in 0.6s ease 0.2s both',
    }}>
      <span style={{
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        background: 'var(--accent-green)',
        boxShadow: '0 0 8px var(--accent-green)',
        animation: 'pulse-dot 2s ease infinite',
      }} />
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        color: 'var(--accent-cyan)',
        letterSpacing: '0.05em',
      }}>
        Open to opportunities
      </span>
      <style>{`
        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.6; transform:scale(1.3); }
        }
        @keyframes fade-in {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default function Hero() {
  const handleViewProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }
  const handleExploreWork = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

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

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '100px' }}>
        <StatusBadge />

        {/* Name */}
        <div style={{ animation: 'fade-in 0.7s ease 0.4s both' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            marginBottom: '10px',
            letterSpacing: '0.1em',
          }}>
            Hello, I'm
          </p>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: '12px',
            letterSpacing: '-0.03em',
          }}>
            Rajendra<br />
            <span className="gradient-text">Bist</span>
          </h1>
        </div>

        {/* Title */}
        <div style={{ animation: 'fade-in 0.7s ease 0.6s both' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
            color: 'var(--text-accent)',
            letterSpacing: '0.08em',
            marginBottom: '28px',
            opacity: 0.9,
          }}>
            Full-Stack Developer  ·  Systems-First Thinking  ·  Web Architecture &amp; Scale
          </p>
        </div>

        {/* Statement */}
        <div style={{ animation: 'fade-in 0.7s ease 0.8s both', maxWidth: '680px' }}>
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            marginBottom: '40px',
            fontWeight: 300,
          }}>
            I build web applications by focusing on fundamentals first — structure,
            constraints, and predictable behavior — then layering modern tools on top.
            I use React and Next.js not as shortcuts, but as abstractions over principles
            I understand deeply.
          </p>
        </div>

        {/* Values chips */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '48px',
          animation: 'fade-in 0.7s ease 1.0s both',
        }}>
          {[
            'Interfaces that scale, not just render',
            'Code readable months later',
            'HTML/CSS as architecture',
            'Frontend & Backend co-evolution',
          ].map(v => (
            <span key={v} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
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
            >
              {v}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '14px',
          flexWrap: 'wrap',
          animation: 'fade-in 0.7s ease 1.2s both',
        }}>
          <button className="btn-primary" onClick={handleViewProjects}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            View Projects
          </button>
          <button className="btn-secondary" onClick={handleExploreWork}>
            Explore Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12,5 19,12 12,19"/>
            </svg>
          </button>
          <a
            href="https://github.com/rajendrabist07"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
