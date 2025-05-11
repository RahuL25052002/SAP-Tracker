const express = require('express');
const mysql = require('mysql2');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors=require('cors')
require('dotenv').config();



app.use(express.json());
app.use(cors())
const moment = require('moment');


// ✅ MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'rahul',
  password: 'cdac',
  database: 'attendance_db'
});


db.connect(err => {
  if (err) throw err;
  console.log('DB Connected...');
});

// ✅ Mark Attendance Route
app.post('/api/attendance', (req, res) => {
  const { class_id, date, attendance } = req.body;

  // 🔒 Check if all required fields are provided
  if (!class_id || !date || !attendance) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // Loop through each student's attendance entry
  attendance.forEach(entry => {
    const { student_id, status } = entry;

    // Save each student's attendance to the database
    const sql = 'INSERT INTO attendance (student_id, class_id, date, status) VALUES (?, ?, ?, ?)';
    db.query(sql, [student_id, class_id, date, status], (err) => {
      if (err) {
        console.error('Error saving attendance for student:', student_id, err.message);
      }
    });
  });

  // ✅ Send success response
  res.json({ message: 'Attendance marked successfully' });
});




// ✅ Register Route
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    // 🔒 Check for missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // 🔐 Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // 📦 Save to database
      const sql = 'INSERT INTO teachers (name, email, password) VALUES (?, ?, ?)';
      db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Registration successful' });
      });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
  // ✅ Login Route
  app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
  
    // 🔍 Find teacher by email
    const sql = 'SELECT * FROM teachers WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
      if (err || results.length === 0) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const teacher = results[0];
  
      // 🔐 Compare hashed passwords
      const valid = await bcrypt.compare(password, teacher.password);
      if (!valid) {
        return res.status(400).json({ message: 'Invalid password' });
      }
  
      // 🪪 Generate JWT token
      const token = jwt.sign({ id: teacher.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
  
      res.json({ token, message: 'Login successful' });
    });
  });


// ✅ Middleware to verify token and get teacher ID
function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.status(401).json({ message: 'Token required' });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = user; // contains teacher ID
      next();
    });
  }
  
  // ✅ Create a new class
  app.post('/api/classes', authenticate, (req, res) => {
    const { name, subject } = req.body;
    const teacher_id = req.user.id;
  
    if (!name || !subject) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const sql = 'INSERT INTO classes (name, subject, teacher_id) VALUES (?, ?, ?)';
    db.query(sql, [name, subject, teacher_id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Class created successfully' });
    });
  });
  
  // ✅ Get all classes for the logged-in teacher
  app.get('/api/classes', authenticate, (req, res) => {
    const teacher_id = req.user.id;
  
    db.query('SELECT * FROM classes WHERE teacher_id = ?', [teacher_id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });



// ✅ Add grade for a student
app.post('/api/grades',authenticate, (req, res) => {
    const { student_id, subject, marks } = req.body;
  
    // 🔒 Check if all fields are provided
    if (!student_id || !subject || !marks) {
      return res.status(400).json({ message: 'Missing fields' });
    }
  
    // 📥 Save grade into the database
    const sql = 'INSERT INTO grades (student_id, subject, marks) VALUES (?, ?, ?)';
    db.query(sql, [student_id, subject, marks], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Grade recorded successfully' });
    });
  });


// ✅ Add a new student
app.post('/api/students',authenticate,(req, res) => {
    const { name, roll_number, class_id } = req.body;
  
    // 🔒 Validate input
    if (!name || !roll_number || !class_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // 📥 Insert into database
    const sql = 'INSERT INTO students (name, roll_number, class_id) VALUES (?, ?, ?)';
    db.query(sql, [name, roll_number, class_id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Student added successfully' });
    });
  });

  app.delete('/api/students/:id', authenticate, (req, res) => {
    const studentId = req.params.id;
  
    // 🔒 Validate the ID
    if (!studentId) {
      return res.status(400).json({ message: 'Student ID is required.' });
    }
  
    const deleteQuery = 'DELETE FROM students WHERE id = ?';
  
    db.query(deleteQuery, [studentId], (err, result) => {
      if (err) {
        console.error('Error deleting student:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Student not found.' });
      }
  
      res.json({ message: 'Student deleted successfully.' });
    });
  });

  app.put('/api/students/:id', authenticate, (req, res) => {
    const studentId = req.params.id;
    const { name, roll_number, class_id } = req.body;
  
    if (!name || !roll_number || !class_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const sql = 'UPDATE students SET name = ?, roll_number = ?, class_id = ? WHERE id = ?';
    db.query(sql, [name, roll_number, class_id, studentId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Student updated successfully' });
    });
  });
  
  // ✅ Get student by ID (backend)
app.get('/api/students/:id', authenticate, (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM students WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(result[0]);
  });
});

  
  
  // ✅ Get students by class ID
  app.get('/api/students/:classId',authenticate, (req, res) => {
    const classId = req.params.classId;
  
    const sql = 'SELECT * FROM students WHERE class_id = ?';
    db.query(sql, [classId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });


  // GET all students
app.get('/api/students', (req, res) => {
  const query = 'SELECT id, name, roll_number FROM students';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err);
      res.status(500).json({ error: 'Failed to fetch students' });
      return;
    }
    res.json(results);
  });
});


app.get('/api/attendance-report',authenticate, (req, res) => {
  const { startDate, endDate, classId } = req.query;

  // Validate required query parameters
  if (!startDate || !endDate || !classId) {
    return res.status(400).json({ error: 'startDate, endDate, and classId are required' });
  }

  // Format the dates using moment.js
  const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
  const formattedEndDate = moment(endDate).format('YYYY-MM-DD');

  // SQL query to fetch attendance data within the given date range and classId
  const query = `
    SELECT s.name, a.student_id, a.class_id, a.date, a.status
    FROM attendance a
    JOIN students s ON a.student_id = s.id
    WHERE a.class_id = ? 
      AND a.date BETWEEN ? AND ?
    ORDER BY a.date ASC
  `;

  // Execute the query with query parameters
  db.query(query, [classId, formattedStartDate, formattedEndDate], (err, results) => {
    if (err) {
      console.log(err)
      console.error('Error fetching attendance data:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    // Return the results as a JSON response
    res.json(results);
  });
});

app.get('/attendance-performance', (req, res) => {
  const { student_id, class_id } = req.query;

  if (!student_id || !class_id) {
    return res.status(400).json({ error: 'student_id and class_id are required' });
  }

  const query = `
    SELECT 
      a.student_id,
      a.class_id,
      s.name,
      a.status,
      DATE_FORMAT(a.date, '%Y-%m-%d') as date
    FROM attendance a
    JOIN students s ON a.student_id = s.id
    WHERE a.student_id = ? AND a.class_id = ?
    ORDER BY a.date DESC
  `;

  db.query(query, [student_id, class_id], (err, rows) => {
    if (err) {
      console.error('Error fetching attendance performance:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(rows);
  });
});




  


// ✅ Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
