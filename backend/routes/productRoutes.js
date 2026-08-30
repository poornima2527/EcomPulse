const express = require('express');
const { listProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, listProducts);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
