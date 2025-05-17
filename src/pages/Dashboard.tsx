import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Clock, 
  Calendar, 
  CreditCard, 
  Users, 
  CheckCircle2,
  XCircle,
  ClockIcon,
  FileBarChart
} from 'lucide-react';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendance, setAttendance] = useState<{ status: 'checked-in' | 'checked-out' | null, time: Date | null }>({
    status: null,
    time: null
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Simulated data
  const attendanceStats = {
    present: 22,
    absent: 1,
    late: 3,
    onLeave: 2
  };

  const leaveBalance = {
    casual: 7,
    sick: 5,
    personal: 2,
    total: 14
  };

  const pendingTasks = [
    { id: 1, title: 'Complete Project Documentation', dueDate: '2024-09-15' },
    { id: 2, title: 'Team Meeting Preparation', dueDate: '2024-09-10' },
    { id: 3, title: 'Client Presentation', dueDate: '2024-09-20' }
  ];

  const handleAttendance = () => {
    if (attendance.status === null || attendance.status === 'checked-out') {
      setAttendance({ status: 'checked-in', time: new Date() });
    } else {
      setAttendance({ status: 'checked-out', time: new Date() });
    }
  };

  return (
    <Container className="py-4 fade-in">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-0">Welcome, {user?.name}</h1>
          <p className="text-muted">{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Dashboard</p>
        </Col>
        <Col xs="auto" className="text-end">
          <p className="mb-0 fw-bold">{format(currentTime, 'EEEE, MMMM d, yyyy')}</p>
          <p className="text-muted mb-0">{format(currentTime, 'hh:mm:ss a')}</p>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                <Clock size={24} className="text-primary" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Today's Status</h6>
                <h4 className="mb-0">
                  {attendance.status === 'checked-in' ? 'Checked In' : 
                   attendance.status === 'checked-out' ? 'Checked Out' : 'Not Checked In'}
                </h4>
                {attendance.time && (
                  <small className="text-muted">
                    at {format(attendance.time, 'hh:mm a')}
                  </small>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-secondary bg-opacity-10 p-3 me-3">
                <Calendar size={24} className="text-secondary" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Leave Balance</h6>
                <h4 className="mb-0">{leaveBalance.total} days</h4>
                <small className="text-muted">Available to use</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-accent bg-opacity-10 p-3 me-3">
                <CreditCard size={24} className="text-accent" style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <h6 className="text-muted mb-1">Next Payslip</h6>
                <h4 className="mb-0">September 30</h4>
                <small className="text-muted">28 days remaining</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {user?.role === 'admin' || user?.role === 'manager' ? (
          <Col md={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                  <Users size={24} className="text-success" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Team Attendance</h6>
                  <h4 className="mb-0">{Math.round((attendanceStats.present / (attendanceStats.present + attendanceStats.absent + attendanceStats.late + attendanceStats.onLeave)) * 100)}%</h4>
                  <small className="text-muted">Present today</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          <Col md={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                  <FileBarChart size={24} className="text-success" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">This Month</h6>
                  <h4 className="mb-0">22 days</h4>
                  <small className="text-muted">Worked so far</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0">Mark Attendance</h5>
            </Card.Header>
            <Card.Body className="p-4 text-center">
              <div className="mb-4">
                <h4 className="mb-3">
                  {attendance.status === null && 'Ready to start your day?'}
                  {attendance.status === 'checked-in' && 'Have a great day at work!'}
                  {attendance.status === 'checked-out' && 'See you tomorrow!'}
                </h4>
                <p className="text-muted">
                  {attendance.status === null && 'Click the button below to check in'}
                  {attendance.status === 'checked-in' && 'Click the button below when you\'re done for the day'}
                  {attendance.status === 'checked-out' && 'Your work day is complete'}
                </p>
              </div>
              
              <Button 
                variant={attendance.status === 'checked-in' ? 'danger' : 'primary'} 
                size="lg"
                onClick={handleAttendance}
                className="px-4"
              >
                {attendance.status === null && 'Check In'}
                {attendance.status === 'checked-in' && 'Check Out'}
                {attendance.status === 'checked-out' && 'Check In Again'}
              </Button>
            </Card.Body>
          </Card>

          {(user?.role === 'admin' || user?.role === 'manager') && (
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Team Status</h5>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => navigate('/reports')}
                >
                  View All
                </Button>
              </Card.Header>
              <Card.Body>
                <Row className="text-center g-3">
                  <Col xs={6} md={3}>
                    <div className="border rounded p-3">
                      <div className="rounded-circle bg-success bg-opacity-10 p-2 mx-auto mb-2" style={{ width: 'fit-content' }}>
                        <CheckCircle2 size={24} className="text-success" />
                      </div>
                      <h3 className="mb-0">{attendanceStats.present}</h3>
                      <p className="text-muted mb-0">Present</p>
                    </div>
                  </Col>
                  <Col xs={6} md={3}>
                    <div className="border rounded p-3">
                      <div className="rounded-circle bg-danger bg-opacity-10 p-2 mx-auto mb-2" style={{ width: 'fit-content' }}>
                        <XCircle size={24} className="text-danger" />
                      </div>
                      <h3 className="mb-0">{attendanceStats.absent}</h3>
                      <p className="text-muted mb-0">Absent</p>
                    </div>
                  </Col>
                  <Col xs={6} md={3}>
                    <div className="border rounded p-3">
                      <div className="rounded-circle bg-warning bg-opacity-10 p-2 mx-auto mb-2" style={{ width: 'fit-content' }}>
                        <ClockIcon size={24} className="text-warning" />
                      </div>
                      <h3 className="mb-0">{attendanceStats.late}</h3>
                      <p className="text-muted mb-0">Late</p>
                    </div>
                  </Col>
                  <Col xs={6} md={3}>
                    <div className="border rounded p-3">
                      <div className="rounded-circle bg-info bg-opacity-10 p-2 mx-auto mb-2" style={{ width: 'fit-content' }}>
                        <Calendar size={24} className="text-info" />
                      </div>
                      <h3 className="mb-0">{attendanceStats.onLeave}</h3>
                      <p className="text-muted mb-0">On Leave</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>
        
        <Col md={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Leave Balance</h5>
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => navigate('/leaves')}
              >
                Apply
              </Button>
            </Card.Header>
            <Card.Body>
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex justify-content-between">
                  <p className="mb-0">Casual Leave</p>
                  <p className="mb-0 fw-bold">{leaveBalance.casual} days</p>
                </div>
                <div className="progress mt-2" style={{ height: '6px' }}>
                  <div 
                    className="progress-bar bg-primary" 
                    role="progressbar" 
                    style={{ width: `${(leaveBalance.casual / 10) * 100}%` }}
                    aria-valuenow={leaveBalance.casual}
                    aria-valuemin={0}
                    aria-valuemax={10}
                  ></div>
                </div>
              </div>
              
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex justify-content-between">
                  <p className="mb-0">Sick Leave</p>
                  <p className="mb-0 fw-bold">{leaveBalance.sick} days</p>
                </div>
                <div className="progress mt-2" style={{ height: '6px' }}>
                  <div 
                    className="progress-bar bg-danger" 
                    role="progressbar" 
                    style={{ width: `${(leaveBalance.sick / 7) * 100}%` }}
                    aria-valuenow={leaveBalance.sick}
                    aria-valuemin={0}
                    aria-valuemax={7}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="d-flex justify-content-between">
                  <p className="mb-0">Personal Leave</p>
                  <p className="mb-0 fw-bold">{leaveBalance.personal} days</p>
                </div>
                <div className="progress mt-2" style={{ height: '6px' }}>
                  <div 
                    className="progress-bar bg-warning" 
                    role="progressbar" 
                    style={{ width: `${(leaveBalance.personal / 5) * 100}%` }}
                    aria-valuenow={leaveBalance.personal}
                    aria-valuemin={0}
                    aria-valuemax={5}
                  ></div>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0">Pending Tasks</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <ul className="list-group list-group-flush">
                {pendingTasks.map(task => (
                  <li key={task.id} className="list-group-item py-3 px-4">
                    <p className="mb-1 fw-medium">{task.title}</p>
                    <small className="text-muted">Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}</small>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;