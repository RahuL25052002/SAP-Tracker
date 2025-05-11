// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/StudentList';
import AddStudent from './AddStudent';
import Attendance from './Attendance';
import AttendancePerformance from './pages/AttendancePerformance';
import Reports from './pages/Reports';
import Classes from './pages/Classes';
import AboutUs from './pages/AboutUs';
import EditStudent from './pages/EditStudent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/edit-student/:id" element={<EditStudent/>}/>
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/attendance-performance" element={<AttendancePerformance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path='/aboutus' element={<AboutUs/>}></Route>
        <Route path="/classes" element={<Classes />} />
      </Routes>
    </Router>
  );
}

export default App;