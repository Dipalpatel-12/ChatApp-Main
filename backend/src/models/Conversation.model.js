const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: null,
    },
    lastMessageText: {
      type: String,
      default: '',          // sidebar me preview ke liye
    },
    lastMessageTime: {
      type: Date,
      default: Date.now,
    },
    unreadCount: {
      type: Map,
      of: Number,
      default: {},          // { "userId1": 3, "userId2": 0 }
    },
  },
  {
    timestamps: true,
  }
);

// Index — user ki saari conversations fast dhundne ke liye
conversationSchema.index({ participants: 1 });
conversationSchema.index({ lastMessageTime: -1 });

module.exports = mongoose.model('Conversation', conversationSchema);