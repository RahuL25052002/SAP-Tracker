import React, { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Container, Form, Button, Card, Row, Col, Carousel, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const quotes = [
  "A teacher affects eternity; they can never tell where their influence stops.",
  "Teaching is the one profession that creates all other professions.",
  "The best teachers are those who show you where to look but don’t tell you what to see.",
  "Education is the most powerful weapon which you can use to change the world.",
];

const AddStudent = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    roll_number: '',
    class_id: '',
  });

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const { name, roll_number, class_id } = studentData;

    if (!name || !roll_number || !class_id) {
      return toast.error('All fields are required');
    }

    try {
      await api.post('/students', studentData);
      toast.success('Student added successfully');
      setStudentData({ name: '', roll_number: '', class_id: '' });
    } catch (err) {
      toast.error('Failed to add student');
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
      <Container fluid className="py-5 px-3" style={{ backgroundColor: '#f8f9fa' }}>
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={6} lg={5}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Header className="bg-primary text-white text-center rounded-top-4">
                <h4 className="mb-0 py-2">🎓 Add New Student</h4>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={handleAdd}>
                  <Form.Group className="mb-3">
                    <Form.Label>Student Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter student name"
                      value={studentData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Roll Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="roll_number"
                      placeholder="Enter roll number"
                      value={studentData.roll_number}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Class ID</Form.Label>
                    <Form.Control
                      type="number"
                      name="class_id"
                      placeholder="Enter class ID"
                      value={studentData.class_id}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button variant="success" type="submit" className="w-100">
                    ➕ Add Student
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Quote Section */}
          <Col xs={12} md={6} className="mt-4 mt-md-0">
            <Carousel fade indicators={false} interval={5000}>
              {quotes.map((quote, idx) => (
                <Carousel.Item key={idx}>
                  <div className="text-center p-4">
                    <blockquote className="blockquote">
                      <p className="fs-5 fst-italic">"{quote}"</p>
                      <footer className="blockquote-footer">Teacher's Inspiration</footer>
                    </blockquote>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddStudent;
