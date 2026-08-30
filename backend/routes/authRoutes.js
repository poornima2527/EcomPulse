const express = require('express');
const { login, register, getProfile, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', protect, getProfile);
router.post('/logout', protect, logout);

module.exports = router;
