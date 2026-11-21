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

const STARTER_CHIPS = [
  'What has Rajendra built?',
  'What is his stack?',
  'Is he available?',
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to newest message
  useEffect(() => {
    if (mode === 'ai' && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, mode, isLoading]);

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

  const handleClearChat = () => {
    setMessages([]);
    setInputMessage('');
    setSessionId('');
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
      // Filter out empty messages and limit to last 6 turns
      const historyPayload = messages
        .filter((m) => m.content.trim().length > 0)
        .slice(-6)
        .map((m) => ({
          role: m.role,
          content: m.content.trim(),
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          question: trimmed,
          prompt: trimmed,
          history: historyPayload,
          sessionId: sessionId || undefined,
        }),
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
      aria-label="Search and AI Assistant"
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 p-4 pt-[10vh] sm:pt-[12vh] backdrop-blur-md transition-all"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="document"
        className="w-full max-w-2xl bg-[--bg-surface-1] border border-[--line-soft] rounded-[16px] shadow-2xl overflow-hidden font-sans text-sm"
      >
        {/* Mode switcher tabs + Close header */}
        <div className="flex items-center justify-between border-b border-[--line-hair] bg-[--bg-surface-2] px-3 py-2">
          {/* Segmented control for Search | Ask AI (sans, 8px radius) */}
          <div className="flex items-center bg-[--bg-surface-3] p-0.5 rounded-[--radius-control]">
            <button
              type="button"
              onClick={() => setMode('search')}
              className={`px-3 py-1 text-xs font-sans font-medium rounded-[--radius-control] transition-all cursor-pointer ${
                mode === 'search'
                  ? 'bg-[--accent] text-[--accent-ink] shadow-sm'
                  : 'text-[--text-secondary] hover:text-[--text-primary]'
              }`}
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setMode('ai')}
              className={`px-3 py-1 text-xs font-sans font-medium rounded-[--radius-control] transition-all cursor-pointer flex items-center gap-1.5 ${
                mode === 'ai'
                  ? 'bg-[--accent] text-[--accent-ink] shadow-sm'
                  : 'text-[--text-secondary] hover:text-[--text-primary]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${mode === 'ai' ? 'bg-[--accent-ink]' : 'bg-[--accent] animate-pulse'}`} />
              Ask AI
            </button>
          </div>

          {/* Close hint with Esc key and X button */}
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-[--line-hair] bg-[--bg-surface-3] text-[10px] text-[--text-tertiary] font-mono">
              Esc
            </kbd>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close dialog"
              className="p-1 rounded-[--radius-control] text-[--text-tertiary] hover:text-[--text-primary] hover:bg-[--bg-surface-3] transition-colors cursor-pointer"
            >
              <Icon name="x" size={16} />
            </button>
          </div>
        </div>

        {/* SEARCH MODE */}
        {mode === 'search' && (
          <Command label="Search Navigation and Projects" className="w-full">
            <div className="flex items-center gap-2.5 border-b border-[--line-hair] px-4 py-3">
              <Icon name="search" size={16} className="text-[--accent]" />
              <Command.Input
                value={query}
                onValueChange={setQuery}
                placeholder="Type a section or command (e.g. projects, sovereign, chronicle)..."
                aria-label="Search sections or projects"
                className="w-full bg-transparent text-sm text-[--text-primary] placeholder-[--text-tertiary] focus:outline-none font-sans"
                autoFocus
              />
            </div>

            <Command.List className="max-h-80 overflow-y-auto p-2">
              <Command.Empty className="p-4 text-center text-xs text-[--text-tertiary]">
                No matching section or command found.
              </Command.Empty>

              <Command.Group heading="Navigation" className="text-xs font-sans text-[--text-tertiary] px-2 py-1">
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
                  <span>Projects & Case Studies (Sovereign, Chronicle, DevGuard)</span>
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

              <Command.Group heading="External & Actions" className="text-xs font-sans text-[--text-tertiary] px-2 py-1 mt-2">
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
                  <Icon name="message-square" size={12} className="text-[--accent]" />
                  <span>Switch to Ask AI Assistant</span>
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        )}

        {/* AI MODE */}
        {mode === 'ai' && (
          <div className="flex flex-col h-[400px]">
            {/* Conversation header action */}
            {messages.length > 0 && (
              <div className="flex items-center justify-between px-4 py-1.5 border-b border-[--line-hair] bg-[--bg-surface-2]/60 text-xs text-[--text-tertiary]">
                <span>Conversation</span>
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="text-[11px] text-[--text-secondary] hover:text-[--accent] transition-colors cursor-pointer"
                >
                  Clear chat
                </button>
              </div>
            )}

            {/* Messages list with aria-live */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3.5"
              aria-live="polite"
              aria-relevant="additions text"
            >
              {messages.length === 0 ? (
                <div className="py-8 text-center space-y-4">
                  <p className="text-xs text-[--text-secondary] max-w-md mx-auto leading-relaxed">
                    Ask any question regarding Rajendra&apos;s full-stack experience, database schema design, or project architectures:
                  </p>
                  {/* Three starter chips shown only before the first message */}
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {STARTER_CHIPS.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => sendAiMessage(chip)}
                        className="text-xs font-sans px-3 py-1.5 rounded-[--radius-control] border border-[--line-hair] bg-[--bg-surface-2] text-[--text-secondary] hover:text-[--text-primary] hover:border-[--line-accent] hover:bg-[--accent-dim] transition-all cursor-pointer"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start gap-2.5 items-start'}`}
                  >
                    {/* Small RB avatar for assistant bubbles */}
                    {msg.role === 'assistant' && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[--accent-dim] border border-[--line-accent] text-[10px] font-bold text-[--accent] shrink-0 mt-0.5">
                        RB
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[--accent-dim] text-[--text-primary] border border-[--line-accent] rounded-[14px] rounded-br-[4px] font-medium'
                          : 'bg-[--bg-surface-2] text-[--text-primary] border border-[--line-hair] rounded-[14px] rounded-bl-[4px]'
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
                        msg.content || (
                          isLoading ? (
                            <span className="inline-flex items-center gap-1 py-1" aria-label="Thinking">
                              <span className="w-1.5 h-1.5 rounded-full bg-[--accent] animate-bounce [animation-delay:-0.3s]" />
                              <span className="w-1.5 h-1.5 rounded-full bg-[--accent] animate-bounce [animation-delay:-0.15s]" />
                              <span className="w-1.5 h-1.5 rounded-full bg-[--accent] animate-bounce" />
                            </span>
                          ) : ''
                        )
                      )}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form with Character Counter */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendAiMessage(inputMessage);
              }}
              className="border-t border-[--line-hair] p-3 bg-[--bg-surface-2] space-y-1"
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value.slice(0, 600))}
                  placeholder="Ask about PostgreSQL RLS, Next.js, or availability..."
                  disabled={isLoading}
                  maxLength={600}
                  aria-label="Ask AI Assistant question"
                  className="flex-1 bg-[--bg-surface-3] border border-[--line-hair] rounded-[--radius-control] px-3 py-2 text-xs text-[--text-primary] placeholder-[--text-tertiary] focus:outline-none focus:border-[--accent] disabled:opacity-50"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputMessage.trim()}
                  className="px-3.5 py-2 bg-[--accent] text-[--accent-ink] font-medium text-xs rounded-[--radius-control] disabled:opacity-50 cursor-pointer hover:brightness-105 active:scale-95 transition-all"
                >
                  Send
                </button>
              </div>

              {/* Character counter shown near the 600 limit */}
              {inputMessage.length > 300 && (
                <div className="text-right text-[10px] text-[--text-tertiary] pr-1">
                  <span>{inputMessage.length}</span>/600
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
