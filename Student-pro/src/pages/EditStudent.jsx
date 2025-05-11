import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import api from '../../services/api';

const EditStudent = () => {
  const { id } = useParams(); // Get student ID from URL
  const navigate = useNavigate();

  const [student, setStudent] = useState({ name: '', roll_number: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  // Fetch student data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/students/${id}`);
        setStudent(res.data);
      } catch (err) {
        setError('Failed to load student data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await api.put(`/students/${id}`, student);
      alert('Student updated successfully!');
      navigate('/students');
    } catch (err) {
      setError('Failed to update student. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-center text-warning mb-4">✏️ Edit Student</h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                type="text"
                name="roll_number"
                value={student.roll_number}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" as={Link} to="/students">
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={updating}>
                {updating ? 'Updating...' : 'Update Student'}
              </Button>
            </div>
          </Form>
        )}
      </Card>
    </Container>
  );
};

export default EditStudent;