const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    messageType: {
      type: String,
      enum: ['text', 'image', 'file'],
      default: 'text',               // future me image/file
    },
    status: {
      type: String,
      enum: ['sent', 'delivered', 'read'],
      default: 'sent',               // tick system ke liye
    },
    isDeleted: {
      type: Boolean,
      default: false,                // "This message was deleted"
    },
  },
  {
    timestamps: true,
  }
);

// Index — do logon ke beech messages fast dhundne ke liye
messageSchema.index({ conversationId: 1, createdAt: 1 });
messageSchema.index({ senderId: 1, receiverId: 1 });

module.exports = mongoose.model('Message', messageSchema);