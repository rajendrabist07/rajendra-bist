'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Bot, Send, Sparkles, X, RotateCcw, User, Check, Terminal, Copy, Volume2, ThumbsUp, ThumbsDown, RotateCw } from 'lucide-react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

const QUICK_QUESTIONS = [
  'What projects has Rajendra built?',
  "What's his tech stack?",
  'Tell me about DevGuard AI',
  'Tell me about EduMethod AI',
  'Is he open to work?',
]

// Custom CodeBlock Component with Copy Functionality
function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-white/[0.08] bg-black/40 font-mono text-[13px] shadow-inner">
      <div className="flex items-center justify-between bg-white/[0.02] px-4 py-2 text-xs text-slate-400 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5 font-medium text-slate-300">
          <Terminal size={13} className="text-indigo-400" />
          <span className="uppercase tracking-wider">{language || 'code'}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white active:scale-95 cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={11} className="text-sky-400" />
              <span className="text-sky-400">Copied!</span>
            </>
          ) : (
            <>
              <span className="text-slate-400">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 leading-relaxed text-slate-300 max-w-full">
        <code>{code.trim()}</code>
      </pre>
    </div>
  )
}

// Inline Markdown Parser helper
function parseInline(text: string): React.ReactNode[] {
  const regex = /(\*\*.*?\*\*|`.*?`)/g
  const parts = text.split(regex)
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="mx-0.5 rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-xs text-indigo-300">
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}

