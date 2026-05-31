import { useState, useRef, useEffect, useCallback } from 'react';
import { SYSTEM_PROMPT } from '@/data/chatbot-context';

type Message = { id: string; role: 'user' | 'assistant'; content: string };

let msgId = 0;
function nextId() { return String(++msgId); }

// Rate limit: max 20 messages per hour per browser (localStorage)
const RATE_KEY = 'chatbot_rate';
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(): { allowed: boolean; remaining: number; resetIn: string } {
  const now = Date.now();
  let record: { timestamps: number[] };
  try {
    record = JSON.parse(localStorage.getItem(RATE_KEY) ?? '{"timestamps":[]}');
  } catch {
    record = { timestamps: [] };
  }
  // Drop timestamps outside the window
  record.timestamps = record.timestamps.filter(t => now - t < RATE_WINDOW_MS);
  const remaining = RATE_LIMIT - record.timestamps.length;
  if (remaining <= 0) {
    const oldest = record.timestamps[0];
    const resetMs = RATE_WINDOW_MS - (now - oldest);
    const resetMin = Math.ceil(resetMs / 60000);
    return { allowed: false, remaining: 0, resetIn: `${resetMin} min` };
  }
  return { allowed: true, remaining, resetIn: '' };
}

function recordRequest() {
  const now = Date.now();
  let record: { timestamps: number[] };
  try {
    record = JSON.parse(localStorage.getItem(RATE_KEY) ?? '{"timestamps":[]}');
  } catch {
    record = { timestamps: [] };
  }
  record.timestamps = [...record.timestamps.filter(t => now - t < RATE_WINDOW_MS), now];
  localStorage.setItem(RATE_KEY, JSON.stringify(record));
}

const GREETING: Message = {
  id: '0',
  role: 'assistant',
  content: "Hi — I'm here to answer questions about Shivam's work, projects, and career. What would you like to know?",
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, loading]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    // Rate limit check
    const rate = checkRateLimit();
    if (!rate.allowed) {
      const userMsg: Message = { id: nextId(), role: 'user', content: text };
      setMessages(prev => [
        ...prev,
        userMsg,
        {
          id: nextId(),
          role: 'assistant',
          content: `You've hit the hourly limit (${RATE_LIMIT} messages). Resets in ${rate.resetIn}.`,
        },
      ]);
      setInput('');
      return;
    }

    const userMsg: Message = { id: nextId(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    recordRequest();

    abortRef.current = new AbortController();

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      if (!apiKey) throw new Error('missing key');

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        signal: abortRef.current.signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 500,
          system: SYSTEM_PROMPT,
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const reply: string = data.content?.[0]?.text ?? "Sorry, I couldn't parse the response.";
      setMessages(prev => [...prev, { id: nextId(), role: 'assistant', content: reply }]);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      setMessages(prev => [
        ...prev,
        { id: nextId(), role: 'assistant', content: "Sorry, I'm having trouble connecting right now." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-[#0D0D0D] border border-[#333] text-[#FAFAF8] hover:border-[#555] transition-colors shadow-lg"
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M2 3a1 1 0 011-1h12a1 1 0 011 1v9a1 1 0 01-1 1H5.5L2 16V3z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-20 right-6 z-50 w-80 h-[460px] bg-[#0D0D0D] border border-[#333] rounded-lg flex flex-col shadow-2xl"
          role="dialog"
          aria-label="Chat with Shivam's AI assistant"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#333]">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#FAFAF8]">
              Ask about Shivam
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-[#666] hover:text-[#FAFAF8] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[88%] px-3 py-2 rounded-md font-mono text-[12px] leading-relaxed text-[#FAFAF8] ${
                    m.role === 'user' ? 'bg-[#1B4332]' : 'bg-[#1A1A18]'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#1A1A18] px-3 py-2 rounded-md font-mono text-[12px] text-[#666] tracking-widest">
                  ...
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="border-t border-[#333] px-3 py-2 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question…"
              disabled={loading}
              className="flex-1 bg-transparent font-mono text-[12px] text-[#FAFAF8] placeholder-[#444] outline-none disabled:opacity-50"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="text-[#FAFAF8] disabled:text-[#444] hover:text-[#aaa] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 13L13 7 1 1v4.5l8 1.5-8 1.5V13z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
