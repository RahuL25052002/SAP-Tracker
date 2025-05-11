const express = require('express');
const router = express.Router();
const { markAttendance } = require('../controllers/attendanceController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, markAttendance);

module.exports = router;
