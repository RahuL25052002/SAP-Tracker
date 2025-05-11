// // pages/Classes.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';

// const Classes = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     subject: '',
//     teacher_id: ''
//   });

//   const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

//   const handleChange = (e) => {
//     setFormData({ 
//       ...formData, 
//       [e.target.name]: e.target.value 
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem('token');

//     if (!token) {
//       setAlert({ show: true, message: 'You must be logged in to add a class.', variant: 'danger' });
//       return;
//     }

//     try {
//       await axios.post('http://localhost:5000/api/classes', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setAlert({ show: true, message: 'Class added successfully!', variant: 'success' });
//       setFormData({ name: '', subject: '', teacher_id: '' });
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || 'Failed to add class.';
//       console.error('Error adding class:', error);
//       setAlert({ show: true, message: errorMsg, variant: 'danger' });
//     }
//   };

//   return (
//     <Container className="my-5">
//       <Row className="justify-content-md-center">
//         <Col md={8}>
//           <Card className="shadow-lg">
//             <Card.Header className="bg-primary text-white text-center">
//               <h4>Add New Class</h4>
//             </Card.Header>
//             <Card.Body>
//               {alert.show && (
//                 <Alert 
//                   variant={alert.variant} 
//                   onClose={() => setAlert({ ...alert, show: false })} 
//                   dismissible
//                 >
//                   {alert.message}
//                 </Alert>
//               )}

//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId="formClassName">
//                   <Form.Label>Class Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Enter class name"
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formSubject">
//                   <Form.Label>Subject</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     placeholder="Enter subject"
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4" controlId="formTeacherId">
//                   <Form.Label>Teacher ID</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="teacher_id"
//                     value={formData.teacher_id}
//                     onChange={handleChange}
//                     placeholder="Enter teacher ID"
//                     required
//                   />
//                 </Form.Group>

//                 <Button variant="success" type="submit" className="w-100">
//                   Add Class
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Classes;

// import React, { useState } from 'react';
// import { Container, Card, Form, Button, Table } from 'react-bootstrap';

// const Classes = () => {
//   const [className, setClassName] = useState('');
//   const [subject, setSubject] = useState('');
//   const [teacherId, setTeacherId] = useState('');
//   const [classList, setClassList] = useState(() => {
//     return JSON.parse(localStorage.getItem('classes')) || [];
//   });

//   const handleAddClass = (e) => {
//     e.preventDefault();
//     if (!className.trim() || !subject.trim() || !teacherId.trim()) return;

//     const newClass = { className, subject, teacherId };
//     const updatedList = [...classList, newClass];
//     localStorage.setItem('classes', JSON.stringify(updatedList));
//     setClassList(updatedList);
//     setClassName('');
//     setSubject('');
//     setTeacherId('');
//   };

//   return (
//     <Container className="py-5">
//       <Card className="p-4 shadow">
//         <h2 className="mb-4 text-center">Manage Classes</h2>
//         <Form onSubmit={handleAddClass} className="mb-3">
//           <Form.Group className="mb-3">
//             <Form.Label>Class Name</Form.Label>
//             <Form.Control
//               type="text"
//               value={className}
//               onChange={(e) => setClassName(e.target.value)}
//               placeholder="Enter class name"
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Subject</Form.Label>
//             <Form.Control
//               type="text"
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               placeholder="Enter subject"
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Teacher ID</Form.Label>
//             <Form.Control
//               type="text"
//               value={teacherId}
//               onChange={(e) => setTeacherId(e.target.value)}
//               placeholder="Enter teacher ID"
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit">Add Class</Button>
//         </Form>

//         <h4 className="mt-4">Class List</h4>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Class Name</th>
//               <th>Subject</th>
//               <th>Teacher ID</th>
//             </tr>
//           </thead>
//           <tbody>
//             {classList.map((cls, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{cls.className}</td>
//                 <td>{cls.subject}</td>
//                 <td>{cls.teacherId}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Card>
//     </Container>
//   );
// };

// export default Classes
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, Table, Navbar, Nav } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Classes = () => {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [classList, setClassList] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/classes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClassList(res.data);
    } catch (err) {
      console.error('Error fetching classes:', err);
      toast.error('Failed to fetch classes');
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    if (!className.trim() || !subject.trim() || !teacherId.trim()) return;
    try {
      const res = await axios.post(
        'http://localhost:5000/api/classes',
        {
          name: className,
          subject: subject,
          teacher_id: teacherId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Class added successfully');
      setClassList((prevClassList) => [
        ...prevClassList,
        { id: res.data.id, name: className, subject, teacher_id: teacherId }
      ]);
      setClassName('');
      setSubject('');
      setTeacherId('');
    } catch (err) {
      console.error('Error adding class:', err);
      toast.error('Error adding class');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <>
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

      <Container className="py-5">
        <Card className="p-4 shadow">
          <h2 className="mb-4 text-center">Manage Classes</h2>
          <Form onSubmit={handleAddClass} className="mb-3">
            <Form.Group className="mb-3">
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Enter class name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teacher ID</Form.Label>
              <Form.Control
                type="text"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                placeholder="Enter teacher ID"
              />
            </Form.Group>
            <Button variant="primary" type="submit">Add Class</Button>
          </Form>

          <h4 className="mt-4">Class List</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Class Name</th>
                <th>Subject</th>
                <th>Teacher ID</th>
              </tr>
            </thead>
            <tbody>
              {classList.map((cls, index) => (
                <tr key={cls.id || index}>
                  <td>{index + 1}</td>
                  <td>{cls.name}</td>
                  <td>{cls.subject}</td>
                  <td>{cls.teacher_id}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </>
  );
};

export default Classes;
