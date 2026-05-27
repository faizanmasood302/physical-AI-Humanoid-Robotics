import React, { useState, useEffect, useCallback } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAuthHeader } from '@site/src/lib/AuthContext';
import styles from './TextSelectionButton.module.css';

export default function TextSelectionButton() {
  const {siteConfig} = useDocusaurusContext();
  const apiBase = (siteConfig.customFields?.apiUrl as string) || 'http://localhost:8000';
  const authHeader = useAuthHeader();
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState('');
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) {
      setVisible(false);
      return;
    }
    const text = sel.toString().trim();
    if (!text || text.length < 10) {
      setVisible(false);
      return;
    }
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    setSelectedText(text);
    setPosition({
      top: rect.bottom + window.scrollY + 6,
      left: rect.left + window.scrollX + rect.width / 2,
    });
    setVisible(true);
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  async function handleAsk() {
    if (!question.trim() || loading) return;
    setLoading(true);
    setResult('');
    try {
      const res = await fetch(`${apiBase}/api/v1/query/selected`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader },
        body: JSON.stringify({
          session_id: localStorage.getItem('chatbot_session_id') || 'new',
          selected_text: selectedText,
          question: question,
        }),
      });
      const data = await res.json();
      setResult(data.reply);
      setSources(data.sources || []);
    } catch {
      setResult('Could not reach the backend. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {visible && (
        <button
          className={styles.floatingBtn}
          style={{ top: position.top, left: position.left, transform: 'translateX(-50%)' }}
          onClick={() => {
            setVisible(false);
            setModalOpen(true);
            setQuestion('');
            setResult('');
          }}
        >
          Ask AI about this
        </button>
      )}

      {modalOpen && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalTitle}>Ask about selected text</div>
            <div className={styles.selectedText}>{selectedText}</div>
            <input
              className={styles.questionInput}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Your question about this text..."
              disabled={loading}
            />
            {result && (
              <div className={styles.result}>
                {result}
                {sources.length > 0 && (
                  <div className={styles.resultSources}>Sources: {sources.join(', ')}</div>
                )}
              </div>
            )}
            <div className={styles.actions}>
              <button className={styles.cancelBtn} onClick={() => setModalOpen(false)}>
                Close
              </button>
              <button className={styles.askBtn} onClick={handleAsk} disabled={loading || !question.trim()}>
                {loading ? 'Thinking...' : 'Ask'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
