import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';
import { 
  Fingerprint, 
  Calendar, 
  CreditCard, 
  BarChart3, 
  Clock,
  LogIn 
} from 'lucide-react';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="fade-in">
      <div className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">Employee Attendance & Payslip Management</h1>
              <p className="lead mb-4">
                A powerful system that streamlines attendance tracking, leave management, 
                and payroll processing with fingerprint integration.
              </p>
              {!user ? (
                <LinkContainer to="/login">
                  <Button variant="light" size="lg" className="px-4 me-2">
                    <LogIn size={18} className="me-2" /> Login
                  </Button>
                </LinkContainer>
              ) : (
                <LinkContainer to="/dashboard">
                  <Button variant="light" size="lg" className="px-4 me-2">
                    <BarChart3 size={18} className="me-2" /> Go to Dashboard
                  </Button>
                </LinkContainer>
              )}
            </Col>
            <Col lg={6} className="text-center">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Employee Management" 
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: '400px' }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <h2 className="text-center mb-5">Key Features</h2>
        <Row className="g-4">
          <Col md={6} lg={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 mx-auto mb-4" style={{ width: 'fit-content' }}>
                  <Fingerprint size={40} className="text-primary" />
                </div>
                <h4>Fingerprint Attendance</h4>
                <p className="text-muted">
                  Secure and accurate attendance tracking using fingerprint biometrics.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="rounded-circle bg-secondary bg-opacity-10 p-3 mx-auto mb-4" style={{ width: 'fit-content' }}>
                  <Calendar size={40} className="text-secondary" />
                </div>
                <h4>Leave Management</h4>
                <p className="text-muted">
                  Streamlined leave requests, approvals, and balance tracking.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="rounded-circle bg-accent bg-opacity-10 p-3 mx-auto mb-4" style={{ width: 'fit-content' }}>
                  <Clock size={40} className="text-accent" style={{ color: 'var(--accent)' }} />
                </div>
                <h4>Overtime Tracking</h4>
                <p className="text-muted">
                  Automatic calculation of extended hours and overtime pay.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 mx-auto mb-4" style={{ width: 'fit-content' }}>
                  <CreditCard size={40} className="text-success" />
                </div>
                <h4>Payslip Generation</h4>
                <p className="text-muted">
                  Automated payslip creation with detailed breakdown of earnings and deductions.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;