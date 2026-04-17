const router = require('express').Router();
const { getMessages, markAsRead } = require('../controllers/message.controller');

router.get('/:conversationId', getMessages);
router.put('/read/:conversationId/:userId', markAsRead);

module.exports = router;