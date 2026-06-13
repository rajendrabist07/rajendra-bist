'use client'

import { useState } from 'react'
import { Github, Mail, Linkedin, MapPin, Send, CheckCircle2, AlertCircle, Download } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { PERSONAL } from '@/lib/portfolio-data'

const links = [
  { label: 'Email', href: `mailto:${PERSONAL.email}`, icon: Mail },
  { label: 'LinkedIn', href: PERSONAL.linkedin, icon: Linkedin },
  { label: 'GitHub', href: PERSONAL.github, icon: Github },
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
    <section id="contact" className="relative overflow-hidden px-6 py-24 md:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-[12%] top-[18%] h-1 w-1 rounded-full bg-white" />
        <div className="absolute left-[24%] top-[72%] h-1 w-1 rounded-full bg-white/70" />
        <div className="absolute right-[18%] top-[24%] h-1 w-1 rounded-full bg-white/60" />
        <div className="absolute right-[30%] bottom-[12%] h-1 w-1 rounded-full bg-white/50" />
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <SectionHeader subtitle="Get in touch" title="Open to Meaningful Opportunities" />
          <p className="mx-auto -mt-4 max-w-2xl text-slate-400">
            Remote-first full-stack work, backend-heavy products, AI-integrated tools, and practical freelance builds.
          </p>
          <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-5 py-3 text-emerald-300">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
            Available for new roles and collaborations
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <form onSubmit={handleSubmit} className="surface-panel rounded-3xl p-6 shadow-glow sm:p-8">
            <h3 className="text-2xl font-semibold text-white">Send a message</h3>
            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-400">Name</span>
                <input
                  value={form.name}
                  onChange={event => updateField('name', event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-400">Email</span>
                <input
                  value={form.email}
                  onChange={event => updateField('email', event.target.value)}
                  type="email"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60"
                  placeholder="you@company.com"
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-400">Message</span>
                <textarea
                  value={form.message}
                  onChange={event => updateField('message', event.target.value)}
                  className="mt-2 min-h-[168px] w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60"
                  placeholder="Tell me about the role, project, or idea..."
                  required
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-4 text-base font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={18} />
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {feedback ? (
              <p className={`mt-4 flex items-center gap-2 text-sm ${status === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>
                {status === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {feedback}
              </p>
            ) : null}
          </form>

          <div className="space-y-4">
            <div className="surface-panel rounded-3xl p-6">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="mt-1 font-semibold text-white">{PERSONAL.location} · Remote worldwide</p>
                </div>
              </div>
            </div>
            {links.map(link => {
              const Icon = link.icon
              const display = link.href.replace('mailto:', '').replace(/https?:\/\//, '').replace('www.', '')
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="surface-panel group block rounded-3xl p-6 transition hover:border-indigo-400/40 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300 transition group-hover:bg-indigo-500 group-hover:text-white">
                      <Icon size={20} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-slate-500">{link.label}</p>
                      <p className="mt-1 break-words font-semibold text-white">{display}</p>
                    </div>
                  </div>
                </a>
              )
            })}
            <a
              href={PERSONAL.resumeUrl}
              download="Rajendra-Bist-Resume.pdf"
              className="surface-panel group block rounded-3xl p-6 transition hover:border-indigo-400/40 hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 transition group-hover:bg-emerald-500 group-hover:text-white">
                  <Download size={20} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-slate-500">Resume</p>
                  <p className="mt-1 break-words font-semibold text-white">Download Resume</p>
                </div>
              </div>
            </a>
            <a
              href="#home"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              Back to top
            </a>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-slate-500">© 2026 Rajendra Bist. Built with Next.js, MongoDB, and Gemini AI.</p>
      </div>
    </section>
  )
}
