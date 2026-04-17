'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useChatStore from '@/store/chatStore';
import useSocket from '@/hooks/useSocket';
import Sidebar from '@/components/chat/Sidebar';
import ChatWindow from '@/components/chat/ChatWindow';

export default function ChatPage() {
  const { currentUser } = useChatStore();
  const router = useRouter();
  useSocket();

  useEffect(() => {
    if (!currentUser) router.push('/');
  }, [currentUser]);

  if (!currentUser) return null;

  return (
      <div className="flex h-screen overflow-hidden bg-[var(--wa-bg)]">
        <Sidebar />
        <ChatWindow />
      </div>
  );
}