const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export const joinUser = async (name) => {
  const res = await fetch(`${BASE}/api/users/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  return res.json();
};

export const getOnlineUsers = async () => {
  const res = await fetch(`${BASE}/api/users/online`);
  return res.json();
};

export const getConversationMessages = async (userA, userB) => {
  const res = await fetch(`${BASE}/api/messages/conversation/${userA}/${userB}`);
  return res.json();
};

export const markAsRead = async (conversationId, userId) => {
  await fetch(`${BASE}/api/messages/read/${conversationId}/${userId}`, {
    method: 'PUT',
  });
};