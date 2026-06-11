'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MessageSquare, Send, X } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
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
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const openHandler = () => setIsOpen(true)
    window.addEventListener('open-chat-widget', openHandler)
    return () => window.removeEventListener('open-chat-widget', openHandler)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const history = useMemo(
    () =>
      messages.map(item => ({
        role: item.role === 'assistant' ? 'assistant' : 'user',
        content: item.content,
      })),
    [messages],
  )

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    setError(null)
    const trimmed = content.trim()
    setMessages(prev => [...prev, { role: 'user', content: trimmed }, { role: 'assistant', content: '' }])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      })

      if (!response.ok) {
        const json = await response.json().catch(() => null)
        throw new Error(json?.error || 'Unable to reach the chat service.')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('Stream not available from AI service.')

      const decoder = new TextDecoder()
      let aiText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        aiText += chunk
        setMessages(prev => {
          const updated = [...prev]
          const last = updated[updated.length - 1]
          updated[updated.length - 1] = { ...last, content: last.content + chunk }
          return updated
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setMessages(prev => prev.slice(0, -1))
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
        className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#6366f1] text-white shadow-glow transition hover:bg-[#4f46e5]"
        aria-label="Open chat widget"
      >
        <MessageSquare size={22} />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[95vw] rounded-[32px] border border-white/10 bg-[#0d0d16] p-4 shadow-[0_40px_120px_rgba(15,23,42,0.5)]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Ask about Rajendra</p>
                <p className="text-base font-semibold text-white">AI assistant</p>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="text-slate-400 transition hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="mt-4 space-y-3 max-h-[300px] overflow-y-auto chat-scroll pr-1">
              {messages.length === 0 ? (
                <div className="space-y-3">
                  <p className="text-sm text-slate-400">Try one of these quick questions to learn more about Rajendra.</p>
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
                messages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-3xl p-3 ${message.role === 'user' ? 'bg-[#4f46e5] text-white' : 'surface-panel text-slate-200'}`}>
                      <p className="whitespace-pre-wrap text-sm leading-6">{message.content}</p>
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
