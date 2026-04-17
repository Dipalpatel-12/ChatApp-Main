// 'use client';
// import { useEffect, useRef, useState } from 'react';
// import useChatStore from '@/store/chatStore';
// import useChat from '@/hooks/useChat';
// import MessageBubble from './MessageBubble';
// import TypingIndicator from './TypingIndicator';
// import InputBox from './InputBox';
// import socket from '@/lib/socket';
//
// export default function ChatWindow() {
//   const { selectedUser, currentUser, messages } = useChatStore();
//   const { sendMessage } = useChat();
//   const [isTyping, setIsTyping] = useState(false);
//   const bottomRef = useRef(null);
//
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isTyping]);
//
//   useEffect(() => {
//     const onStart = ({ senderId }) => {
//       if (senderId === selectedUser?._id) setIsTyping(true);
//     };
//     const onStop = ({ senderId }) => {
//       if (senderId === selectedUser?._id) setIsTyping(false);
//     };
//     socket.on('typing:start', onStart);
//     socket.on('typing:stop', onStop);
//     return () => {
//       socket.off('typing:start', onStart);
//       socket.off('typing:stop', onStop);
//     };
//   }, [selectedUser]);
//
//   if (!selectedUser) {
//     return (
//       <div className="flex-1 flex flex-col items-center justify-center bg-[#F0F0F0] gap-3">
//         <div className="text-6xl">💬</div>
//         <p className="text-gray-500 text-sm">
//           Kisi ko select karo chat karne ke liye
//         </p>
//       </div>
//     );
//   }
//
//   const filtered = messages.filter((m) => {
//     const sid = m.senderId?._id ?? m.senderId;
//     const rid = m.receiverId;
//     return (
//       (sid === currentUser._id && rid === selectedUser._id) ||
//       (sid === selectedUser._id && rid === currentUser._id)
//     );
//   });
//
//   return (
//     <div className="flex-1 flex flex-col h-full overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center gap-3 px-4 py-3 bg-[#075E54] text-white shrink-0">
//         <div className="w-9 h-9 rounded-full bg-green-400 flex items-center justify-center font-bold text-sm">
//           {selectedUser.name.charAt(0).toUpperCase()}
//         </div>
//         <div>
//           <p className="font-semibold text-sm">{selectedUser.name}</p>
//           <p className="text-xs text-green-200">
//             {isTyping ? 'typing...' : 'online'}
//           </p>
//         </div>
//       </div>
//
//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-4 py-3 bg-[#ECE5DD]">
//         {filtered.length === 0 && (
//           <p className="text-center text-gray-400 text-xs mt-4">
//             Koi message nahi hai abhi — Pehla message bhejo! 👋
//           </p>
//         )}
//         {filtered.map((msg, i) => {
//           const sid = msg.senderId?._id ?? msg.senderId;
//           return (
//             <MessageBubble
//               key={msg._id || i}
//               message={msg}
//               isOwn={sid === currentUser._id}
//             />
//           );
//         })}
//         {isTyping && <TypingIndicator />}
//         <div ref={bottomRef} />
//       </div>
//
//       <InputBox onSend={sendMessage} />
//     </div>
//   );
// }



'use client';
import { useEffect, useRef, useState } from 'react';
import useChatStore from '@/store/chatStore';
import useChat from '@/hooks/useChat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import InputBox from './InputBox';
import socket from '@/lib/socket';

function getInitials(name = '') {
  return name.charAt(0).toUpperCase();
}

const AVATAR_COLORS = [
  '#B39DDB', '#80CBC4', '#F48FB1', '#FFCC80',
  '#80DEEA', '#A5D6A7', '#EF9A9A', '#90CAF9',
];

function getAvatarColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function ChatWindow() {
  const { selectedUser, currentUser, messages } = useChatStore();
  const { sendMessage } = useChat();
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const onStart = ({ senderId }) => {
      if (senderId === selectedUser?._id) setIsTyping(true);
    };
    const onStop = ({ senderId }) => {
      if (senderId === selectedUser?._id) setIsTyping(false);
    };
    socket.on('typing:start', onStart);
    socket.on('typing:stop', onStop);
    return () => {
      socket.off('typing:start', onStart);
      socket.off('typing:stop', onStop);
    };
  }, [selectedUser]);

  /* ── Empty state ── */
  if (!selectedUser) {
    return (
        <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--wa-bg)',
              gap: '12px',
              position: 'relative',
              overflow: 'hidden',
            }}
        >
          {/* Subtle bg pattern */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'var(--wa-dark)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', opacity: 0.15,
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>

          <p style={{
            position: 'absolute', bottom: '20px', fontSize: '11px',
            color: 'var(--wa-muted)', display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            End-to-end encrypted
          </p>
        </div>
    );
  }

  const filtered = messages.filter((m) => {
    const sid = m.senderId?._id ?? m.senderId;
    const rid = m.receiverId;
    return (
        (sid === currentUser._id && rid === selectedUser._id) ||
        (sid === selectedUser._id && rid === currentUser._id)
    );
  });

  /* Group messages by date */
  const groupedMessages = [];
  let lastDate = null;
  for (const msg of filtered) {
    const d = new Date(msg.createdAt).toDateString();
    if (d !== lastDate) {
      groupedMessages.push({ type: 'date', date: d, id: `date-${d}` });
      lastDate = d;
    }
    groupedMessages.push({ type: 'message', msg });
  }

  const formatDateLabel = (dateStr) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (dateStr === today) return 'Today';
    if (dateStr === yesterday) return 'Yesterday';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{
          background: 'var(--wa-dark)',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: getAvatarColor(selectedUser.name),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '600', fontSize: '15px', color: '#fff',
              }}>
                {getInitials(selectedUser.name)}
              </div>
              <span style={{
                position: 'absolute', bottom: '1px', right: '1px',
                width: '10px', height: '10px',
                background: 'var(--wa-online)', borderRadius: '50%',
                border: '2px solid var(--wa-dark)',
              }} />
            </div>
            <div>
              <p style={{ fontWeight: '600', fontSize: '14px', color: '#fff', lineHeight: 1.2 }}>
                {selectedUser.name}
              </p>
              <p style={{ fontSize: '11px', color: isTyping ? '#a8f0c6' : '#9de4c6', lineHeight: 1.3 }}>
                {isTyping ? 'typing...' : '● online'}
              </p>
            </div>
          </div>

          {/* Header actions */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '50%', display: 'flex', alignItems: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.7 19.79 19.79 0 0 1 1.61 1.1a2 2 0 0 1 1.99-2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 6.42a16 16 0 0 0 6 6l.9-.89a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 14"/>
              </svg>
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '50%', display: 'flex', alignItems: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div
            style={{
              flex: 1, overflowY: 'auto',
              padding: '12px 16px',
              background: 'var(--wa-bg)',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300000008' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              display: 'flex', flexDirection: 'column',
            }}
        >
          {groupedMessages.length === 0 && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <span style={{
              background: 'rgba(225,245,254,0.92)', color: '#54656F',
              fontSize: '12px', padding: '6px 14px', borderRadius: '8px',
              boxShadow: 'var(--shadow-sm)',
            }}>Send First Message! 👋
            </span>
              </div>
          )}

          {groupedMessages.map((item, i) => {
            if (item.type === 'date') {
              return (
                  <div key={item.id} style={{ textAlign: 'center', margin: '8px 0 4px' }}>
                <span style={{
                  background: 'rgba(225,245,254,0.92)', color: '#54656F',
                  fontSize: '11.5px', padding: '4px 12px', borderRadius: '8px',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  {formatDateLabel(item.date)}
                </span>
                  </div>
              );
            }
            const msg = item.msg;
            const sid = msg.senderId?._id ?? msg.senderId;
            return (
                <MessageBubble
                    key={msg._id || i}
                    message={msg}
                    isOwn={sid === currentUser._id}
                />
            );
          })}

          {isTyping && <TypingIndicator name={selectedUser.name} />}
          <div ref={bottomRef} />
        </div>

        <InputBox onSend={sendMessage} />
      </div>
  );
}