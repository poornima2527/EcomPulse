const express = require('express');
const { listInventory, restockItem } = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, listInventory);
router.patch('/:id/restock', protect, restockItem);

module.exports = router;
