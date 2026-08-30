const express = require('express');
const { getInsights } = require('../controllers/aiInsightsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getInsights);

module.exports = router;
