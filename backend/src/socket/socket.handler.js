const User = require('../models/User.model');
const Message = require('../models/Message.model');
const Conversation = require('../models/Conversation.model');
const { getOrCreateConversation } = require('../controllers/message.controller');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // ── 1. USER JOIN ──
    socket.on('user:join', async (userId) => {
      try {
        const user = await User.findByIdAndUpdate(
            userId,
            { socketId: socket.id, isOnline: true },
            {
              returnDocument: 'after'
            }
        );
        socket.userId = userId;
        socket.emit('user:updated', user);

        // Saare online users broadcast karo
        const onlineUsers = await User.find({ isOnline: true }).select('-socketId');
        io.emit('users:online', onlineUsers);
      } catch (err) {
        console.error(err);
      }
    });

    // ── 2. MESSAGE SEND ──
    socket.on('message:send', async ({ receiverId, text }) => {
      try {
        const conversation = await getOrCreateConversation(socket.userId, receiverId);

        // Message save karo
        const message = await Message.create({
          conversationId: conversation._id,
          senderId: socket.userId,
          receiverId,
          text,
          status: 'sent',
        });

        // Conversation update karo
        await Conversation.findByIdAndUpdate(conversation._id, {
          lastMessage: message._id,
          lastMessageText: text,
          lastMessageTime: new Date(),
          $inc: { [`unreadCount.${receiverId}`]: 1 },
        });

        const populated = await message.populate('senderId', 'name');

        // Sender ko confirm karo
        socket.emit('message:sent', populated);

        // Receiver ko bhejo
        const receiver = await User.findById(receiverId);
        if (receiver?.socketId) {
          io.to(receiver.socketId).emit('message:received', populated);
        }
      } catch (err) {
        console.error(err);
      }
    });

    // ── 3. MESSAGE DELIVERED ──
    socket.on('message:delivered', async ({ messageId }) => {
      try {
        const message = await Message.findByIdAndUpdate(
          messageId,
          { status: 'delivered' },
            {
              returnDocument: 'after'
            }
        );
        const sender = await User.findById(message.senderId);
        if (sender?.socketId) {
          io.to(sender.socketId).emit('message:status', {
            messageId,
            status: 'delivered',
          });
        }
      } catch (err) {
        console.error(err);
      }
    });

    // ── 4. MESSAGE READ ──
    socket.on('message:read', async ({ conversationId, senderId }) => {
      try {
        await Message.updateMany(
          { conversationId, receiverId: socket.userId, status: { $ne: 'read' } },
          { status: 'read' }
        );
        const sender = await User.findById(senderId);
        if (sender?.socketId) {
          io.to(sender.socketId).emit('message:read', { conversationId });
        }
      } catch (err) {
        console.error(err);
      }
    });

    // ── 5. TYPING ──
    socket.on('typing:start', async ({ receiverId }) => {
      const receiver = await User.findById(receiverId);
      if (receiver?.socketId) {
        io.to(receiver.socketId).emit('typing:start', { senderId: socket.userId });
      }
    });

    socket.on('typing:stop', async ({ receiverId }) => {
      const receiver = await User.findById(receiverId);
      if (receiver?.socketId) {
        io.to(receiver.socketId).emit('typing:stop', { senderId: socket.userId });
      }
    });

    // ── 6. DISCONNECT ──
    socket.on('disconnect', async () => {
      if (!socket.userId) return;
      await User.findByIdAndUpdate(socket.userId, {
        socketId: null,
        isOnline: false,
        lastSeen: new Date(),
      });
      const onlineUsers = await User.find({ isOnline: true }).select('-socketId');
      io.emit('users:online', onlineUsers);
    });
  });
};