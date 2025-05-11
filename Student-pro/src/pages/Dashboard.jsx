import './Dashboard.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
  Carousel
} from 'react-bootstrap';
import { motion } from 'framer-motion';
import studentImg from '../assets/bg1.jpg'; // Ensure path is correct

const quotes = [
  "A teacher affects eternity; he can never tell where his influence stops.",
  "The best teachers teach from the heart, not from the book.",
  "Teaching is the one profession that creates all other professions."
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.info('Logged out');
    navigate('/login');
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

      {/* Main Dashboard Layout */}
      <Container className="mt-3">
        <Row className="align-items-center g-4">
          {/* Left Side: Welcome Card + Quotes */}
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-4 shadow rounded-4">
                <h2 className="fw-bold mb-3">👋 Welcome to the Dashboard</h2>
                <p className="text-muted">
                  Use the navigation bar above to manage students, attendance, reports, and more.
                </p>
                <div className="d-flex gap-3 mt-3 flex-wrap">
                  <Button variant="primary" as={Link} to="/students">
                    Go to Students
                  </Button>
                  <Button variant="success" as={Link} to="/add-student">
                    Add New Student
                  </Button>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Carousel fade indicators={false} controls={false} className="mt-4">
                {quotes.map((quote, idx) => (
                  <Carousel.Item key={idx}>
                    <Card className="p-3 bg-light text-center shadow-sm rounded-3">
                      <em>“{quote}”</em>
                    </Card>
                  </Carousel.Item>
                ))}
              </Carousel>
            </motion.div>
          </Col>

          {/* Right Side: Image */}
          <Col md={6}>
            <motion.img
              src={studentImg}
              alt="Students"
              className="img-fluid rounded-4 shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          </Col>
        </Row>
      </Container>

      {/* Footer */}
            <footer className="bg-light py-3 text-center">
              <Container>
                <p className="mb-1">&copy; 2025 Student Attendance & Performance Tracker</p>
                <small>Contact: support@saptracker.com</small>
              </Container>
            </footer>
    </>
  );
};

export default Dashboard;
