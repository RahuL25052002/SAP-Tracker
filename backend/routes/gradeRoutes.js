const express = require('express');
const router = express.Router();
const { addGrade } = require('../controllers/gradeController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addGrade);

module.exports = router;
