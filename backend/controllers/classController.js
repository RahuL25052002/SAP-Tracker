const db = require('../config/db');

exports.createClass = (req, res) => {
  const { name, subject } = req.body;
  const teacher_id = req.user.id;

  if (!name || !subject) return res.status(400).json({ message: 'All fields are required' });

  db.query('INSERT INTO classes (name, subject, teacher_id) VALUES (?, ?, ?)', [name, subject, teacher_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Class created' });
  });
};

exports.getClasses = (req, res) => {
  const teacher_id = req.user.id;
  db.query('SELECT * FROM classes WHERE teacher_id = ?', [teacher_id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
