const express = require('express');
const { listOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, listOrders);
router.patch('/:id/status', protect, updateOrderStatus);

module.exports = router;
