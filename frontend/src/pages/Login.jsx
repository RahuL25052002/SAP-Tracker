import { z } from 'zod';  // Import Zod
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';

import bg1 from '../assets/bg1.jpg'; // Replace with your actual paths
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';

// Zod validation schema for login
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validate input using Zod schema
    try {
      loginSchema.parse({ email, password });  // This will throw an error if validation fails
    } catch (err) {
      toast.error(err.errors[0].message);
      return;
    }

    if (!email || !password) {
      toast.error('All fields are required');
      return;
    }

    try {
      const res = await api.post('/login', { email, password });
      toast.success('Login successful');
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error('User not found. Please register first.');
      } else {
        toast.error('Login failed. Check your credentials.');
      }
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Background Slideshow */}
      <div
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          zIndex: 0,
          top: 0,
          left: 0,
        }}
      >
        {[bg1, bg2, bg3].map((bg, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0,
              animation: 'slideShow 15s infinite',
              animationDelay: `${index * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Login Form */}
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}
      >
        <Row>
          <Col>
            <Card className="shadow-lg p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
              <Card.Body>
                <h3 className="text-center mb-4">Login</h3>
                <Form>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" onClick={handleLogin}>
                      Login
                    </Button>
                  </div>
                </Form>

                <p className="text-center mt-3">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-decoration-none">
                    Register here
                  </Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Slideshow Keyframes */}
      <style>{`
        @keyframes slideShow {
          0% { opacity: 0; }
          10% { opacity: 1; }
          30% { opacity: 1; }
          40% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Login;
