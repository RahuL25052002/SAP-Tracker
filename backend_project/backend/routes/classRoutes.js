const express = require('express');
const router = express.Router();
const { createClass, getClasses } = require('../controllers/classController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createClass);
router.get('/', auth, getClasses);

module.exports = router;
