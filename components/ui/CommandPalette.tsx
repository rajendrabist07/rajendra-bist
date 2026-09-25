'use client';

import React, { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import {
  Code,
  FolderGit2,
  FileText,
  Mail,
  Github,
  Linkedin,
  Bot,
  Terminal,
  Cpu,
  Workflow,
  Sparkles,
  Search,
} from 'lucide-react';
import { PERSONAL } from '@/lib/portfolio-data';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName))) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);

  const navigateTo = (href: string) => {
    setOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (href.startsWith('http') || href.startsWith('mailto')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  const triggerChat = () => {
    setOpen(false);
    const chatBtn = document.querySelector('[aria-label="Open AI Assistant"]') as HTMLButtonElement;
    if (chatBtn) chatBtn.click();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 p-4 pt-[15vh] backdrop-blur-md"
      onClick={() => setOpen(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Command label="Terminal Command Palette">
          <div className="flex items-center gap-2 border-b border-[--border-subtle] px-4">
            <Search size={16} className="text-[--text-tertiary]" />
            <Command.Input placeholder="Type a command or search systems (e.g. projects, rag, resume)..." />
            <kbd className="rounded border border-[--border-subtle] bg-[--bg-surface-2] px-1.5 py-0.5 text-[10px] font-mono text-[--text-tertiary]">
              ESC
            </kbd>
          </div>

          <Command.List>
            <Command.Empty className="p-4 text-center text-xs font-mono text-[--text-tertiary]">
              No system matching query found.
            </Command.Empty>

            <Command.Group heading="Navigation">
              <Command.Item onSelect={() => navigateTo('#about')}>
                <Terminal size={15} className="text-[--accent-warm]" />
                <span>01 // About & Architecture Philosophy</span>
              </Command.Item>
              <Command.Item onSelect={() => navigateTo('#skills')}>
                <Cpu size={15} className="text-[--accent-warm]" />
                <span>02 // Tech Arsenal & Stack</span>
              </Command.Item>
              <Command.Item onSelect={() => navigateTo('#projects')}>
                <FolderGit2 size={15} className="text-[--accent-warm]" />
                <span>03 // Featured Projects (DevGuard, EduMethod, SocraticAI)</span>
              </Command.Item>
              <Command.Item onSelect={() => navigateTo('#process')}>
                <Workflow size={15} className="text-[--accent-warm]" />
                <span>04 // Engineering Process (Understand→Design→Build→Deploy)</span>
              </Command.Item>
              <Command.Item onSelect={() => navigateTo('#experience')}>
                <Code size={15} className="text-[--accent-warm]" />
                <span>05 // Experience & Timeline</span>
              </Command.Item>
              <Command.Item onSelect={() => navigateTo('#contact')}>
                <Mail size={15} className="text-[--accent-warm]" />
                <span>06 // Contact & Inquiries</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Actions & Tools">
              <Command.Item onSelect={triggerChat}>
                <Bot size={15} className="text-[--accent-cool]" />
                <span>Ask AI Assistant (Gemini 2.5 Streaming)</span>
              </Command.Item>
              <Command.Item onSelect={() => navigateTo(PERSONAL.resumeUrl)}>
                <FileText size={15} className="text-[--accent-cool]" />
                <span>Download Resume (PDF)</span>
              </Command.Item>
              <Command.Item onSelect={() => navigateTo(PERSONAL.github)}>
                <Github size={15} className="text-[--text-secondary]" />
                <span>GitHub Profile (@rajendrabist07)</span>
              </Command.Item>
              <Command.Item onSelect={() => navigateTo(PERSONAL.linkedin)}>
                <Linkedin size={15} className="text-[--text-secondary]" />
                <span>LinkedIn Profile</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
