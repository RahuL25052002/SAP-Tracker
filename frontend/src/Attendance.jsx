import React, { useEffect, useState } from 'react';
import { Container, Form, Table, Button, Row, Col, Alert, Spinner, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../services/api'; // Axios instance with token headers

const AttendancePage = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all classes on load
  useEffect(() => {
    api.get('/classes')
      .then((res) => setClasses(res.data))
      .catch(() => alert('Failed to fetch classes'));
  }, []);

  // Fetch students when class is selected
  useEffect(() => {
    if (!selectedClass) return;

    setLoading(true);
    api.get(`/students/${selectedClass}`)
      .then((res) => {
        setStudents(res.data);
        const initial = {};
        res.data.forEach((s) => (initial[s.id] = ''));
        setAttendance(initial);
      })
      .catch(() => alert('Failed to load students'))
      .finally(() => setLoading(false));
  }, [selectedClass]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({ ...attendance, [studentId]: status });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      class_id: parseInt(selectedClass),
      date,
      attendance: Object.entries(attendance).map(([studentId, status]) => ({
        student_id: parseInt(studentId),
        status,
      })),
    };

    try {
      await api.post('/attendance', payload);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      alert('Failed to submit attendance');
    }
  };

  return (
    <>
      {/* Navbar Component */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm px-4 mb-4">
        <Navbar.Brand className="fw-bold text-info">🎓 Student Attendance Tracker</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/students">View Students</Nav.Link>
            <Nav.Link as={Link} to="/add-student">Add Student</Nav.Link>
            <Nav.Link as={Link} to="/attendance">Attendance</Nav.Link>
            <Nav.Link as={Link} to="/attendance-performance">Performance</Nav.Link>
            <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
            <Nav.Link as={Link} to="/classes">Classes</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</Button>
        </Navbar.Collapse>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-5">
        <h2 className="mb-4 text-center">Attendance Tracker</h2>

        {submitted && (
          <Alert variant="success">Attendance submitted successfully!</Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-4">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Select Class</Form.Label>
                <Form.Select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  required
                >
                  <option value="">-- Select Class --</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Select Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {loading ? (
            <Spinner animation="border" />
          ) : students.length > 0 ? (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Student Name</th>
                    <th>Present</th>
                    <th>Absent</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.roll_number || 'N/A'}</td>
                      <td>{student.name}</td>
                      <td>
                        <Form.Check
                          type="radio"
                          name={`attendance-${student.id}`}
                          onChange={() =>
                            handleAttendanceChange(student.id, 'Present')
                          }
                          checked={attendance[student.id] === 'Present'}
                          required
                        />
                      </td>
                      <td>
                        <Form.Check
                          type="radio"
                          name={`attendance-${student.id}`}
                          onChange={() =>
                            handleAttendanceChange(student.id, 'Absent')
                          }
                          checked={attendance[student.id] === 'Absent'}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button type="submit" variant="primary" className="mt-3">
                Submit Attendance
              </Button>
            </>
          ) : (
            selectedClass && <p>No students found for this class.</p>
          )}
        </Form>
      </Container>
    </>
  );
};

export default AttendancePage;
