'use client';

import React, { useState } from 'react';
import { Github, Mail, Linkedin, Facebook, Send, CheckCircle2, AlertCircle, Download, ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { PERSONAL } from '@/lib/portfolio-data';
import Container from '@/components/ui/Container';

const links = [
  { label: 'Email', href: `mailto:${PERSONAL.email}`, icon: Mail, value: PERSONAL.email },
  { label: 'LinkedIn', href: PERSONAL.linkedin, icon: Linkedin, value: 'linkedin.com/in/bistrajendra07' },
  { label: 'GitHub', href: PERSONAL.github, icon: Github, value: 'github.com/rajendrabist07' },
  { label: 'Facebook', href: PERSONAL.facebook, icon: Facebook, value: 'facebook.com/bistrajendra07' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', _hp: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setFeedback('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || 'Could not send message right now.');
      }

      setStatus('success');
      setFeedback('Message delivered. Rajendra will respond to your email shortly.');
      setForm({ name: '', email: '', message: '', _hp: '' });
    } catch (error) {
      setStatus('error');
      setFeedback(error instanceof Error ? error.message : 'Could not send message right now.');
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-28 border-t border-[--border-subtle]">
      <Container>
        <SectionHeader
          eyebrow="07 // CONTACT & INQUIRIES"
          title="Initiate a Collaboration"
          description="Available for full-stack, distributed backend, and AI infrastructure engineering roles. Remote worldwide or onsite Nepal."
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Terminal Noir Form */}
          <form
            onSubmit={handleSubmit}
            className="surface-panel rounded-2xl p-6 shadow-2xl sm:p-8 border border-[--border-strong] bg-[--bg-surface-2]"
          >
            <div className="flex items-center justify-between border-b border-[--border-subtle] pb-4 font-mono text-xs">
              <span className="font-bold text-[--text-primary]">&gt; send_message.sh</span>
              <span className="text-[--accent-cool] flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[--accent-cool] animate-pulse" />
                ENDPOINT READY
              </span>
            </div>

            {/* Honeypot Spam Trap */}
            <input
              type="text"
              name="_hp"
              value={form._hp}
              onChange={(e) => updateField('_hp', e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="mt-6 space-y-4 font-mono text-xs">
              <label htmlFor="contact-name" className="block">
                <span className="font-medium text-[--text-secondary]">NAME *</span>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[--border-subtle] bg-[--bg-surface] px-4 py-3.5 text-sm text-[--text-primary] outline-none transition-all duration-200 placeholder:text-[--text-tertiary] focus:border-[--accent-warm] focus:ring-1 focus:ring-[--accent-warm]"
                  placeholder="Your full name"
                  required
                />
              </label>

              <label htmlFor="contact-email" className="block">
                <span className="font-medium text-[--text-secondary]">EMAIL ADDRESS *</span>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[--border-subtle] bg-[--bg-surface] px-4 py-3.5 text-sm text-[--text-primary] outline-none transition-all duration-200 placeholder:text-[--text-tertiary] focus:border-[--accent-warm] focus:ring-1 focus:ring-[--accent-warm]"
                  placeholder="name@company.com"
                  required
                />
              </label>

              <label htmlFor="contact-message" className="block">
                <span className="font-medium text-[--text-secondary]">MESSAGE *</span>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className="mt-1.5 min-h-[140px] w-full resize-none rounded-xl border border-[--border-subtle] bg-[--bg-surface] px-4 py-3.5 text-sm text-[--text-primary] outline-none transition-all duration-200 placeholder:text-[--text-tertiary] focus:border-[--accent-warm] focus:ring-1 focus:ring-[--accent-warm]"
                  placeholder="Outline the role, architecture challenge, or engineering proposal..."
                  required
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="premium-button-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-mono text-xs font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm]"
            >
              <Send size={15} />
              {status === 'sending' ? 'Dispatching Message...' : 'Dispatch Message'}
            </button>

            {feedback && (
              <p
                className={`mt-3 flex items-center gap-2 font-mono text-xs ${
                  status === 'success' ? 'text-[--accent-cool]' : 'text-[--danger]'
                }`}
              >
                {status === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                {feedback}
              </p>
            )}
          </form>

          {/* Right Column: Communication Cards + CV Download */}
          <div className="flex flex-col justify-between gap-4 font-mono text-xs">
            <div className="space-y-3">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="surface-panel group flex items-center justify-between rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[--border-strong]"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[--bg-surface-2] border border-[--border-subtle] text-[--accent-warm] transition-colors group-hover:border-[--accent-warm]">
                        <Icon size={17} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] text-[--text-tertiary] uppercase">{link.label}</p>
                        <p className="truncate font-medium text-[--text-primary] text-xs">{link.value}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={15} className="text-[--text-tertiary] transition-colors group-hover:text-[--accent-warm]" />
                  </a>
                );
              })}
            </div>

            <a
              href={PERSONAL.resumeUrl}
              download="Rajendra-Bist-Resume.pdf"
              className="premium-button-secondary mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-semibold transition-all duration-200 hover:border-[--accent-warm]"
            >
              <Download size={15} className="text-[--accent-warm]" />
              Download Full Curriculum Vitae (PDF)
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
