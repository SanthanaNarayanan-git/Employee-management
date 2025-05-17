import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, Tabs, Tab } from 'react-bootstrap';
import { PlusCircle, Search, Edit, Trash2, UserPlus, Eye, Upload, CheckCircle, XCircle } from 'lucide-react';

const EmployeeManagementPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('employees');
  const [searchTerm, setSearchTerm] = useState('');

  // Simulated employee data
  const employees = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@example.com', 
      department: 'Engineering', 
      position: 'Senior Developer', 
      joinDate: '01/01/2020',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane.smith@example.com', 
      department: 'Engineering', 
      position: 'Frontend Developer', 
      joinDate: '03/15/2021',
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Robert Johnson', 
      email: 'robert.johnson@example.com', 
      department: 'Marketing', 
      position: 'Marketing Manager', 
      joinDate: '06/10/2019',
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Emily Williams', 
      email: 'emily.williams@example.com', 
      department: 'Human Resources', 
      position: 'HR Specialist', 
      joinDate: '09/22/2020',
      status: 'active'
    },
    { 
      id: 5, 
      name: 'Michael Brown', 
      email: 'michael.brown@example.com', 
      department: 'Finance', 
      position: 'Financial Analyst', 
      joinDate: '02/28/2022',
      status: 'inactive'
    }
  ];

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Department data
  const departments = [
    { id: 1, name: 'Engineering', employees: 15, manager: 'David Chen' },
    { id: 2, name: 'Marketing', employees: 8, manager: 'Sarah Johnson' },
    { id: 3, name: 'Finance', employees: 6, manager: 'Robert Smith' },
    { id: 4, name: 'Human Resources', employees: 4, manager: 'Emily Williams' },
    { id: 5, name: 'Operations', employees: 10, manager: 'James Wilson' }
  ];

  // Fingerprint registration requests
  const fingerprintRequests = [
    { id: 1, employee: 'Alex Turner', department: 'Sales', status: 'pending', requestDate: '09/01/2024' },
    { id: 2, employee: 'Sarah Connor', department: 'Engineering', status: 'pending', requestDate: '09/02/2024' }
  ];

  return (
    <Container className="py-4 fade-in">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-0">Employee Management</h1>
        </Col>
        <Col xs="auto">
          <Button 
            variant="primary"
            onClick={() => setShowAddModal(true)}
          >
            <UserPlus size={16} className="me-2" />
            Add Employee
          </Button>
        </Col>
      </Row>

      <Tabs
        activeKey={selectedTab}
        onSelect={(k) => setSelectedTab(k || 'employees')}
        className="mb-4"
      >
        <Tab eventKey="employees" title="Employees">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white py-3">
              <Row className="align-items-center">
                <Col>
                  <h5 className="mb-0">Employees</h5>
                </Col>
                <Col xs={12} md={4}>
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pe-5"
                    />
                    <div 
                      className="position-absolute"
                      style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}
                    >
                      <Search size={18} className="text-muted" />
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Position</th>
                      <th>Join Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.department}</td>
                        <td>{employee.position}</td>
                        <td>{employee.joinDate}</td>
                        <td>
                          <Badge 
                            bg={employee.status === 'active' ? 'success' : 'secondary'}
                          >
                            {employee.status === 'active' ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              className="d-flex align-items-center p-1"
                            >
                              <Eye size={16} />
                            </Button>
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              className="d-flex align-items-center p-1"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              className="d-flex align-items-center p-1"
                              onClick={() => setShowDeleteModal(true)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredEmployees.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-4">
                          No employees found matching your search criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="departments" title="Departments">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <Row className="align-items-center">
                <Col>
                  <h5 className="mb-0">Departments</h5>
                </Col>
                <Col xs="auto">
                  <Button 
                    variant="primary" 
                    size="sm"
                  >
                    <PlusCircle size={16} className="me-1" />
                    Add Department
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Department</th>
                      <th>Employees</th>
                      <th>Manager</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((department) => (
                      <tr key={department.id}>
                        <td>{department.name}</td>
                        <td>{department.employees}</td>
                        <td>{department.manager}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              className="d-flex align-items-center p-1"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              className="d-flex align-items-center p-1"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="fingerprint" title="Fingerprint Requests">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <Row className="align-items-center">
                <Col>
                  <h5 className="mb-0">Fingerprint Registration Requests</h5>
                </Col>
                <Col xs="auto">
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                  >
                    <Upload size={16} className="me-1" />
                    Import Fingerprint Data
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Employee</th>
                      <th>Department</th>
                      <th>Request Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fingerprintRequests.map((request) => (
                      <tr key={request.id}>
                        <td>{request.employee}</td>
                        <td>{request.department}</td>
                        <td>{request.requestDate}</td>
                        <td>
                          <Badge bg="warning">Pending</Badge>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="outline-success" 
                              size="sm"
                              className="d-flex align-items-center p-1"
                            >
                              <CheckCircle size={16} />
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              className="d-flex align-items-center p-1"
                            >
                              <XCircle size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {fingerprintRequests.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          No pending fingerprint registration requests
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Add Employee Modal */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Select required>
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Position</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Join Date</Form.Label>
                  <Form.Control type="date" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select required>
                    <option value="">Select Role</option>
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>

            <hr className="my-4" />

            <h5 className="mb-3">Account Setup</h5>

            <Form.Group className="mb-3">
              <Form.Check 
                type="checkbox"
                id="send-invitation"
                label="Send email invitation to set up account"
                defaultChecked
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check 
                type="checkbox"
                id="fingerprint-setup"
                label="Schedule fingerprint registration"
                defaultChecked
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowAddModal(false)}>
            Add Employee
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this employee? This action cannot be undone.</p>
          <p className="text-danger mb-0">This will remove all attendance records, leave history, and payroll data associated with this employee.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => setShowDeleteModal(false)}>
            Delete Employee
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployeeManagementPage;