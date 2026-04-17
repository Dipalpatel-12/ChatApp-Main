'use client';
import { useEffect } from 'react';
import socket from '@/lib/socket';
import useChatStore from '@/store/chatStore';

export default function useSocket() {
  const {
    currentUser,
    setOnlineUsers,
    addMessage,
    updateMessageStatus,
    markAllRead,
  } = useChatStore();

  useEffect(() => {
    if (!currentUser) return;

    socket.connect();
    socket.emit('user:join', currentUser._id);

    socket.on('users:online', (users) => setOnlineUsers(users));

    socket.on('message:received', (message) => addMessage(message));
    socket.on('message:sent', (message) => addMessage(message));

    socket.on('message:status', ({ messageId, status }) =>
      updateMessageStatus(messageId, status)
    );

    socket.on('message:read', () => markAllRead());

    return () => {
      socket.off('users:online');
      socket.off('message:received');
      socket.off('message:sent');
      socket.off('message:status');
      socket.off('message:read');
      socket.disconnect();
    };
  }, [currentUser]);

  return socket;
}