const router = require('express').Router();
const { joinUser, getOnlineUsers } = require('../controllers/user.controller');

router.post('/join', joinUser);
router.get('/online', getOnlineUsers);

module.exports = router;