// Custom Light-weight Markdown Renderer
function MarkdownRenderer({ content }: { content: string }) {
  if (!content) return null

  // Split content by code blocks first
  const parts = content.split(/(```[\s\S]*?```)/g)

  return (
    <div className="space-y-3">
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const match = part.match(/```(\w*)\n([\s\S]*?)```/)
          const lang = match ? match[1] : 'code'
          const code = match ? match[2] : part.slice(3, -3)

          return <CodeBlock key={index} language={lang} code={code} />
        }

        // Handle paragraphs and text structures line by line
        return (
          <div key={index} className="space-y-2">
            {part.split('\n').map((line, lineIdx) => {
              const trimmedLine = line.trim()

              // Headers: ###, ##, #
              if (trimmedLine.startsWith('###')) {
                return (
                  <h4 key={lineIdx} className="text-sm font-semibold text-white mt-4 mb-2 border-b border-white/[0.05] pb-1 tracking-wide">
                    {parseInline(trimmedLine.slice(3).trim())}
                  </h4>
                )
              }
              if (trimmedLine.startsWith('##')) {
                return (
                  <h3 key={lineIdx} className="text-base font-bold text-white mt-5 mb-2 tracking-tight">
                    {parseInline(trimmedLine.slice(2).trim())}
                  </h3>
                )
              }
              if (trimmedLine.startsWith('#')) {
                return (
                  <h2 key={lineIdx} className="text-lg font-bold text-indigo-200 mt-6 mb-3 tracking-tight">
                    {parseInline(trimmedLine.slice(1).trim())}
                  </h2>
                )
              }

              // Bullet lists
              if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
                return (
                  <div key={lineIdx} className="flex items-start gap-2.5 pl-2 my-1 text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                    <span className="text-sm leading-relaxed flex-1">
                      {parseInline(trimmedLine.slice(2).trim())}
                    </span>
                  </div>
                )
              }

              // Numbered lists
              const numMatch = trimmedLine.match(/^(\d+)\.\s(.*)/)
              if (numMatch) {
                return (
                  <div key={lineIdx} className="flex items-start gap-2.5 pl-2 my-1 text-slate-300">
                    <span className="font-mono text-xs font-semibold text-indigo-400 mt-0.5 shrink-0">
                      {numMatch[1]}.
                    </span>
                    <span className="text-sm leading-relaxed flex-1">
                      {parseInline(numMatch[2].trim())}
                    </span>
                  </div>
                )
              }

              // Empty lines
              if (!trimmedLine) {
                return <div key={lineIdx} className="h-2" />
              }

              // Regular text
              return (
                <p key={lineIdx} className="text-sm leading-relaxed text-slate-300">
                  {parseInline(line)}
                </p>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [error, setError] = useState<string | null>(null)
  
  // Interactive Message Actions State
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null)
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null)
  const [ratings, setRatings] = useState<Record<string, 'like' | 'dislike' | null>>({})
  
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setSessionId(window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`)
  }, [])

  useEffect(() => {
    const openHandler = () => setIsOpen(true)
    window.addEventListener('open-chat-widget', openHandler)
    return () => window.removeEventListener('open-chat-widget', openHandler)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
    }
  }, [messages, isOpen])

  // Stop speaking when widget is closed or on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        window.speechSynthesis?.cancel()
      }
    }
  }, [isOpen])

  const sendMessage = async (content: string, historyOverride?: Message[]) => {
    if (!content.trim() || isLoading) return

    setError(null)
    const trimmed = content.trim()
    
    const userMessage: Message = {
      id: window.crypto?.randomUUID?.() || `${Date.now()}-user`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    }
    const assistantId = window.crypto?.randomUUID?.() || `${Date.now()}-assistant`
    const assistantMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    }

    let updatedMessages: Message[]
    let historyMessagesForApi: Message[]

    if (historyOverride) {
      // Regenerating: historyOverride has messages up to the user message
      updatedMessages = [...historyOverride, assistantMessage]
      historyMessagesForApi = historyOverride.slice(0, -1)
    } else {
      updatedMessages = [...messages, userMessage, assistantMessage]
      historyMessagesForApi = messages
    }

    const history = historyMessagesForApi
      .filter(item => item.content.trim())
      .slice(-20)
      .map(item => ({
        role: item.role,
        content: item.content,
      }))

    setMessages(updatedMessages)
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history, sessionId }),
      })

      if (!response.ok) {
        const json = await response.json().catch(() => null)
        throw new Error(json?.error || 'Unable to reach the chat service.')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('Stream not available from AI service.')

      const nextSessionId = response.headers.get('X-Session-Id')
      if (nextSessionId) setSessionId(nextSessionId)

      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages(prev =>
          prev.map(item =>
            item.id === assistantId ? { ...item, content: item.content + chunk } : item,
          ),
        )
      }

      setMessages(prev =>
        prev.map(item => (item.id === assistantId ? { ...item, isStreaming: false } : item)),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setMessages(prev => prev.filter(item => item.id !== assistantId))
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearHistory = () => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis?.cancel()
    }
    setSpeakingMsgId(null)
    setMessages([])
    setError(null)
    setSessionId(window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendMessage(inputValue)
  }

  // Action Bar Handlers
  const handleCopyMessage = async (msgId: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedMsgId(msgId)
      setTimeout(() => setCopiedMsgId(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleReadAloud = (msgId: string, text: string) => {
    if (typeof window === 'undefined') return

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel()
      setSpeakingMsgId(null)
      return
    }

    window.speechSynthesis.cancel()

    // Strip code blocks and markdown symbols before reading to sound professional
    const cleanText = text
      .replace(/```[\s\S]*?```/g, '') // strip code blocks
      .replace(/###/g, '') // strip headers
      .replace(/\*\*/g, '') // strip bold markers
      .replace(/`/g, '') // strip inline code
      .replace(/[-*]\s+/g, '') // strip lists
      .trim()

    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.onend = () => setSpeakingMsgId(null)
    utterance.onerror = () => setSpeakingMsgId(null)

    setSpeakingMsgId(msgId)
    window.speechSynthesis.speak(utterance)
  }

  const handleToggleRating = (msgId: string, type: 'like' | 'dislike') => {
    setRatings(prev => {
      const current = prev[msgId]
      return {
        ...prev,
        [msgId]: current === type ? null : type,
      }
    })
  }

  const handleRedo = async (assistantMsgId: string) => {
    if (isLoading) return
    const msgIndex = messages.findIndex(m => m.id === assistantMsgId)
    if (msgIndex === -1) return

    // Find the user message directly before this assistant response
    const userMsg = messages[msgIndex - 1]
    if (!userMsg || userMsg.role !== 'user') return

    if (speakingMsgId === assistantMsgId) {
      window.speechSynthesis?.cancel()
      setSpeakingMsgId(null)
    }

    // Capture history up to the user message and run send
    const historyOverride = messages.slice(0, msgIndex)
    await sendMessage(userMsg.content, historyOverride)
  }

  // Global Keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      {/* Floating Ask AI Launch Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 rounded-full border border-indigo-500/30 bg-[#0d0c16]/95 px-6 py-3.5 text-sm font-semibold text-indigo-100 shadow-[0_0_50px_rgba(99,102,241,0.25)] backdrop-blur-xl transition duration-300 hover:border-indigo-400/60 hover:bg-indigo-600 hover:text-white hover:shadow-[0_0_60px_rgba(99,102,241,0.45)] hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Open chat widget"
      >
        <Sparkles size={16} className="animate-pulse" />
        Ask AI Agent
        <span className="hidden rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-400 sm:inline">⌘K</span>
      </button>

      {/* Main Chat Dialog */}
      <AnimatePresence>
        {isOpen ? (
          <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="pointer-events-auto relative flex h-[700px] max-h-[85vh] w-full max-w-[640px] flex-col rounded-3xl border border-white/[0.08] bg-[#09090f]/95 shadow-[0_35px_100px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
                    <Bot size={18} />
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#09090f] bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-white">RB Assistant</p>
                      <span className="rounded-full bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-medium text-indigo-300 border border-indigo-400/20">Active</span>
                    </div>
                    <p className="text-xs text-slate-400">Ask about Rajendra&apos;s architecture & projects</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {messages.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearHistory}
                      className="rounded-full p-2 text-slate-400 transition hover:bg-white/5 hover:text-white cursor-pointer"
                      title="Reset Conversation"
                      aria-label="Reset Conversation"
                    >
                      <RotateCcw size={16} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-2 text-slate-400 transition hover:bg-white/5 hover:text-white cursor-pointer"
                    aria-label="Close chat"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Scrollable Messages Panel */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 custom-scrollbar">
                {messages.length === 0 ? (
                  <div className="flex flex-col h-full items-center justify-center text-center space-y-6 py-6 px-4">
                    {/* Empty state welcome card */}
                    <div className="rounded-2xl border border-indigo-500/15 bg-gradient-to-b from-indigo-500/[0.06] to-transparent p-6 max-w-sm w-full">
                      <div className="flex flex-col items-center gap-3 text-indigo-300 mb-4">
                        <div className="p-3 rounded-xl bg-indigo-500/10 inline-flex">
                          <Sparkles size={24} />
                        </div>
                        <p className="text-base font-bold tracking-tight">Systems-first Assistant</p>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-300">
                        Welcome! I represent Rajendra Bist, an engineering-focused developer. Ask me about:
                      </p>
                      <ul className="mt-4 space-y-2 text-sm text-slate-400 inline-block text-left w-fit mx-auto">
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                          His flagship platform <strong>EduMethod AI</strong>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                          Autonomous <strong>DevGuard AI</strong> agent loop
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                          SocraticAI learning mechanics
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3 w-full max-w-md">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Quick Prompts</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {QUICK_QUESTIONS.map(question => (
                          <button
                            key={question}
                            type="button"
                            onClick={() => sendMessage(question)}
                            className="text-center rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3 text-xs text-slate-300 transition duration-200 hover:border-indigo-500/30 hover:bg-white/[0.06] hover:text-white cursor-pointer"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role !== 'user' && (
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-950 border border-indigo-500/20 text-indigo-300 text-xs mt-1">
                          <Bot size={14} />
                        </span>
                      )}

                      <div className="flex flex-col gap-1.5 max-w-[85%]">
                        <div
                          className={`rounded-2xl px-5 py-3.5 shadow-md ${
                            message.role === 'user'
                              ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-tr-none'
                              : 'bg-white/[0.03] border border-white/[0.05] text-slate-200 rounded-tl-none'
                          }`}
                        >
                          {message.role === 'user' ? (
                            <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{message.content}</p>
                          ) : (
                            <MarkdownRenderer content={message.content} />
                          )}
                          
                          {/* Streaming cursor effect */}
                          {message.role === 'assistant' && message.isStreaming && !message.content && (
                            <div className="flex items-center gap-1.5 py-2">
                              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0ms' }} />
                              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '150ms' }} />
                              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '300ms' }} />
                            </div>
                          )}
                        </div>

                        {/* Interactive Actions Bar */}
                        {message.role === 'assistant' && !message.isStreaming && message.content && (
                          <div className="flex items-center gap-4 pl-1 text-slate-500 mt-0.5">
                            {/* Copy Action */}
                            <button
                              type="button"
                              onClick={() => handleCopyMessage(message.id, message.content)}
                              className="transition hover:text-slate-300 active:scale-95 cursor-pointer"
                              title="Copy response"
                              aria-label="Copy response"
                            >
                              {copiedMsgId === message.id ? (
                                <Check size={13} className="text-sky-400" />
                              ) : (
                                <Copy size={13} />
                              )}
                            </button>

                            {/* Read Aloud Action */}
                            <button
                              type="button"
                              onClick={() => handleReadAloud(message.id, message.content)}
                              className={`transition hover:text-slate-300 active:scale-95 cursor-pointer ${
                                speakingMsgId === message.id ? 'text-indigo-400 animate-pulse' : ''
                              }`}
                              title={speakingMsgId === message.id ? "Stop reading" : "Read aloud"}
                              aria-label={speakingMsgId === message.id ? "Stop reading" : "Read aloud"}
                            >
                              <Volume2 size={13} />
                            </button>

                            {/* Like Action */}
                            <button
                              type="button"
                              onClick={() => handleToggleRating(message.id, 'like')}
                              className={`transition hover:text-slate-300 active:scale-95 cursor-pointer ${
                                ratings[message.id] === 'like' ? 'text-sky-400 fill-sky-400/20' : ''
                              }`}
                              title="Like response"
                              aria-label="Like response"
                            >
                              <ThumbsUp size={13} />
                            </button>

                            {/* Dislike Action */}
                            <button
                              type="button"
                              onClick={() => handleToggleRating(message.id, 'dislike')}
                              className={`transition hover:text-slate-300 active:scale-95 cursor-pointer ${
                                ratings[message.id] === 'dislike' ? 'text-rose-400 fill-rose-400/20' : ''
                              }`}
                              title="Dislike response"
                              aria-label="Dislike response"
                            >
                              <ThumbsDown size={13} />
                            </button>

                            {/* Redo Action */}
                            <button
                              type="button"
                              onClick={() => handleRedo(message.id)}
                              className="transition hover:text-slate-300 active:scale-95 cursor-pointer"
                              title="Regenerate response"
                              aria-label="Regenerate response"
                              disabled={isLoading}
                            >
                              <RotateCw size={13} />
                            </button>
                          </div>
                        )}
                      </div>

                      {message.role === 'user' && (
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600/20 border border-indigo-500/10 text-indigo-200 text-xs mt-1">
                          <User size={14} />
                        </span>
                      )}
                    </div>
                  ))
                )}
                <div ref={bottomRef} />
              </div>

              {/* Error notifications */}
              {error && (
                <div className="px-5 py-3 bg-rose-500/10 border-t border-rose-500/20 text-rose-400 text-sm flex items-center justify-between">
                  <span>{error}</span>
                  <button type="button" onClick={() => setError(null)} className="font-bold underline hover:text-white">Dismiss</button>
                </div>
              )}

              {/* Input Bar Form */}
              <form onSubmit={handleSubmit} className="border-t border-white/[0.06] bg-[#0c0c14] p-4 sm:p-5 flex items-center gap-3">
                <div className="relative flex-1 flex items-center">
                  <input
                    value={inputValue}
                    onChange={event => setInputValue(event.target.value)}
                    placeholder="Ask about Rajendra's engineering philosophy..."
                    className="w-full rounded-2xl border border-white/[0.06] bg-[#07070c]/60 py-4 pl-5 pr-14 text-[15px] text-slate-100 placeholder-slate-500 outline-none transition focus:border-indigo-500/40 focus:bg-[#07070c]/90 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-50"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="absolute right-2.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-500 hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed disabled:bg-white/[0.04] disabled:text-slate-500 shadow-sm"
                  >
                    <Send size={16} className="-ml-0.5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
