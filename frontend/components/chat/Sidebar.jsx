// 'use client';
// import useChatStore from '@/store/chatStore';
//
// export default function Sidebar() {
//   const { onlineUsers, currentUser, selectedUser, setSelectedUser } =
//     useChatStore();
//   const others = onlineUsers.filter((u) => u._id !== currentUser?._id);
//
//   return (
//     <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
//       <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
//         <div className="w-9 h-9 rounded-full bg-green-400 flex items-center justify-center font-bold text-white text-sm shrink-0">
//           {currentUser?.name?.charAt(0).toUpperCase()}
//         </div>
//         <div>
//           <p className="text-white font-semibold text-sm">{currentUser?.name}</p>
//           <p className="text-green-200 text-xs">Online</p>
//         </div>
//       </div>
//
//       <p className="text-xs text-gray-400 px-4 py-2 border-b">Online Users</p>
//
//       <div className="flex-1 overflow-y-auto">
//         {others.length === 0 ? (
//           <p className="text-gray-400 text-sm text-center mt-10 px-4">
//             Koi online nahi hai...
//           </p>
//         ) : (
//           others.map((user) => (
//             <div
//               key={user._id}
//               onClick={() => setSelectedUser(user)}
//               className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors
//                 ${selectedUser?._id === user._id ? 'bg-gray-100' : ''}`}
//             >
//               <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
//                 <span className="text-white font-semibold text-sm">
//                   {user.name.charAt(0).toUpperCase()}
//                 </span>
//               </div>
//               <div>
//                 <p className="font-medium text-sm text-gray-800">{user.name}</p>
//                 <p className="text-xs text-green-500">● Online</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


'use client';
import { useState } from 'react';
import useChatStore from '@/store/chatStore';

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

export default function Sidebar() {
    const { onlineUsers, currentUser, selectedUser, setSelectedUser, messages } = useChatStore();
    const [search, setSearch] = useState('');

    const others = onlineUsers.filter((u) => u._id !== currentUser?._id);
    const filtered = others.filter((u) =>
        (u.name || "").toLowerCase().includes(search.toLowerCase())
    );

    const getLastMessage = (userId) => {
        const conv = messages.filter((m) => {
            const sid = m.senderId?._id ?? m.senderId;
            return (
                (sid === currentUser._id && m.receiverId === userId) ||
                (sid === userId && m.receiverId === currentUser._id)
            );
        });
        return conv[conv.length - 1] || null;
    };

    const getUnreadCount = (userId) => {
        return messages.filter((m) => {
            const sid = m.senderId?._id ?? m.senderId;
            return sid === userId && m.receiverId === currentUser._id && m.status !== 'read';
        }).length;
    };

    return (
        <div
            style={{
                width: '320px',
                background: 'var(--wa-sidebar)',
                borderRight: '1px solid var(--wa-border)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                flexShrink: 0,
            }}
        >
            {/* Header */}
            <div
                style={{
                    background: 'var(--wa-dark)',
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: getAvatarColor(currentUser?.name),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '600',
                            fontSize: '15px',
                            color: '#fff',
                            flexShrink: 0,
                        }}
                    >
                        {getInitials(currentUser?.name)}
                    </div>
                    <div>
                        <p style={{ color: '#fff', fontWeight: '600', fontSize: '14px', lineHeight: 1.2 }}>
                            {currentUser?.name}
                        </p>
                        <p style={{ color: '#9de4c6', fontSize: '11px' }}>● Active now</p>
                    </div>
                </div>
                {/* Icons */}
                <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
                    </svg>
                </div>
            </div>

            {/* Search Bar */}
            <div style={{ padding: '8px 12px', background: 'var(--wa-input-bg)', borderBottom: '1px solid var(--wa-border)' }}>
                <div style={{ position: 'relative' }}>
                    <svg
                        width="14" height="14"
                        viewBox="0 0 24 24" fill="none"
                        stroke="var(--wa-muted)" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round"
                        style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
                    >
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search or start new chat"
                        style={{
                            width: '100%',
                            padding: '8px 12px 8px 32px',
                            background: '#fff',
                            border: 'none',
                            borderRadius: '20px',
                            fontSize: '13px',
                            outline: 'none',
                            color: 'var(--wa-text)',
                        }}
                    />
                </div>
            </div>

            {/* User List */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--wa-muted)', fontSize: '13px', marginTop: '40px', padding: '0 20px' }}>
                        {search ? 'No User found 🔍' : 'No one is online...'}
                    </div>
                ) : (
                    filtered.map((user) => {
                        const lastMsg = getLastMessage(user._id);
                        const unread = getUnreadCount(user._id);
                        const isSelected = selectedUser?._id === user._id;

                        return (
                            <div
                                key={user._id}
                                onClick={() => setSelectedUser(user)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 16px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid var(--wa-border)',
                                    background: isSelected ? 'var(--wa-active)' : 'transparent',
                                    transition: 'background 0.15s',
                                }}
                                onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = 'var(--wa-hover)'; }}
                                onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                            >
                                {/* Avatar with online dot */}
                                <div style={{ position: 'relative', flexShrink: 0 }}>
                                    <div
                                        style={{
                                            width: '46px',
                                            height: '46px',
                                            borderRadius: '50%',
                                            background: getAvatarColor(user.name),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: '600',
                                            fontSize: '16px',
                                            color: '#fff',
                                        }}
                                    >
                                        {getInitials(user.name)}
                                    </div>
                                    <span
                                        style={{
                                            position: 'absolute',
                                            bottom: '1px',
                                            right: '1px',
                                            width: '11px',
                                            height: '11px',
                                            background: 'var(--wa-online)',
                                            borderRadius: '50%',
                                            border: '2px solid #fff',
                                        }}
                                    />
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                                        <p style={{ fontWeight: '600', fontSize: '14px', color: 'var(--wa-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {user.name}
                                        </p>
                                        {lastMsg && (
                                            <span style={{ fontSize: '11px', color: unread > 0 ? 'var(--wa-green)' : 'var(--wa-muted)', flexShrink: 0, marginLeft: '8px' }}>
                        {new Date(lastMsg.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p style={{
                                            fontSize: '12px',
                                            color: 'var(--wa-muted)',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '170px',
                                        }}>
                                            {lastMsg ? lastMsg.text : 'Online'}
                                        </p>
                                        {unread > 0 && (
                                            <span style={{
                                                background: 'var(--wa-unread)',
                                                color: '#070707',
                                                borderRadius: '50%',
                                                width: '18px',
                                                height: '18px',
                                                fontSize: '10px',
                                                fontWeight: '700',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                marginLeft: '8px',
                                            }}>
                        {unread}
                      </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}