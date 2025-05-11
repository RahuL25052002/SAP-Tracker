import React, { useState } from 'react';
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Button,
  Table,
  Spinner,
  Alert,
  Navbar,
  Nav
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AttendancePerformance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [classId, setClassId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAttendanceData = async () => {
    setLoading(true);
    setError('');
    setAttendanceData([]);

    try {
      const response = await axios.get('http://localhost:5000/attendance-performance', {
        params: { student_id: studentId.trim(), class_id: classId.trim() }
      });

      console.log('API Response:', response.data);

      if (Array.isArray(response.data)) {
        setAttendanceData(response.data);
      } else {
        setError('Unexpected data format from server.');
      }
    } catch (err) {
      console.log(err)
      console.error('Fetch error:', err);
      const message =
        err.response?.data?.message || 'Failed to fetch attendance data. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAttendanceData();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <>
      {/* Navbar */}
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
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow p-4">
              <h2 className="text-center mb-4">Attendance Performance</h2>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formStudentId">
                      <Form.Label>Student ID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formClassId">
                      <Form.Label>Class ID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Class ID"
                        value={classId}
                        onChange={(e) => setClassId(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-center mt-3">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Attendance'}
                  </Button>
                </div>
              </Form>

              {/* Spinner */}
              {loading && (
                <div className="text-center mt-4">
                  <Spinner animation="border" />
                </div>
              )}

              {/* Error Message */}
              {error && <Alert variant="danger" className="mt-4">{error}</Alert>}

              {/* Attendance Table */}
              {Array.isArray(attendanceData) && attendanceData.length > 0 && (
                <Table striped bordered hover responsive className="mt-4">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Student ID</th>
                      <th>Class ID</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((item, index) => (
                      <tr key={`${item.student_id}-${item.date}-${index}`}>
                        <td>{item.name}</td>
                        <td>{item.student_id}</td>
                        <td>{item.class_id}</td>
                        <td>{item.status}</td>
                        <td>{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              {/* No Records Message */}
              {!loading && !error && Array.isArray(attendanceData) && attendanceData.length === 0 && (
                <Alert variant="info" className="mt-4">
                  No attendance records found for the selected filters.
                </Alert>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AttendancePerformance;
