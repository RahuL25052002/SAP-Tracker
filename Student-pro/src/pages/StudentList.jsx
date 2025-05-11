import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Button,
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Table
} from 'react-bootstrap';
import api from '../../services/api';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all students from the server
  const fetchStudents = async () => {
    try {
      const res = await api.get('/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Failed to fetch students. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle student deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/students/${id}`);
      alert('Student deleted successfully!');
      fetchStudents(); // Refresh student list after deletion
    } catch (err) {
      alert('Failed to delete student.');
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm px-4">
        <Navbar.Brand className="fw-bold text-info">🎓 Student Attendance Tracker</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/students">Students</Nav.Link>
            <Nav.Link as={Link} to="/add-student">Add</Nav.Link>
            <Nav.Link as={Link} to="/attendance">Attendance</Nav.Link>
            <Nav.Link as={Link} to="/attendance-performance">Performance</Nav.Link>
            <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
            <Nav.Link as={Link} to="/classes">Classes</Nav.Link>
          </Nav>
          <Button variant="outline-info" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="shadow p-4">
              <h2 className="text-center mb-4 text-primary">📋 Student List</h2>

              {loading && (
                <div className="text-center my-4">
                  <Spinner animation="border" variant="primary" />
                </div>
              )}

              {error && <Alert variant="danger">{error}</Alert>}

              {!loading && !error && students.length === 0 && (
                <Alert variant="info">No students found.</Alert>
              )}

              {!loading && !error && students.length > 0 && (
                <Table striped hover responsive bordered className="mt-3">
                  <thead className="table-primary">
                    <tr>
                      <th>#ID</th>
                      <th>Name</th>
                      <th>Roll Number</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.roll_number}</td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            as={Link}
                            to={`/edit-student/${student.id}`} // Edit student link
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="ml-2"
                            onClick={() => handleDelete(student.id)} // Delete button
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StudentList;