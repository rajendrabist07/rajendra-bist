'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Bot, Send, Sparkles, X } from 'lucide-react'

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
  'Is he open to work?',
  'Tell me about SocraticAI',
  "What's his background?",
]

export default function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [error, setError] = useState<string | null>(null)
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
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const sendMessage = async (content: string) => {
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
    const history = messages
      .filter(item => item.content.trim())
      .slice(-20)
      .map(item => ({
        role: item.role,
        content: item.content,
      }))

    setMessages(prev => [...prev, userMessage, assistantMessage])
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
        setMessages(prev => {
          return prev.map(item =>
            item.id === assistantId ? { ...item, content: item.content + chunk } : item,
          )
        })
      }

      setMessages(prev => prev.map(item => (item.id === assistantId ? { ...item, isStreaming: false } : item)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setMessages(prev => prev.filter(item => item.id !== assistantId))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendMessage(inputValue)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-[#11101b]/90 px-5 py-3 text-sm font-semibold text-indigo-100 shadow-[0_20px_80px_rgba(99,102,241,0.28)] backdrop-blur-xl transition hover:border-indigo-300/50 hover:bg-indigo-500 hover:text-white"
        aria-label="Open chat widget"
      >
        <Sparkles size={17} />
        Ask AI
        <span className="hidden rounded-full border border-white/10 px-2 py-0.5 text-xs text-slate-400 sm:inline">⌘K</span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="fixed bottom-24 right-6 z-50 flex max-h-[78vh] w-[420px] max-w-[95vw] flex-col rounded-[28px] border border-white/10 bg-[#0d0d16] p-4 shadow-[0_40px_120px_rgba(15,23,42,0.5)]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(99,102,241,0.24),rgba(14,165,233,0.18))] text-indigo-200 ring-1 ring-indigo-300/20">
                  <Bot size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Ask about Rajendra</p>
                  <p className="text-base font-semibold text-white">RB Assistant</p>
                </div>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-full p-2 text-slate-400 transition hover:bg-white/5 hover:text-white" aria-label="Close chat">
                <X size={20} />
              </button>
            </div>

            <div className="chat-scroll mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
              {messages.length === 0 ? (
                <div className="space-y-3">
                  <div className="rounded-3xl border border-indigo-400/15 bg-indigo-400/10 p-4">
                    <div className="flex items-center gap-2 text-indigo-200">
                      <Sparkles size={16} />
                      <p className="text-sm font-semibold">Portfolio AI agent</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Ask about Rajendra&apos;s projects, backend skills, education, availability, or AI product work.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_QUESTIONS.map(question => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => sendMessage(question)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 transition hover:border-white/20 hover:bg-white/10"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[86%] rounded-3xl p-3 ${message.role === 'user' ? 'bg-[#4f46e5] text-white' : 'surface-panel text-slate-200'}`}>
                      <p className="whitespace-pre-wrap text-sm leading-6">
                        {message.content || (message.isStreaming ? 'Thinking...' : '')}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-3">
              <input
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
                placeholder="Ask about Rajendra..."
                className="w-full rounded-2xl border border-white/10 bg-[#11101b] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-indigo-500/50"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>

            {isLoading ? <p className="mt-3 text-sm text-slate-400">Thinking...</p> : null}
            {error ? <p className="mt-3 text-sm text-rose-400">{error}</p> : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
