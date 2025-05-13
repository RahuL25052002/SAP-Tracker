const db = require('../config/db');

exports.addGrade = (req, res) => {
  const { student_id, subject, marks } = req.body;
  if (!student_id || !subject || !marks) return res.status(400).json({ message: 'Missing fields' });

  db.query('INSERT INTO grades (student_id, subject, marks) VALUES (?, ?, ?)', [student_id, subject, marks], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Grade recorded' });
  });
};
