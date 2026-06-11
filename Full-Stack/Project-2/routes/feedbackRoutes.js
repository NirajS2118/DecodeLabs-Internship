const express = require('express');
const router = express.Router();
const { getAllFeedback, submitFeedback } = require('../controllers/feedbackController');
const validateFeedback = require('../middleware/validateFeedback');

router.get('/', getAllFeedback);
router.post('/', validateFeedback, submitFeedback);

module.exports = router;
