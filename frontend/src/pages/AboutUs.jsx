import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const teamMembers = [
  {
    name: 'Rahul Nikale',
    role: 'Team Lead and Backend Developer',
    description: 'Rahul oversees the entire project, ensuring everything runs smoothly and that the team stays on track.',
    github: 'https://github.com/Rahul25052002',
    linkedin: 'https://linkedin.com',
    img: '/rahu.jpeg',
  },
  {
    name: 'Pratiksha Abuj',
    role: 'Frontend Developer',
    description: 'Pratiksha is responsible for building the user interface, ensuring the design is both functional and attractive.',
    github: 'https://github.com/Pratiksha-Abuj/dacfeb25',
    linkedin: 'https://linkedin.com',
    img: '/pratiksha.jpeg',
  },
  {
    name: 'Pooja Patil',
    role: 'Database Handling',
    description: 'Pooja focuses on the server-side logic, creating the database structure and handling API integrations.',
    github: 'https://github.com/pooja-patil1-kharghar',
    linkedin: 'https://linkedin.com',
    img: '/pooja.jpeg',
  },
];

const AboutUs = () => {
  return (
    <>
      <Container className="mt-5">
        <h2 className="text-center mb-4">About Us</h2>

        <div className="project-description mb-5 text-center">
          <h3>Project: Student Attendance and Performance Tracker</h3>
          <p>
            This web application helps teachers efficiently track student attendance and performance. The system allows
            teachers to manage their classes, mark attendance, and generate reports based on student performance.
          </p>
        </div>

        <h4 className="text-center mb-4">Our Team</h4>
        <Row>
          {teamMembers.map((member, idx) => (
            <Col md={4} key={idx}>
              <Card className="team-member">
                <Card.Img
                  variant="top"
                  src={member.img}
                  alt={member.name}
                  className="rounded-circle mx-auto mt-3"
                  style={{ width: '120px', height: '120px' }}
                />
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{member.role}</Card.Subtitle>
                  <Card.Text>{member.description}</Card.Text>
                  <div className="social-links">
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="me-3">
                      <FontAwesomeIcon icon={faGithub} size="lg" />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faLinkedin} size="lg" />
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <footer className="footer mt-5 pt-4 pb-4 text-white">
        <Container>
          <Row>
            <Col md={4}>
              <h5>Student Tracker</h5>
              <p >
                This web application helps teachers efficiently track student attendance and performance. The system allows teachers to manage their classes, mark attendance, and generate reports based on student performance.
              </p>
            </Col>

            <Col md={4}>
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="/" className="footer-link">Home</a></li>
                <li><a href="/aboutus" className="footer-link" target="_self">About Us</a></li>
              </ul>
            </Col>

            <Col md={4}>
              <h5>Contact Us</h5>
              <p>
                <a href="mailto:support@studenttracker.com" className="footer-link">rahulnikale05@gmail.com <br />   pratikshaabuj1112@gmail.com <br />   pujap2638@gmail.com</a>
              </p>
              <p>Address: Maharashtra, India</p>
              <div className="social-icons mt-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="me-3">
                  <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="me-3">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
              </div>
            </Col>
          </Row>

          <hr className="footer-divider" />
          <p className="text-center mb-0">&copy; {new Date().getFullYear()} Student Tracker. All rights reserved.</p>
        </Container>

        <style>{`
          .footer {
            background-color: #343a40;
          }

          .footer-link {
            color: #adb5bd;
            text-decoration: none;
          }

          .footer-link:hover {
            text-decoration: underline;
            color: #ffffff;
          }

          .footer-divider {
            border-top: 1px solid #555;
            margin: 20px 0;
          }

          .social-icons a {
            color: #adb5bd;
            transition: color 0.3s;
          }

          .social-icons a:hover {
            color: #ffffff;
          }

          .team-member {
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            margin: 10px 0;
            background-color: #f9f9f9;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease-in-out;
          }

          .team-member:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          }

          .social-links a {
            margin: 0 10px;
            color: #007bff;
            text-decoration: none;
          }

          .social-links a:hover {
            text-decoration: underline;
          }

          .project-description {
            font-size: 1.2rem;
            color: #333;
          }

          .contact-info {
            font-size: 1.1rem;
          }
        `}</style>
      </footer>
    </>
  );
};

export default AboutUs;