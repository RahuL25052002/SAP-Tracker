const express = require('express');
const router = express.Router();
const { addStudent, getStudents } = require('../controllers/studentController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, addStudent);
router.get('/:classId', auth, getStudents);

module.exports = router;
