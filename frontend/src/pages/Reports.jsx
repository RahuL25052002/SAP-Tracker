import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/api';
import {
  Container,
  Form,
  Button,
  Spinner,
  Row,
  Col,
  Alert,
  Navbar,
  Nav,
} from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Report = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [classId, setClassId] = useState('');
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');
  const [activeChart, setActiveChart] = useState('bar');

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.info('Logged out');
    navigate('/login');
  };

  useEffect(() => {
    axiosInstance
      .get('/classes')
      .then(res => setClasses(res.data))
      .catch(err => {
        console.error('Error fetching classes:', err);
        setError('Failed to fetch classes');
      });
  }, []);

  const fetchReportData = async () => {
    if (!startDate || !endDate || !classId) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axiosInstance.get('/attendance-report', {
        params: { startDate, endDate, classId },
      });

      const present = res.data.filter(row => row.status === 'Present').length;
      const absent = res.data.filter(row => row.status === 'Absent').length;

      const dataset = {
        labels: ['Present', 'Absent'],
        datasets: [
          {
            label: 'Attendance Count',
            data: [present, absent],
            backgroundColor: ['#28a745', '#dc3545'],
            borderRadius: 6,
          },
        ],
      };

      setBarData(dataset);
      setPieData({
        labels: ['Present', 'Absent'],
        datasets: [
          {
            data: [present, absent],
            backgroundColor: ['#28a745', '#dc3545'],
            borderWidth: 1,
          },
        ],
      });
    } catch (err) {
      console.error('Error fetching report:', err);
      setError('Failed to fetch report data');
    } finally {
      setLoading(false);
    }
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

      {/* Main Report Content */}
      <Container className="mt-4">
        <h2 className="text-center fw-bold mb-4">📊 Attendance Report</h2>

        <Form>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Class</Form.Label>
                <Form.Select value={classId} onChange={(e) => setClassId(e.target.value)}>
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name || `Class ${cls.id}`}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-center mb-3">
            <Button variant="primary" onClick={fetchReportData} disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Generate Report'}
            </Button>
          </div>
        </Form>

        {error && <Alert variant="danger">{error}</Alert>}

        {barData && pieData && (
          <>
            <div className="d-flex justify-content-center gap-3 mb-4">
              <Button
                variant={activeChart === 'bar' ? 'success' : 'outline-success'}
                onClick={() => setActiveChart('bar')}
              >
                Bar Chart
              </Button>
              <Button
                variant={activeChart === 'pie' ? 'danger' : 'outline-danger'}
                onClick={() => setActiveChart('pie')}
              >
                Pie Chart
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {activeChart === 'bar' ? (
                <motion.div
                  key="bar"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="chart-container mx-auto"
                  style={{ maxWidth: 500, height: 300 }}
                >
                  <Bar
                    data={barData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: 'bottom' },
                      },
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="pie"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="chart-container mx-auto"
                  style={{ maxWidth: 400 }}
                >
                  <Pie
                    data={pieData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: 'bottom' },
                      },
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </Container>
    </>
  );
};

export default Report;
