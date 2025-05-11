import { z } from 'zod';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Form, Button, Card } from 'react-bootstrap';
import api from '../../services/api';

import bg1 from '../assets/bg1.jpg';
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';

// Zod validation schema for registration
const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    try {
      registerSchema.parse({ name, email, password });
    } catch (err) {
      toast.error(err.errors[0].message);
      return;
    }

    try {
      const res = await api.post('/register', { name, email, password });
      toast.success(res.data.message || 'Registration successful!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Registration failed';
      toast.error(errMsg);
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

      {/* Registration Form */}
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh', zIndex: 1, position: 'relative' }}
      >
        <Card
          className="p-4 shadow-lg"
          style={{
            width: '100%',
            maxWidth: '420px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: '16px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <h3 className="mb-4 text-center fw-bold text-dark">Register</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 fw-semibold">
              Register
            </Button>
          </Form>
        </Card>
      </Container>

      {/* Keyframes for background animation */}
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

export default Register;
