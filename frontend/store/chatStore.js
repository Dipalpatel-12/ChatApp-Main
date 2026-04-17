import { create } from 'zustand';

const useChatStore = create((set) => ({
  currentUser: null,
  onlineUsers: [],
  selectedUser: null,
  messages: [],
  conversationId: null,

  setCurrentUser: (user) => set({ currentUser: user }),
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setMessages: (messages) => set({ messages }),
  setConversationId: (id) => set({ conversationId: id }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  updateMessageStatus: (messageId, status) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m._id === messageId ? { ...m, status } : m
      ),
    })),

  markAllRead: () =>
    set((state) => ({
      messages: state.messages.map((m) => ({ ...m, status: 'read' })),
    })),
}));

export default useChatStore;