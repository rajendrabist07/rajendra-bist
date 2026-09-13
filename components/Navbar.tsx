'use client'

import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { Download, Menu, Moon, Sparkles, Sun, X } from 'lucide-react'
import { PERSONAL } from '@/lib/portfolio-data'
import Container from '@/components/ui/Container'
import { useSmoothScroll } from '@/lib/hooks/useSmoothScroll'

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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const { scrollToSection } = useSmoothScroll()

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem('theme', nextTheme)
    setTheme(nextTheme)
  }

  const handleAnchorClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith('#')) return
    event.preventDefault()
    scrollToSection(href.slice(1))
    setOpen(false)
  }

  const openChat = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-chat-widget'))
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[--border] bg-[--bg-surface] backdrop-blur-2xl">
      <Container as="div" className="flex items-center justify-between gap-6 py-4">
        <a
          href="#home"
          onClick={handleAnchorClick('#home')}
          className="text-base font-black tracking-widest text-[--text-primary] transition-colors duration-200 ease-out hover:text-[--accent-primary] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-primary] rounded-lg px-1"
        >
          RB<span className="text-[--accent-primary]">.</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleAnchorClick(item.href)}
              className="text-xs font-semibold uppercase tracking-widest text-[--text-muted] transition-colors duration-200 ease-out hover:text-[--text-primary] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-primary] rounded-md px-1 py-0.5"
            >
              {item.label}
            </a>
          ))}
          <a
            href={PERSONAL.resumeUrl}
            download="Rajendra-Bist-Resume.pdf"
            className="premium-button-secondary inline-flex items-center justify-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-primary]"
          >
            Download CV
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="premium-button-secondary inline-flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-primary]"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </nav>
        <button
          type="button"
          className="premium-button-secondary inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-200 transition-all duration-200 ease-out md:hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-primary]"
          onClick={() => setOpen(open => !open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>
      {open && (
        <div id="mobile-nav-menu" className="border-t border-[--border] bg-[--bg-surface] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleAnchorClick(item.href)}
                className="text-base text-[--text-secondary] transition-colors duration-200 ease-out hover:text-[--text-primary]"
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
              className="premium-button-secondary mt-2 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-base font-semibold transition-all duration-200 ease-out cursor-pointer"
            >
              <Sparkles size={16} className="text-[--accent-primary] animate-pulse" />
              Ask AI Agent
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="premium-button-secondary inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-base font-semibold transition-all duration-200 ease-out cursor-pointer"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            <a
              href={PERSONAL.resumeUrl}
              download="Rajendra-Bist-Resume.pdf"
              onClick={() => setOpen(false)}
              className="premium-button-secondary inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-base font-semibold transition-all duration-200 ease-out"
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
