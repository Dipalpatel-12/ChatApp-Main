'use client';
import { useState, useRef } from 'react';
import socket from '@/lib/socket';
import useChatStore from '@/store/chatStore';

export default function InputBox({ onSend }) {
  const [text, setText] = useState('');
  const { selectedUser } = useChatStore();
  const typingTimer = useRef(null);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);

    // Auto-resize textarea
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 112) + 'px';
    }

    if (!selectedUser) return;
    socket.emit('typing:start', { receiverId: selectedUser._id });
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      socket.emit('typing:stop', { receiverId: selectedUser._id });
    }, 1000);
  };

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    clearTimeout(typingTimer.current);
    if (selectedUser) socket.emit('typing:stop', { receiverId: selectedUser._id });
  };

  return (
      <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '8px',
            padding: '8px 12px',
            background: 'var(--wa-input-bg)',
            borderTop: '1px solid var(--wa-border)',
          }}
      >
        {/* Emoji button */}
        <button
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--wa-muted)', flexShrink: 0,
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--wa-dark)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--wa-muted)'; }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
        </button>

        {/* Attach button */}
        <button
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--wa-muted)', flexShrink: 0,
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--wa-dark)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--wa-muted)'; }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
          </svg>
        </button>

        {/* Text input */}
        <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message"
            rows={1}
            style={{
              flex: 1,
              resize: 'none',
              background: '#fff',
              border: 'none',
              borderRadius: '20px',
              padding: '10px 16px',
              fontSize: '13.5px',
              outline: 'none',
              fontFamily: 'inherit',
              color: 'var(--wa-text)',
              lineHeight: 1.45,
              overflowY: 'auto',
              maxHeight: '112px',
              boxShadow: 'var(--shadow-sm)',
            }}
        />

        {/* Send / Mic button */}
        <button
            onClick={handleSend}
            style={{
              width: '42px', height: '42px',
              background: text.trim() ? 'var(--wa-green)' : 'var(--wa-dark)',
              border: 'none', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
              transition: 'background 0.2s, transform 0.1s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.93)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          {text.trim() ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
              </svg>
          ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
          )}
        </button>
      </div>
  );
}