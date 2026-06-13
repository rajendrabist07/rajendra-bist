'use client'

import { useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { PERSONAL } from '@/lib/portfolio-data'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#09090f]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-8">
        <a href="#home" className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-200">
          RB
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map(item => (
            <a key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={PERSONAL.resumeUrl}
          download="Rajendra-Bist-Resume.pdf"
          className="hidden items-center justify-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-100 transition hover:border-indigo-300/50 hover:bg-indigo-500/20 md:inline-flex"
        >
          <Download size={16} />
          Download CV
        </a>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-white/20 hover:bg-white/10 md:hidden"
          onClick={() => setOpen(open => !open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-[#09090f] px-6 py-4 md:hidden">
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
            <a
              href={PERSONAL.resumeUrl}
              download="Rajendra-Bist-Resume.pdf"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 px-4 py-3 text-base font-semibold text-indigo-100 transition hover:border-indigo-300/50 hover:bg-indigo-500/20"
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
