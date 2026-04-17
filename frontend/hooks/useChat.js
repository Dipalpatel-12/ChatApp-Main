'use client';
import { useEffect } from 'react';
import socket from '@/lib/socket';
import { getConversationMessages, markAsRead } from '@/lib/api';
import useChatStore from '@/store/chatStore';

export default function useChat() {
  const {
    selectedUser,
    currentUser,
    setMessages,
    setConversationId,
  } = useChatStore();

  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    const fetchMessages = async () => {
      const data = await getConversationMessages(
        currentUser._id,
        selectedUser._id
      );
      if (data.success) {
        setConversationId(data.conversationId);
        setMessages(data.messages);
        await markAsRead(data.conversationId, currentUser._id);
        socket.emit('message:read', {
          conversationId: data.conversationId,
          senderId: selectedUser._id,
        });
      }
    };

    fetchMessages();
  }, [selectedUser]);

  const sendMessage = (text) => {
    if (!selectedUser || !text.trim()) return;
    socket.emit('message:send', {
      receiverId: selectedUser._id,
      text: text.trim(),
    });
  };

  return { sendMessage };
}