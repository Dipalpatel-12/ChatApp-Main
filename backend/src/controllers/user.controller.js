const User = require('../models/User.model');

// Naam se user banao ya dhundo
exports.joinUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.create({ name });
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Saare online users
exports.getOnlineUsers = async (req, res) => {
  try {
    const users = await User.find({ isOnline: true }).select('-socketId');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};