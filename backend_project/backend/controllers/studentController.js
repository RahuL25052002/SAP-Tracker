const db = require('../config/db');

exports.addStudent = (req, res) => {
  const { name, roll_number, class_id } = req.body;
  if (!name || !roll_number || !class_id) return res.status(400).json({ message: 'All fields are required' });

  db.query('INSERT INTO students (name, roll_number, class_id) VALUES (?, ?, ?)', [name, roll_number, class_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Student added' });
  });
};

exports.getStudents = (req, res) => {
  const classId = req.params.classId;
  db.query('SELECT * FROM students WHERE class_id = ?', [classId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
