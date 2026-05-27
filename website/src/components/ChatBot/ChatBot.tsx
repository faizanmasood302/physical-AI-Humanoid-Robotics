import React, { useState, useRef, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAuthHeader } from '@site/src/lib/AuthContext';
import styles from './ChatBot.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
}

function getSessionId(): string {
  let id = localStorage.getItem('chatbot_session_id');
  if (!id) {
    id = 'new';
    localStorage.setItem('chatbot_session_id', id);
  }
  return id;
}

function saveSessionId(id: string) {
  localStorage.setItem('chatbot_session_id', id);
}

export default function ChatBot() {
  const {siteConfig} = useDocusaurusContext();
  const apiBase = (siteConfig.customFields?.apiUrl as string) || 'http://localhost:8000';
  const authHeader = useAuthHeader();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content:
            'Hi! I\'m the textbook assistant. Ask me anything about Physical AI & Humanoid Robotics.',
        },
      ]);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      const sessionId = getSessionId();
      const res = await fetch(`${apiBase}/api/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader },
        body: JSON.stringify({ session_id: sessionId, message: text }),
      });
      const data = await res.json();
      saveSessionId(data.session_id);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply, sources: data.sources },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I couldn\'t reach the backend. Make sure the server is running.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      <button
        className={styles.fab}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close chatbot' : 'Open chatbot'}
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className={styles.overlay}>
          <div className={styles.header}>
            <span>Textbook Assistant</span>
            <button className={styles.closeBtn} onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          <div className={styles.messages}>
            {messages.length === 0 && (
              <div className={styles.empty}>Ask a question about the textbook...</div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.msg} ${msg.role === 'user' ? styles.userMsg : styles.botMsg}`}>
                {msg.content}
                {msg.sources && msg.sources.length > 0 && (
                  <div className={styles.sources}>Sources: {msg.sources.join(', ')}</div>
                )}
              </div>
            ))}
            {loading && <div className={styles.typing}>Thinking...</div>}
            <div ref={bottomRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about the textbook..."
              disabled={loading}
            />
            <button className={styles.sendBtn} onClick={handleSend} disabled={loading || !input.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
