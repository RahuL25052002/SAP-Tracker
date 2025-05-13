const db = require('../config/db');

exports.markAttendance = (req, res) => {
  const { class_id, date, attendance } = req.body;
  if (!class_id || !date || !attendance) return res.status(400).json({ message: 'Missing fields' });

  attendance.forEach(entry => {
    db.query('INSERT INTO attendance (student_id, class_id, date, status) VALUES (?, ?, ?, ?)', [entry.student_id, class_id, date, entry.status], (err) => {
      if (err) console.log(err);
    });
  });

  res.json({ message: 'Attendance marked' });
};
