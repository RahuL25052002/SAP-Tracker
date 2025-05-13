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
  Carousel,
} from 'react-bootstrap';
import { motion } from 'framer-motion';
import './Dashboard.css';
import studentImg from '../assets/bg1.jpg';

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
      {/* Animated Gradient Background */}
      <div className="gradient-background"></div>

      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm px-4 mb-4 position-relative z-3">
        <Navbar.Brand className="fw-bold text-info">
          🎓 Student Attendance Tracker
        </Navbar.Brand>
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

      {/* Main Section */}
      <Container className="dashboard-container py-5 position-relative z-2">
        <Row className="align-items-center g-4">
          {/* Left: Welcome Card + Buttons + Quotes */}
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-card text-dark p-4 shadow-lg rounded-4 border-0">
                <h2 className="fw-bold mb-3">👋 Welcome to the Dashboard</h2>
                <p className="text-light opacity-75">
                  Use the navigation bar above to manage students, attendance, reports, and more.
                </p>
                <div className="d-flex gap-3 mt-3 flex-wrap">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button variant="primary" as={Link} to="/students" className="rounded-pill px-4">
                      Go to Students
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button variant="success" as={Link} to="/add-student" className="rounded-pill px-4">
                      Add New Student
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Carousel fade indicators={false} controls={false} className="mt-4" interval={4000}>
                {quotes.map((quote, idx) => (
                  <Carousel.Item key={idx}>
                    <Card className="p-3 bg-light text-center shadow-sm rounded-3">
                      <em>📝 “{quote}”</em>
                    </Card>
                  </Carousel.Item>
                ))}
              </Carousel>
            </motion.div>
          </Col>

          {/* Right: Image */}
          <Col md={6}>
            <motion.img
              src={studentImg}
              alt="Students"
              className="img-fluid rounded-4 shadow-lg dashboard-image"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            />
          </Col>
        </Row>
      </Container>

      {/* Background Wave SVG */}
      <div className="custom-wave-background">
        <svg viewBox="0 0 1440 320">
          <path
            fill="#f8f9fa"
            fillOpacity="1"
            d="M0,96L80,106.7C160,117,320,139,480,160C640,181,800,203,960,176C1120,149,1280,75,1360,37.3L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light py-4 text-center">
        <Container>
          <p className="mb-1">&copy; 2025 Student Attendance & Performance Tracker</p>
          <small>📧 Contact: support@saptracker.com</small>
        </Container>
      </footer>
    </>
  );
};

export default Dashboard;
