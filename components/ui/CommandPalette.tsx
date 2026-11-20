'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Command } from 'cmdk';
import { FACTS } from '@/content/facts';
import { Icon } from '@/components/primitives/Icon';

type PaletteMode = 'search' | 'ai';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_PROMPTS = [
  'What projects has Rajendra built?',
  'What is his full backend tech stack?',
  'Tell me about PostgreSQL Row-Level Security in Sovereign',
  'Is he authorized to work in India?',
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<PaletteMode>('search');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');

  const previousActiveElement = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Keyboard trigger ⌘K / Ctrl+K and custom event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName))) {
        e.preventDefault();
        previousActiveElement.current = document.activeElement as HTMLElement;
        setMode('search');
        setOpen((prev) => !prev);
      } else if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
        previousActiveElement.current?.focus();
      }
    };

    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode?: PaletteMode }>;
      previousActiveElement.current = document.activeElement as HTMLElement;
      setMode(customEvent.detail?.mode || 'search');
      setOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-cmdk', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-cmdk', handleCustomOpen);
    };
  }, [open]);

  // Focus restore on close
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      previousActiveElement.current?.focus();
    }, 50);
  };

  const navigateTo = (href: string) => {
    handleClose();
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (href.startsWith('http') || href.startsWith('mailto')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  const sendAiMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', content: trimmed };
    const assistantId = `a-${Date.now()}`;
    const assistantMsg: ChatMessage = { id: assistantId, role: 'assistant', content: '' };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: historyPayload, sessionId }),
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => null);
        const code = errorJson?.code;
        let errorMessage = 'Unable to connect to assistant right now. Please email rajendrabist396@gmail.com directly.';
        if (code === 'ASSISTANT_OFFLINE') {
          errorMessage = 'The AI assistant is currently offline. Please email rajendrabist396@gmail.com directly.';
        } else if (code === 'RATE_LIMITED') {
          errorMessage = 'You have reached the rate limit (30 messages / hour). Please wait a moment or email rajendrabist396@gmail.com directly.';
        } else if (code === 'PROVIDER_ERROR') {
          errorMessage = 'The AI provider service encountered an upstream issue. Please try again or reach out at rajendrabist396@gmail.com.';
        } else if (code === 'PROVIDER_TIMEOUT') {
          errorMessage = 'The AI assistant timed out while generating a response. Please try again or contact rajendrabist396@gmail.com.';
        } else if (code === 'FORBIDDEN_ORIGIN') {
          errorMessage = 'Request origin not authorized. Please email rajendrabist396@gmail.com directly.';
        } else if (code === 'INVALID_INPUT') {
          errorMessage = errorJson?.error || 'Invalid query format. Please rephrase or email rajendrabist396@gmail.com.';
        }
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, content: errorMessage } : msg
          )
        );
        return;
      }

      const nextSession = res.headers.get('X-Session-Id');
      if (nextSession) setSessionId(nextSession);

      const reader = res.body?.getReader();
      if (!reader) throw new Error('Streaming failed.');

      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantId ? { ...msg, content: accumulated } : msg))
        );
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: 'Unable to connect to assistant right now. Please email rajendrabist396@gmail.com directly.' }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Terminal Command Palette and AI Assistant"
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 p-4 pt-[12vh] backdrop-blur-md transition-all"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="document"
        className="w-full max-w-2xl bg-[--bg-surface-1] border border-[--border-strong] rounded-[--radius-card] shadow-2xl overflow-hidden font-mono text-sm"
      >
        {/* Mode switcher tabs */}
        <div className="flex items-center justify-between border-b border-[--border-hairline] bg-[--bg-surface-2] px-3 pt-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMode('search')}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-t-[--radius-control] border-b-2 transition-all cursor-pointer ${
                mode === 'search'
                  ? 'border-[--accent] text-[--accent] bg-[--accent-dim] font-semibold'
                  : 'border-transparent text-[--text-tertiary] hover:text-[--text-primary]'
              }`}
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setMode('ai')}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-t-[--radius-control] border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                mode === 'ai'
                  ? 'border-[--accent] text-[--accent] bg-[--accent-dim] font-semibold'
                  : 'border-transparent text-[--text-tertiary] hover:text-[--text-primary]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[--accent] animate-pulse" />
              Ask AI
            </button>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="ESC close command palette"
            className="text-xs text-[--text-tertiary] hover:text-[--text-primary] px-2 py-1 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* SEARCH MODE */}
        {mode === 'search' && (
          <Command label="Search Navigation and Projects" className="w-full">
            <div className="flex items-center gap-2 border-b border-[--border-hairline] px-4 py-3">
              <Icon name="terminal" size={15} className="text-[--accent]" />
              <Command.Input
                value={query}
                onValueChange={setQuery}
                placeholder="Type a section or project name (e.g. projects, sovereign, chronicle)..."
                aria-label="Search sections or projects"
                className="w-full bg-transparent text-sm text-[--text-primary] placeholder-[--text-tertiary] focus:outline-none font-mono"
                autoFocus
              />
            </div>

            <Command.List className="max-h-80 overflow-y-auto p-2">
              <Command.Empty className="p-4 text-center text-xs text-[--text-tertiary]">
                No matching section or command found.
              </Command.Empty>

              <Command.Group heading="Navigation" className="text-xs font-mono text-[--text-tertiary] px-2 py-1">
                <Command.Item
                  onSelect={() => navigateTo('#about')}
                  className="flex items-center gap-2 px-3 py-2 rounded-[--radius-control] text-xs text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-dim] cursor-pointer"
                >
                  <Icon name="arrow-right" size={12} className="text-[--accent]" />
                  <span>About & Identity</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => navigateTo('#projects')}
                  className="flex items-center gap-2 px-3 py-2 rounded-[--radius-control] text-xs text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-dim] cursor-pointer"
                >
                  <Icon name="arrow-right" size={12} className="text-[--accent]" />
                  <span>Projects & Case Files (Sovereign, Chronicle, DevGuard)</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => navigateTo('#skills')}
                  className="flex items-center gap-2 px-3 py-2 rounded-[--radius-control] text-xs text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-dim] cursor-pointer"
                >
                  <Icon name="arrow-right" size={12} className="text-[--accent]" />
                  <span>Technical Stack</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => navigateTo('#experience')}
                  className="flex items-center gap-2 px-3 py-2 rounded-[--radius-control] text-xs text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-dim] cursor-pointer"
                >
                  <Icon name="arrow-right" size={12} className="text-[--accent]" />
                  <span>Experience & Timeline</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => navigateTo('#contact')}
                  className="flex items-center gap-2 px-3 py-2 rounded-[--radius-control] text-xs text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-dim] cursor-pointer"
                >
                  <Icon name="arrow-right" size={12} className="text-[--accent]" />
                  <span>Contact Hub</span>
                </Command.Item>
              </Command.Group>

              <Command.Group heading="External & Actions" className="text-xs font-mono text-[--text-tertiary] px-2 py-1 mt-2">
                <Command.Item
                  onSelect={() => navigateTo(FACTS.resume.url)}
                  className="flex items-center gap-2 px-3 py-2 rounded-[--radius-control] text-xs text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-dim] cursor-pointer"
                >
                  <Icon name="copy" size={12} className="text-[--accent]" />
                  <span>Download Resume (PDF)</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => navigateTo(FACTS.contact.github)}
                  className="flex items-center gap-2 px-3 py-2 rounded-[--radius-control] text-xs text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-dim] cursor-pointer"
                >
                  <Icon name="github" size={12} className="text-[--text-primary]" />
                  <span>GitHub Profile (@rajendrabist07)</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => navigateTo(FACTS.contact.linkedin)}
                  className="flex items-center gap-2 px-3 py-2 rounded-[--radius-control] text-xs text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-dim] cursor-pointer"
                >
                  <Icon name="linkedin" size={12} className="text-[--text-primary]" />
                  <span>LinkedIn Profile</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => setMode('ai')}
                  className="flex items-center gap-2 px-3 py-2 rounded-[--radius-control] text-xs text-[--accent] hover:bg-[--accent-dim] cursor-pointer font-medium"
                >
                  <Icon name="terminal" size={12} className="text-[--accent]" />
                  <span>Switch to Ask AI Assistant</span>
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        )}

        {/* AI MODE */}
        {mode === 'ai' && (
          <div className="flex flex-col h-96">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="py-6 text-center space-y-4">
                  <p className="text-xs text-[--text-secondary]">
                    Ask any question regarding Rajendra&apos;s full-stack experience, database schema design, or project architectures:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => sendAiMessage(prompt)}
                        className="text-xs px-2.5 py-1.5 rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] text-[--text-secondary] hover:text-[--text-primary] hover:border-[--border-strong] cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[--radius-control] px-3.5 py-2.5 text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[--accent] text-[--accent-ink] font-medium'
                          : 'bg-[--bg-surface-2] text-[--text-primary] border border-[--border-hairline]'
                      }`}
                    >
                      {msg.role === 'assistant' && msg.content.includes('rajendrabist396@gmail.com') ? (
                        <span>
                          {msg.content.split('rajendrabist396@gmail.com')[0]}
                          <a
                            href="mailto:rajendrabist396@gmail.com"
                            className="text-[--accent] underline hover:brightness-110"
                          >
                            rajendrabist396@gmail.com
                          </a>
                          {msg.content.split('rajendrabist396@gmail.com')[1]}
                        </span>
                      ) : (
                        msg.content || (isLoading ? 'Analyzing portfolio facts...' : '')
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendAiMessage(inputMessage);
              }}
              className="flex items-center gap-2 border-t border-[--border-hairline] p-3 bg-[--bg-surface-2]"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about PostgreSQL RLS, Next.js, or availability..."
                disabled={isLoading}
                aria-label="Ask AI Assistant question"
                className="flex-1 bg-[--bg-surface-3] border border-[--border-hairline] rounded-[--radius-control] px-3 py-2 text-xs text-[--text-primary] placeholder-[--text-tertiary] focus:outline-none focus:border-[--accent]"
                autoFocus
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="px-3.5 py-2 bg-[--accent] text-[--accent-ink] font-medium text-xs rounded-[--radius-control] disabled:opacity-50 cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
