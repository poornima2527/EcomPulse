const express = require('express');
const { listCustomers } = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, listCustomers);

module.exports = router;
