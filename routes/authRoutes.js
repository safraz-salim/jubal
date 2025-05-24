const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { register, login, getUser } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getUser);

module.exports = router;
