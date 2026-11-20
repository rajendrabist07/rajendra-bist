'use client';

import React, { useState } from 'react';
import {
  Github,
  Mail,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
  Download,
  Phone,
  Copy,
  Check,
  Eye,
  ExternalLink,
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { PERSONAL } from '@/lib/portfolio-data';
import Container from '@/components/ui/Container';
import { Toast } from '@/components/primitives/Toast';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    _hp: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [feedback, setFeedback] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Phone reveal state
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [copiedKey, setCopiedKey] = useState<'email' | 'phone' | null>(null);

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(type);
      setToastMessage(`${type === 'email' ? 'Email' : 'Phone'} copied to clipboard`);
      setTimeout(() => setCopiedKey(null), 2500);
      setTimeout(() => setToastMessage(null), 4000);
    } catch {
      setToastMessage('Could not copy to clipboard');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const validateForm = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!form.name.trim()) {
      errs.name = 'Full name is required.';
    }
    if (!form.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!form.message.trim()) {
      errs.message = 'Message content cannot be blank.';
    } else if (form.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      setStatus('error');
      setFeedback('Please resolve the highlighted errors below before submitting.');
      return;
    }

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
        throw new Error(data?.message || data?.error || 'Could not send message right now.');
      }

      setStatus('success');
      setFeedback('Message delivered. Rajendra will respond to your email shortly.');
      setForm({ name: '', email: '', message: '', _hp: '' });
      setErrors({});
    } catch (error) {
      setStatus('error');
      setFeedback(
        error instanceof Error
          ? error.message
          : 'Could not send message right now.'
      );
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 md:py-32"
      aria-label="Contact and Inquiries"
    >
      <Container className="relative z-10">
        <SectionHeader
          eyebrow="Contact · Direct Inquiries"
          title="Send a role or a problem."
          description="Available for full-time backend and full-stack software engineering roles (Delhi NCR & Remote)."
        />

        {/* Availability & Timezone Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="inline-flex items-center gap-2 rounded-[--radius-control] border border-[--status-live] bg-[--status-live-dim] px-3 py-1 text-[--status-live]">
            <span className="h-2 w-2 rounded-full bg-[--status-live] animate-pulse" />
            {PERSONAL.availability.formatted}
          </span>
          <span className="rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] px-3 py-1 text-[--text-tertiary]">
            New Delhi · IST (UTC+5:30)
          </span>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Form with Accessible Inline Errors & Summary */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-[--radius-card] border border-[--border-strong] bg-[--bg-surface-1] p-6 shadow-xl sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-[--border-hairline] pb-4 font-mono text-xs">
              <span className="font-bold text-[--text-primary]">
                Direct Message Dispatch
              </span>
              <span className="text-[--text-tertiary] text-[11px]">
                Direct to inbox
              </span>
            </div>

            {/* Error Summary Alert */}
            {status === 'error' && feedback && (
              <div
                role="alert"
                aria-live="assertive"
                className="mt-6 flex items-start gap-2.5 rounded-[--radius-control] border border-red-500/40 bg-red-500/10 p-3.5 font-mono text-xs text-red-700 dark:text-red-400 font-medium"
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{feedback}</span>
              </div>
            )}

            {/* Success Summary Alert */}
            {status === 'success' && feedback && (
              <div
                role="status"
                aria-live="polite"
                className="mt-6 flex items-start gap-2.5 rounded-[--radius-control] border border-[--status-live] bg-[--status-live-dim] p-3.5 font-mono text-xs text-[--status-live]"
              >
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                <span>{feedback}</span>
              </div>
            )}

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

            <div className="mt-6 space-y-5 font-mono text-xs">
              {/* Name Field */}
              <div>
                <label htmlFor="contact-name" className="block font-medium text-[--text-secondary]">
                  FULL NAME *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={`mt-1.5 w-full rounded-[--radius-control] border bg-[--bg-surface-2] px-4 py-3 text-sm text-[--text-primary] outline-none transition-all placeholder:text-[--text-tertiary] focus:border-[--accent] focus:ring-1 focus:ring-[--focus-ring] ${
                    errors.name ? 'border-red-500/80 ring-1 ring-red-500/40' : 'border-[--border-hairline]'
                  }`}
                  placeholder="e.g. Alex Mercer"
                  required
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1.5 text-[11px] text-red-700 dark:text-red-400 font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="contact-email" className="block font-medium text-[--text-secondary]">
                  EMAIL ADDRESS *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={`mt-1.5 w-full rounded-[--radius-control] border bg-[--bg-surface-2] px-4 py-3 text-sm text-[--text-primary] outline-none transition-all placeholder:text-[--text-tertiary] focus:border-[--accent] focus:ring-1 focus:ring-[--focus-ring] ${
                    errors.email ? 'border-red-500/80 ring-1 ring-red-500/40' : 'border-[--border-hairline]'
                  }`}
                  placeholder="alex@company.com"
                  required
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1.5 text-[11px] text-red-700 dark:text-red-400 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="contact-message" className="block font-medium text-[--text-secondary]">
                  MESSAGE / ROLE BRIEF *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  rows={5}
                  className={`mt-1.5 w-full resize-none rounded-[--radius-control] border bg-[--bg-surface-2] px-4 py-3 text-sm text-[--text-primary] outline-none transition-all placeholder:text-[--text-tertiary] focus:border-[--accent] focus:ring-1 focus:ring-[--focus-ring] ${
                    errors.message ? 'border-red-500/80 ring-1 ring-red-500/40' : 'border-[--border-hairline]'
                  }`}
                  placeholder="Detail the engineering team, role requirements, or architectural challenges..."
                  required
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-1.5 text-[11px] text-red-700 dark:text-red-400 font-medium">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons: Primary Send & Secondary Resume */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-[--radius-control] bg-[--accent] px-5 py-3.5 font-mono text-xs font-semibold text-[--accent-ink] transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
              >
                <Send size={14} />
                <span>{status === 'sending' ? 'Dispatching...' : 'Send message'}</span>
              </button>

              <a
                href={PERSONAL.resumeUrl}
                download="Rajendra_Bist_Full_Stack_Developer.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] px-4 py-3.5 font-mono text-xs font-medium text-[--text-secondary] transition-colors hover:text-[--text-primary] hover:border-[--border-strong] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
              >
                <Download size={14} className="text-[--accent]" />
                <span>Download resume (PDF)</span>
              </a>
            </div>

            {/* Privacy & Retention Disclosure */}
            <p className="mt-3 text-[11px] text-[--text-tertiary] text-center sm:text-left">
              I keep messages for 90 days, then they are deleted automatically.
            </p>
          </form>

          {/* Right Column: Direct Contact Hub Cards */}
          <div className="flex flex-col justify-between gap-4 font-mono text-xs">
            <div className="space-y-3.5">
              {/* Email Card with Direct Copy Button */}
              <div className="rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-4 transition-all hover:border-[--border-strong]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] text-[--accent]">
                      <Mail size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase text-[--text-tertiary]">
                        Direct Email
                      </p>
                      <a
                        href={`mailto:${PERSONAL.email}`}
                        className="truncate block font-medium text-[--text-primary] hover:text-[--accent] transition-colors text-xs"
                      >
                        {PERSONAL.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(PERSONAL.email, 'email')}
                    aria-label="Copy email address"
                    className="inline-flex items-center gap-1.5 rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] px-2.5 py-1.5 text-[11px] text-[--text-secondary] hover:text-[--text-primary] hover:border-[--border-strong] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--focus-ring] cursor-pointer"
                  >
                    {copiedKey === 'email' ? (
                      <>
                        <Check size={12} className="text-[--status-live]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Phone Card with Click-to-Reveal and Copy */}
              <div className="rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-4 transition-all hover:border-[--border-strong]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] text-[--accent]">
                      <Phone size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase text-[--text-tertiary]">
                        Direct Phone
                      </p>
                      {phoneRevealed ? (
                        <a
                          href={`tel:${PERSONAL.phone.replace(/\s+/g, '')}`}
                          className="truncate block font-medium text-[--text-primary] hover:text-[--accent] transition-colors text-xs"
                        >
                          {PERSONAL.phone}
                        </a>
                      ) : (
                        <p className="text-xs text-[--text-secondary]">
                          +91 8700 ••••••
                        </p>
                      )}
                    </div>
                  </div>
                  {phoneRevealed ? (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(PERSONAL.phone, 'phone')}
                      aria-label="Copy phone number"
                      className="inline-flex items-center gap-1.5 rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] px-2.5 py-1.5 text-[11px] text-[--text-secondary] hover:text-[--text-primary] hover:border-[--border-strong] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--focus-ring] cursor-pointer"
                    >
                      {copiedKey === 'phone' ? (
                        <>
                          <Check size={12} className="text-[--status-live]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPhoneRevealed(true)}
                      aria-label="Reveal full phone number"
                      className="inline-flex items-center gap-1.5 rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] px-2.5 py-1.5 text-[11px] text-[--text-secondary] hover:text-[--text-primary] hover:border-[--border-strong] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--focus-ring] cursor-pointer"
                    >
                      <Eye size={12} />
                      <span>Reveal</span>
                    </button>
                  )}
                </div>
              </div>

              {/* LinkedIn Direct Link */}
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-4 transition-all hover:border-[--border-strong]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] text-[--accent]">
                    <Linkedin size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase text-[--text-tertiary]">
                      Professional Profile
                    </p>
                    <p className="truncate font-medium text-[--text-primary] text-xs group-hover:text-[--accent] transition-colors">
                      linkedin.com/in/rajendra-bist-169926370
                    </p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-[--text-tertiary] group-hover:text-[--accent] transition-colors" />
              </a>

              {/* GitHub Direct Link */}
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-4 transition-all hover:border-[--border-strong]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] text-[--accent]">
                    <Github size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase text-[--text-tertiary]">
                      Code Repositories
                    </p>
                    <p className="truncate font-medium text-[--text-primary] text-xs group-hover:text-[--accent] transition-colors">
                      github.com/rajendrabist07
                    </p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-[--text-tertiary] group-hover:text-[--accent] transition-colors" />
              </a>
            </div>

            {/* Work Authorization Notice */}
            <div className="rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-2] p-4 text-[11px] text-[--text-tertiary] leading-relaxed">
              <span className="font-semibold text-[--text-secondary]">Work Authorization: </span>
              {PERSONAL.workAuthorization}
            </div>
          </div>
        </div>

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50">
            <Toast
              message={toastMessage}
              variant="success"
              onClose={() => setToastMessage(null)}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
