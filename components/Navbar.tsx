'use client'

import { useState } from 'react'
import { Download, Menu, Sparkles, X } from 'lucide-react'
import { PERSONAL } from '@/lib/portfolio-data'
import Container from '@/components/ui/Container'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const openChat = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-chat-widget'))
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.08] bg-[#06080d]/85 backdrop-blur-2xl">
      <Container as="div" className="flex items-center justify-between gap-6 py-4">
        <a
          href="#home"
          className="text-base font-black tracking-widest text-white transition-colors duration-200 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg px-1"
        >
          RB<span className="text-sky-400">.</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-widest text-slate-400 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-md px-1 py-0.5"
            >
              {item.label}
            </a>
          ))}
          <a
            href={PERSONAL.resumeUrl}
            download="Rajendra-Bist-Resume.pdf"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/[0.03] px-3.5 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-200 hover:border-sky-400/60 hover:bg-sky-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Download CV
          </a>
        </nav>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-200 hover:border-white/20 hover:bg-white/10 md:hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          onClick={() => setOpen(open => !open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>
      {open && (
        <div id="mobile-nav-menu" className="border-t border-white/10 bg-[#09090f] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base text-slate-300 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                openChat()
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-sky-400/40 bg-sky-500/15 px-4 py-3 text-base font-semibold text-sky-200 transition hover:border-sky-300 hover:bg-sky-500/25 cursor-pointer"
            >
              <Sparkles size={16} className="text-sky-300 animate-pulse" />
              Ask AI Agent
            </button>
            <a
              href={PERSONAL.resumeUrl}
              download="Rajendra-Bist-Resume.pdf"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/10"
            >
              <Download size={18} />
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
