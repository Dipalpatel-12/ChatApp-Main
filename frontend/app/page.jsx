// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { joinUser } from '@/lib/api';
// import useChatStore from '@/store/chatStore';
//
// export default function HomePage() {
//   const [name, setName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { setCurrentUser } = useChatStore();
//   const router = useRouter();
//
//   const handleJoin = async () => {
//     if (!name.trim() || loading) return;
//     setLoading(true);
//     try {
//       const data = await joinUser(name.trim());
//       if (data.success) {
//         setCurrentUser(data.user);
//         router.push('/chat');
//       }
//     } catch (e) {
//       alert('Server se connect nahi ho pa raha. Backend chalu hai?');
//     }
//     setLoading(false);
//   };
//
//   return (
//     <div className="min-h-screen bg-[#075E54] flex items-center justify-center">
//       <div className="bg-white rounded-2xl p-8 w-80 flex flex-col gap-4 shadow-xl">
//         <div className="text-center">
//           <div className="text-5xl mb-3">💬</div>
//           <h1 className="text-xl font-bold text-gray-800">ChatApp</h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Apna naam daalo aur shuru karo
//           </p>
//         </div>
//         <input
//           type="text"
//           placeholder="Tumhara naam..."
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
//           className="border border-gray-300 rounded-full px-4 py-2 outline-none text-sm focus:border-[#075E54] transition-colors"
//           autoFocus
//         />
//         <button
//           onClick={handleJoin}
//           disabled={!name.trim() || loading}
//           className="bg-[#075E54] text-white rounded-full py-2.5 text-sm font-semibold disabled:opacity-50 hover:bg-[#064840] transition-colors cursor-pointer"
//         >
//           {loading ? 'Joining...' : 'Start Chatting →'}
//         </button>
//       </div>
//     </div>
//   );
// }



'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { joinUser } from '@/lib/api';
import useChatStore from '@/store/chatStore';

export default function HomePage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useChatStore();
  const router = useRouter();

  const handleJoin = async () => {
    if (!name.trim() || loading) return;
    setLoading(true);
    try {
      const data = await joinUser(name.trim());
      if (data.success) {
        setCurrentUser(data.user);
        router.push('/chat');
      }
    } catch (e) {
      alert('Server se connect nahi ho pa raha. Backend chalu hai?');
    }
    setLoading(false);
  };

  return (
      <div
          style={{
            minHeight: '100vh',
            background: 'var(--wa-dark)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
      >
        {/* Top green strip like WhatsApp Web */}
        <div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '220px',
              background: 'var(--wa-dark)',
              zIndex: 0,
            }}
        />

        {/* Subtle background pattern */}
        <div
            style={{
              position: 'absolute', inset: 0, opacity: 0.06,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              zIndex: 0,
            }}
        />

        {/* Card */}
        <div
            style={{
              position: 'relative', zIndex: 1,
              background: '#fff',
              borderRadius: '16px',
              padding: '40px 36px 36px',
              width: '360px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0',
            }}
        >
          {/* WhatsApp-style icon */}
          <div
              style={{
                width: '72px', height: '72px',
                background: 'var(--wa-dark)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: '0 4px 14px rgba(7,94,84,0.35)',
              }}
          >
            <svg width="38" height="38" viewBox="0 0 24 24" fill="white">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
          </div>

          <h1
              style={{
                fontSize: '22px', fontWeight: '700',
                color: 'var(--wa-text)', marginBottom: '6px',
                letterSpacing: '-0.3px',
              }}
          >
            ChatApp
          </h1>
          <p
              style={{
                fontSize: '13px', color: 'var(--wa-muted)',
                marginBottom: '28px', textAlign: 'center', lineHeight: 1.5,
              }}
          >
          Enter Your Name And Start 🚀
          </p>

          {/* Input */}
          <div style={{ width: '100%', position: 'relative', marginBottom: '14px' }}>
            <svg
                width="15" height="15"
                viewBox="0 0 24 24" fill="none"
                stroke="var(--wa-muted)" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                autoFocus
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 38px',
                  border: '1.5px solid var(--wa-border)',
                  borderRadius: '10px',
                  fontSize: '13.5px',
                  outline: 'none',
                  color: 'var(--wa-text)',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s',
                  background: '#FAFAFA',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--wa-dark)'; e.target.style.background = '#fff'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--wa-border)'; e.target.style.background = '#FAFAFA'; }}
            />
          </div>

          {/* Button */}
          <button
              onClick={handleJoin}
              disabled={!name.trim() || loading}
              style={{
                width: '100%',
                padding: '12px',
                background: name.trim() && !loading ? 'var(--wa-dark)' : '#B2BABB',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: name.trim() && !loading ? 'pointer' : 'not-allowed',
                transition: 'background 0.2s, transform 0.1s',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                letterSpacing: '0.1px',
              }}
              onMouseEnter={(e) => { if (name.trim() && !loading) e.currentTarget.style.background = 'var(--wa-dark2)'; }}
              onMouseLeave={(e) => { if (name.trim() && !loading) e.currentTarget.style.background = 'var(--wa-dark)'; }}
              onMouseDown={(e) => { if (name.trim() && !loading) e.currentTarget.style.transform = 'scale(0.98)'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                    </path>
                  </svg>
                  Joining...
                </>
            ) : (
                <>
                  Start Chatting
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
            )}
          </button>

          {/* Footer note */}
          <p
              style={{
                marginTop: '20px',
                fontSize: '11px',
                color: '#AAB8C2',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            End-to-end encrypted
          </p>
        </div>
      </div>
  );
}