
# 📚 Student Attendance & Performance Tracker

A web-based application designed to help teachers efficiently manage student attendance and academic performance. Built using **Node.js**, **Express**, **MySQL**, **HTML/CSS**, and **JavaScript**, the app allows teachers to:

- Register/Login securely
- Create and manage classes
- Add students to classes
- Mark daily attendance
- Record and view student grades
- View reports for performance and attendance

---

## 🛠️ Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Frontend    | react, react-bootstrap      |
| Backend     | Node.js, Express.js         |
| Database    | MySQL                       |
| Auth        | JWT (JSON Web Tokens), bcrypt |
| Charts      | Chart.js (for performance reports) |

---

## ⚙️ Features

- ✅ Teacher Registration and Login with secure password hashing
- ✅ JWT-based route protection
- ✅ Class and Student management
- ✅ Daily Attendance Marking
- ✅ Grade entry and performance tracking
- ✅ API-based dynamic frontend
- ✅ Charts and reports (attendance % and average marks)

---

## 🧱 Database Schema Overview

**Tables:**
- `teachers` — stores teacher credentials
- `classes` — each class is linked to a teacher
- `students` — linked to a class
- `attendance` — stores daily student attendance records
- `grades` — stores subject-wise grades for each student


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/RahuL25052002/SAP-Tracker.git
cd student-attendance-tracker
