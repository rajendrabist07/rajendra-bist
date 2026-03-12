import React, { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const socials = [
  {
    name: 'GitHub',
    handle: '@rajendrabist396',
    href: 'https://github.com/rajendrabist396',
    desc: 'See the code behind the projects',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: '#f0f0f5',
  },
  {
    name: 'LinkedIn',
    handle: 'Rajendra Bist',
    href: 'https://www.linkedin.com/in/rajendra-bist-169926370',
    desc: 'Professional profile and connections',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    color: '#0a66c2',
  },
  {
    name: 'Facebook',
    handle: 'Rajendra Bist',
    href: 'https://www.facebook.com/share/1Qfrt2ghkT/',
    desc: 'Connect on Facebook',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    color: '#1877f2',
  },

  {
    name: "Instagram",
    handle: "@rajendrabist",
    href: "https://www.instagram.com/rajendrabist07/",
    desc: "Connect on Instagram",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.01 4 20 5.99 20 7.75v8.5c0 1.76-1.99 3.75-3.75 3.75h-8.5C5.99 20 4 18.01 4 16.25v-8.5C4 5.99 5.99 4 7.75 4zm8.75 1.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
      </svg>
    ),
    color: "#E4405F"
  }
]

export default function Contact() {
  const sectionRef = useScrollReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | null

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate submit (replace with Formspree/EmailJS in production)
    await new Promise(r => setTimeout(r, 1200))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-secondary)' }} ref={sectionRef}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <p className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>06 — Contact</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Let's build something together</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 60px', textAlign: 'center' }}>
            If you're working on interesting problems or want to discuss how web systems actually work — I'd like to hear from you.
          </p>
        </div>

        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '48px',
          alignItems: 'start',
        }}>
          {/* Left: email + socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Email CTA */}
            <div className="glass-card" style={{ padding: '28px 24px' }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>Email me directly</p>
              <a
                href="mailto:rajendrabist07@gmail.com"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--accent-cyan)',
                  display: 'block',
                  marginBottom: '8px',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                rajendrabist396@gmail.com
              </a>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 300 }}>
                Average response time: 24 hours
              </p>
            </div>

            {/* Social links */}
            {socials.map(s => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card"
                style={{
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = s.color + '44'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)'
                  e.currentTarget.style.transform = 'none'
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: s.color + '15',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: s.color, flexShrink: 0,
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600, fontSize: '0.9rem',
                    color: 'var(--text-primary)', marginBottom: '2px',
                  }}>{s.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 300 }}>{s.desc}</div>
                </div>
                <svg style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            ))}
          </div>

          {/* Right: contact form */}
          <div className="glass-card" style={{ padding: '36px 32px' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}>Send a message</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '28px', fontWeight: 300 }}>
              Whether it's a project, a question, or just wanting to connect — I read every message.
            </p>

            {status === 'sent' ? (
              <div style={{
                padding: '24px',
                background: 'rgba(34, 211, 164, 0.08)',
                border: '1px solid rgba(34, 211, 164, 0.3)',
                borderRadius: '12px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✓</div>
                <p style={{ color: '#22d3a4', fontWeight: 600, marginBottom: '4px' }}>Message sent!</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {[
                  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Rohan Sharma' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'rohan@example.com' },
                ].map(field => (
                  <div key={field.name}>
                    <label style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}>{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '10px',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--accent-cyan)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
                    />
                  </div>
                ))}

                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about what you're building..."
                    required
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent-cyan)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary"
                  style={{ alignSelf: 'flex-start', opacity: status === 'sending' ? 0.7 : 1 }}
                >
                  {status === 'sending' ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
