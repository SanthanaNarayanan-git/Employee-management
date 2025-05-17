import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Tabs, Tab, Modal } from 'react-bootstrap';
import { format, addDays, addMonths } from 'date-fns';
import { Calendar, PlusCircle, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

const LeavePage: React.FC = () => {
  const [showNewLeaveModal, setShowNewLeaveModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('my-leaves');

  // Simulated leave data
  const leaveData = [
    {
      id: 1,
      type: 'Sick Leave',
      startDate: addDays(new Date(), -15),
      endDate: addDays(new Date(), -13),
      days: 3,
      reason: 'Not feeling well',
      status: 'approved',
      appliedOn: addDays(new Date(), -20)
    },
    {
      id: 2,
      type: 'Casual Leave',
      startDate: addDays(new Date(), 10),
      endDate: addDays(new Date(), 12),
      days: 3,
      reason: 'Family function',
      status: 'pending',
      appliedOn: addDays(new Date(), -2)
    },
    {
      id: 3,
      type: 'Personal Leave',
      startDate: addMonths(new Date(), -1),
      endDate: addMonths(new Date(), -1),
      days: 1,
      reason: 'Personal work',
      status: 'rejected',
      appliedOn: addMonths(new Date(), -1)
    }
  ];

  // For managers/admins, team leave requests
  const teamLeaveRequests = [
    {
      id: 101,
      employee: 'John Doe',
      type: 'Sick Leave',
      startDate: addDays(new Date(), 2),
      endDate: addDays(new Date(), 3),
      days: 2,
      reason: 'Medical appointment',
      status: 'pending',
      appliedOn: addDays(new Date(), -1)
    },
    {
      id: 102,
      employee: 'Jane Smith',
      type: 'Casual Leave',
      startDate: addDays(new Date(), 5),
      endDate: addDays(new Date(), 5),
      days: 1,
      reason: 'Personal matter',
      status: 'pending',
      appliedOn: addDays(new Date(), -2)
    }
  ];

  // Status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge bg="success">Approved</Badge>;
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <Container className="py-4 fade-in">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-0">Leave Management</h1>
        </Col>
        <Col xs="auto">
          <Button 
            variant="primary"
            onClick={() => setShowNewLeaveModal(true)}
          >
            <PlusCircle size={16} className="me-2" />
            Apply for Leave
          </Button>
        </Col>
      </Row>

      <Tabs
        activeKey={selectedTab}
        onSelect={(k) => setSelectedTab(k || 'my-leaves')}
        className="mb-4"
      >
        <Tab eventKey="my-leaves" title="My Leaves">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0">
                <Calendar size={18} className="me-2" />
                Leave History
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Type</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Days</th>
                      <th>Reason</th>
                      <th>Applied On</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveData.map((leave) => (
                      <tr key={leave.id}>
                        <td>{leave.type}</td>
                        <td>{format(leave.startDate, 'dd/MM/yyyy')}</td>
                        <td>{format(leave.endDate, 'dd/MM/yyyy')}</td>
                        <td>{leave.days}</td>
                        <td>{leave.reason}</td>
                        <td>{format(leave.appliedOn, 'dd/MM/yyyy')}</td>
                        <td>{getStatusBadge(leave.status)}</td>
                        <td>
                          {leave.status === 'pending' && (
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                            >
                              Cancel
                            </Button>
                          )}
                          {leave.status !== 'pending' && (
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                            >
                              View
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {leaveData.length === 0 && (
                      <tr>
                        <td colSpan={8} className="text-center py-4">
                          No leave records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>

          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0">Casual Leave</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="mb-0">7 / 10</h3>
                    <Badge bg="success">Available</Badge>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar bg-success" 
                      role="progressbar" 
                      style={{ width: '70%' }}
                      aria-valuenow={7}
                      aria-valuemin={0}
                      aria-valuemax={10}
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <small className="text-muted">0</small>
                    <small className="text-muted">10</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={4}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0">Sick Leave</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="mb-0">5 / 7</h3>
                    <Badge bg="success">Available</Badge>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar bg-warning" 
                      role="progressbar" 
                      style={{ width: '71.4%' }}
                      aria-valuenow={5}
                      aria-valuemin={0}
                      aria-valuemax={7}
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <small className="text-muted">0</small>
                    <small className="text-muted">7</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={4}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0">Personal Leave</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="mb-0">2 / 5</h3>
                    <Badge bg="success">Available</Badge>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar bg-primary" 
                      role="progressbar" 
                      style={{ width: '40%' }}
                      aria-valuenow={2}
                      aria-valuemin={0}
                      aria-valuemax={5}
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <small className="text-muted">0</small>
                    <small className="text-muted">5</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="pending-requests" title="Pending Requests" disabled={!teamLeaveRequests.length}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0">
                <Clock size={18} className="me-2" />
                Team Leave Requests
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Employee</th>
                      <th>Type</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Days</th>
                      <th>Reason</th>
                      <th>Applied On</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamLeaveRequests.map((leave) => (
                      <tr key={leave.id}>
                        <td>{leave.employee}</td>
                        <td>{leave.type}</td>
                        <td>{format(leave.startDate, 'dd/MM/yyyy')}</td>
                        <td>{format(leave.endDate, 'dd/MM/yyyy')}</td>
                        <td>{leave.days}</td>
                        <td>{leave.reason}</td>
                        <td>{format(leave.appliedOn, 'dd/MM/yyyy')}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="success" 
                              size="sm"
                              className="d-flex align-items-center"
                            >
                              <CheckCircle size={14} className="me-1" />
                              Approve
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm"
                              className="d-flex align-items-center"
                            >
                              <XCircle size={14} className="me-1" />
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {teamLeaveRequests.length === 0 && (
                      <tr>
                        <td colSpan={8} className="text-center py-4">
                          No pending leave requests
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="leave-policy" title="Leave Policy">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0">
                <FileText size={18} className="me-2" />
                Company Leave Policy
              </h5>
            </Card.Header>
            <Card.Body>
              <h4>Leave Entitlements</h4>
              <ul>
                <li><strong>Casual Leave:</strong> 10 days per year</li>
                <li><strong>Sick Leave:</strong> 7 days per year</li>
                <li><strong>Personal Leave:</strong> 5 days per year</li>
              </ul>
              
              <h4 className="mt-4">Leave Application Process</h4>
              <ol>
                <li>Employee submits leave request specifying the type, duration, and reason</li>
                <li>Manager reviews and approves/rejects the request</li>
                <li>HR receives notification for payroll processing</li>
                <li>Employee receives notification about the status of their request</li>
              </ol>
              
              <h4 className="mt-4">Leave Cancellation</h4>
              <p>
                Employees can cancel pending leave requests at any time. For approved leaves, 
                cancellation must be done at least 24 hours in advance.
              </p>
              
              <h4 className="mt-4">Leave Carry Forward</h4>
              <p>
                Up to 5 days of unused casual leave can be carried forward to the next year. 
                Sick and personal leaves cannot be carried forward.
              </p>
              
              <h4 className="mt-4">Public Holidays</h4>
              <p>
                Public holidays falling within a leave period are not counted as leave days.
              </p>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* New Leave Application Modal */}
      <Modal
        show={showNewLeaveModal}
        onHide={() => setShowNewLeaveModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Apply for Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Leave Type</Form.Label>
              <Form.Select required>
                <option value="">Select Leave Type</option>
                <option value="casual">Casual Leave (7 days available)</option>
                <option value="sick">Sick Leave (5 days available)</option>
                <option value="personal">Personal Leave (2 days available)</option>
              </Form.Select>
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>From Date</Form.Label>
                  <Form.Control type="date" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>To Date</Form.Label>
                  <Form.Control type="date" required />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Number of Days</Form.Label>
              <Form.Control type="number" min="0.5" step="0.5" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reason for Leave</Form.Label>
              <Form.Control as="textarea" rows={3} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewLeaveModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowNewLeaveModal(false)}>
            Submit Application
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LeavePage;