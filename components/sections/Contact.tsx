'use client'

import { useState } from 'react'
import { Github, Mail, Linkedin, Facebook, MapPin, Send, CheckCircle2, AlertCircle, Download } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { PERSONAL } from '@/lib/portfolio-data'
import Container from '@/components/ui/Container'

const links = [
  { label: 'Email', href: `mailto:${PERSONAL.email}`, icon: Mail },
  { label: 'LinkedIn', href: PERSONAL.linkedin, icon: Linkedin },
  { label: 'GitHub', href: PERSONAL.github, icon: Github },
  { label: 'Facebook', href: PERSONAL.facebook, icon: Facebook },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const updateField = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    setFeedback('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.error || 'Could not send message right now.')
      }

      setStatus('success')
      setFeedback('Message saved. Rajendra can review it from the portfolio database.')
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus('error')
      setFeedback(error instanceof Error ? error.message : 'Could not send message right now.')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-28">
      <Container>
        <div className="text-center">
          <h2 className="fluid-h2 font-black tracking-tight text-white">
            Open to the right opportunity
          </h2>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Remote worldwide · Onsite Nepal · UTC+5:45
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[rgba(191,226,216,0.22)] bg-[rgba(191,226,216,0.10)] px-4 py-1.5 text-xs font-medium text-[--success]">
            <span className="h-2 w-2 rounded-full bg-[--success] shadow-[0_0_12px_rgba(191,226,216,0.72)] animate-pulse" />
            Available for new roles
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Form */}
          <form onSubmit={handleSubmit} className="surface-panel rounded-2xl p-6 shadow-2xl sm:p-8">
            <h3 className="text-xl font-semibold text-white">Send a message</h3>
            <div className="mt-6 space-y-4">
              <label htmlFor="contact-name" className="block">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Name</span>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={event => updateField('name', event.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[--border] bg-white/[0.03] px-4 py-3.5 text-sm text-slate-100 outline-none transition-all duration-200 ease-out placeholder:text-slate-600 focus:border-[--accent-primary] focus:ring-2 focus:ring-[rgba(224,185,166,0.20)]"
                  placeholder="Your name"
                  required
                />
              </label>
              <label htmlFor="contact-email" className="block">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Email</span>
                <input
                  id="contact-email"
                  name="email"
                  value={form.email}
                  onChange={event => updateField('email', event.target.value)}
                  type="email"
                  className="mt-1.5 w-full rounded-xl border border-[--border] bg-white/[0.03] px-4 py-3.5 text-sm text-slate-100 outline-none transition-all duration-200 ease-out placeholder:text-slate-600 focus:border-[--accent-primary] focus:ring-2 focus:ring-[rgba(224,185,166,0.20)]"
                  placeholder="you@company.com"
                  required
                />
              </label>
              <label htmlFor="contact-message" className="block">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Message</span>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={event => updateField('message', event.target.value)}
                  className="mt-1.5 min-h-[140px] w-full resize-none rounded-xl border border-[--border] bg-white/[0.03] px-4 py-3.5 text-sm text-slate-100 outline-none transition-all duration-200 ease-out placeholder:text-slate-600 focus:border-[--accent-primary] focus:ring-2 focus:ring-[rgba(224,185,166,0.20)]"
                  placeholder="Tell me about the role or project..."
                  required
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="premium-button-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 ease-out hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-primary] focus-visible:ring-offset-2 focus-visible:ring-offset-[--bg-primary]"
            >
              <Send size={16} />
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {feedback ? (
              <p className={`mt-3 flex items-center gap-2 text-xs ${status === 'success' ? 'text-[--success]' : 'text-[#e0b9a6]'}`}>
                {status === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                {feedback}
              </p>
            ) : null}
          </form>

          {/* Right Column: Contact Cards + Download Resume */}
          <div className="flex flex-col justify-between gap-4">
            <div className="space-y-3">
              {links.map(link => {
                const Icon = link.icon
                const display = link.href.replace('mailto:', '').replace(/https?:\/\//, '').replace('www.', '').replace('github.com/', '').replace('linkedin.com/in/', '')
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="surface-panel group flex items-center gap-4 rounded-xl p-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[--border-hover] hover:bg-white/[0.04]"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[rgba(224,185,166,0.10)] text-[--accent-primary] transition-colors duration-200 ease-out group-hover:bg-[rgba(224,185,166,0.18)] group-hover:text-white">
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">{link.label}</p>
                      <p className="mt-0.5 truncate font-medium text-white">{display}</p>
                    </div>
                  </a>
                )
              })}
            </div>

            <a
              href={PERSONAL.resumeUrl}
              download="Rajendra-Bist-Resume.pdf"
              className="premium-button-primary mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 ease-out hover:scale-[1.01] active:scale-[0.99]"
            >
              <Download size={16} />
              Download Resume
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
