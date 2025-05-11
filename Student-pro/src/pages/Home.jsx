// pages/LandingPage.js
import React from 'react';
import { Container, Navbar, Nav, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" bg="light" className="shadow-sm">
        <Container>
          <Navbar.Brand className="fw-bold d-flex align-items-center gap-2">
            <img src="/favicon.ico" alt="SAP Tracker Logo" height="30" />
            SAP Tracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className="hero-section py-5" style={{ background: 'linear-gradient(to right, #e0f7ff, #ffffff)' }}>
        <Container className="text-center py-5">
          <h1 className="display-4 fw-bold">Student Attendance & Performance Tracker</h1>
          <p className="lead mt-3 mb-4">
            Manage attendance, monitor student performance, and generate real-time reports – all in one platform.
          </p>
          <Button as={Link} to="/login" variant="primary" size="lg" className="me-3">
            Get Started
          </Button>
          <Button as={Link} to="/register" variant="outline-secondary" size="lg">
            Create Account
          </Button>

          <blockquote className="blockquote mt-5 mb-0">
            <p className="fs-4 text-primary">"A good teacher is like a candle—it consumes itself to light the way for others."</p>
          </blockquote>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Features</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm feature-card text-center border-0">
                <Card.Body>
                  <div className="feature-icon mb-3 display-5">📝</div>
                  <Card.Title>Easy Attendance</Card.Title>
                  <Card.Text>Quickly mark and track student attendance with just a few clicks.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm feature-card text-center border-0">
                <Card.Body>
                  <div className="feature-icon mb-3 display-5">📚</div>
                  <Card.Title>Class Management</Card.Title>
                  <Card.Text>Create, update, and organize your classes efficiently.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm feature-card text-center border-0">
                <Card.Body>
                  <div className="feature-icon mb-3 display-5">📈</div>
                  <Card.Title>Performance Reports</Card.Title>
                  <Card.Text>Generate insightful reports to track and improve student outcomes.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>


      {/* Footer */}
      <footer className="bg-light py-3 text-center">
        <Container>
          <p className="mb-1">&copy; 2025 Student Attendance & Performance Tracker</p>
          <small>Contact:  <br /> rahulnikale05@gmail.com <br></br>
            pratikshaabuj1112@gmail.com <br />
            pujap2638@gmail.com
          </small>
        </Container>
      </footer>

      {/* Additional Styling */}
      <style>{`
        .feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background-color: #fff;
          border-radius: 12px;
        }
        .feature-card:hover {
          transform: scale(1.05) translateY(-10px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
        .feature-icon {
          color: #0d6efd;
        }
      `}</style>
    </>
  );
};

export default LandingPage;
