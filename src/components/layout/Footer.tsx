import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">
              &copy; {currentYear} FingerTrack. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end mt-3 mt-md-0">
            <p className="mb-0 small">
              Employee Attendance and Payslip Management System
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;