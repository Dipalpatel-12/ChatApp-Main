const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name required'],
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    socketId: {
      type: String,
      default: null,       // connect hone pe update hoga
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,   // disconnect pe update hoga
    },
    avatar: {
      type: String,
      default: '',         // future me image URL
    },
  },
  {
    timestamps: true,      // createdAt, updatedAt auto
  }
);

module.exports = mongoose.model('User', userSchema);