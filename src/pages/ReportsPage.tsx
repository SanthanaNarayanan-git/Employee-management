import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Form, Button, Tabs, Tab } from 'react-bootstrap';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { FileBarChart, Download, Calendar, Clock, Users, CreditCard } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState('attendance');
  const [dateRange, setDateRange] = useState('month');

  // Attendance data for the chart
  const attendanceData = [
    { name: 'Week 1', present: 22, absent: 2, late: 4 },
    { name: 'Week 2', present: 24, absent: 1, late: 3 },
    { name: 'Week 3', present: 20, absent: 3, late: 5 },
    { name: 'Week 4', present: 23, absent: 2, late: 3 }
  ];

  // Leave data
  const leaveData = [
    { name: 'Casual', value: 35 },
    { name: 'Sick', value: 20 },
    { name: 'Personal', value: 15 },
    { name: 'Vacation', value: 25 },
    { name: 'Other', value: 5 }
  ];

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Container className="py-4 fade-in">
      <h1 className="mb-4">Reports & Analytics</h1>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white py-3">
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0">
                <FileBarChart size={18} className="me-2" />
                Generate Reports
              </h5>
            </Col>
            <Col xs="auto">
              <div className="d-flex gap-2">
                <Form.Select 
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  style={{ width: '180px' }}
                >
                  <option value="attendance">Attendance Report</option>
                  <option value="leave">Leave Report</option>
                  <option value="overtime">Overtime Report</option>
                  <option value="payroll">Payroll Report</option>
                </Form.Select>
                
                <Form.Select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  style={{ width: '150px' }}
                >
                  <option value="week">Weekly</option>
                  <option value="month">Monthly</option>
                  <option value="quarter">Quarterly</option>
                  <option value="year">Yearly</option>
                </Form.Select>
                
                <Button variant="outline-secondary">
                  <Download size={16} className="me-1" /> Export
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Tabs
            activeKey={reportType}
            onSelect={(k) => setReportType(k || 'attendance')}
            className="mb-4"
          >
            <Tab eventKey="attendance" title="Attendance">
              <h5 className="mb-4">Attendance Overview - September 2024</h5>
              
              <Row className="g-4 mb-4">
                <Col md={6} lg={3}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="d-flex align-items-center">
                      <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                        <Users size={24} className="text-success" />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1">Present Rate</h6>
                        <h4 className="mb-0">92%</h4>
                        <small className="text-success">
                          ↑ 3% from last month
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6} lg={3}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="d-flex align-items-center">
                      <div className="rounded-circle bg-danger bg-opacity-10 p-3 me-3">
                        <Users size={24} className="text-danger" />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1">Absence Rate</h6>
                        <h4 className="mb-0">3%</h4>
                        <small className="text-success">
                          ↓ 1% from last month
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6} lg={3}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="d-flex align-items-center">
                      <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                        <Clock size={24} className="text-warning" />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1">Late Arrivals</h6>
                        <h4 className="mb-0">5%</h4>
                        <small className="text-danger">
                          ↑ 1% from last month
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6} lg={3}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="d-flex align-items-center">
                      <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                        <Clock size={24} className="text-primary" />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1">Avg. Work Hours</h6>
                        <h4 className="mb-0">8.5h</h4>
                        <small className="text-success">
                          ↑ 0.2h from last month
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              
              <div className="mb-4" style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="present" fill="#28a745" name="Present" />
                    <Bar dataKey="absent" fill="#dc3545" name="Absent" />
                    <Bar dataKey="late" fill="#ffc107" name="Late" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <h5 className="mb-3">Top 5 Employees by Attendance</h5>
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>#</th>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Present Days</th>
                    <th>Absent Days</th>
                    <th>Late Days</th>
                    <th>On-Time %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>Engineering</td>
                    <td>22</td>
                    <td>0</td>
                    <td>0</td>
                    <td>100%</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jane Smith</td>
                    <td>Engineering</td>
                    <td>21</td>
                    <td>1</td>
                    <td>0</td>
                    <td>95.5%</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Robert Johnson</td>
                    <td>Marketing</td>
                    <td>20</td>
                    <td>0</td>
                    <td>2</td>
                    <td>90.9%</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Emily Williams</td>
                    <td>Human Resources</td>
                    <td>22</td>
                    <td>0</td>
                    <td>0</td>
                    <td>100%</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Michael Brown</td>
                    <td>Finance</td>
                    <td>20</td>
                    <td>1</td>
                    <td>1</td>
                    <td>90.9%</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            
            <Tab eventKey="leave" title="Leave">
              <h5 className="mb-4">Leave Analysis - September 2024</h5>
              
              <Row className="mb-4">
                <Col lg={6}>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={leaveData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {leaveData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Col>
                
                <Col lg={6}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body>
                      <h5 className="mb-3">Leave Summary</h5>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="d-flex justify-content-between mb-1">
                          <p className="mb-0">Total Leave Requests</p>
                          <p className="mb-0 fw-bold">48</p>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                          <p className="mb-0">Approved Requests</p>
                          <p className="mb-0 fw-bold">42</p>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                          <p className="mb-0">Rejected Requests</p>
                          <p className="mb-0 fw-bold">3</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="mb-0">Pending Requests</p>
                          <p className="mb-0 fw-bold">3</p>
                        </div>
                      </div>
                      
                      <h6 className="mb-2">Department-wise Leave Count</h6>
                      <div className="mb-3 pb-2 border-bottom">
                        <div className="d-flex justify-content-between mb-1">
                          <p className="mb-0">Engineering</p>
                          <p className="mb-0 fw-bold">20</p>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                          <p className="mb-0">Marketing</p>
                          <p className="mb-0 fw-bold">12</p>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                          <p className="mb-0">Finance</p>
                          <p className="mb-0 fw-bold">8</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="mb-0">Human Resources</p>
                          <p className="mb-0 fw-bold">8</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              
              <h5 className="mb-3">Employees with Most Leave Days</h5>
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>#</th>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Casual Leave</th>
                    <th>Sick Leave</th>
                    <th>Personal Leave</th>
                    <th>Total Days</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Sarah Connor</td>
                    <td>Engineering</td>
                    <td>5</td>
                    <td>3</td>
                    <td>1</td>
                    <td>9</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Michael Brown</td>
                    <td>Finance</td>
                    <td>4</td>
                    <td>3</td>
                    <td>0</td>
                    <td>7</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Robert Johnson</td>
                    <td>Marketing</td>
                    <td>3</td>
                    <td>2</td>
                    <td>1</td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Jane Smith</td>
                    <td>Engineering</td>
                    <td>3</td>
                    <td>2</td>
                    <td>0</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Emily Williams</td>
                    <td>Human Resources</td>
                    <td>2</td>
                    <td>2</td>
                    <td>0</td>
                    <td>4</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            
            <Tab eventKey="overtime" title="Overtime">
              <h5 className="mb-4">Overtime Analysis - September 2024</h5>
              
              <Row className="g-4 mb-4">
                <Col md={6} lg={3}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="d-flex align-items-center">
                      <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                        <Clock size={24} className="text-primary" />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1">Total Overtime</h6>
                        <h4 className="mb-0">142h</h4>
                        <small className="text-muted">
                          This month
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6} lg={3}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="d-flex align-items-center">
                      <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                        <CreditCard size={24} className="text-success" />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1">Overtime Cost</h6>
                        <h4 className="mb-0">$2,840</h4>
                        <small className="text-danger">
                          ↑ $320 from last month
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6} lg={3}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="d-flex align-items-center">
                      <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                        <Users size={24} className="text-info" />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1">Employees</h6>
                        <h4 className="mb-0">15</h4>
                        <small className="text-muted">
                          With overtime
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6} lg={3}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="d-flex align-items-center">
                      <div className="rounded-circle bg-secondary bg-opacity-10 p-3 me-3">
                        <Clock size={24} className="text-secondary" />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1">Avg. Per Employee</h6>
                        <h4 className="mb-0">9.5h</h4>
                        <small className="text-success">
                          ↓ 1.2h from last month
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              
              <h5 className="mb-3">Top Overtime by Department</h5>
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>#</th>
                    <th>Department</th>
                    <th>Total Hours</th>
                    <th>Employees</th>
                    <th>Avg Hours/Employee</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Engineering</td>
                    <td>78h</td>
                    <td>8</td>
                    <td>9.8h</td>
                    <td>$1,560</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Marketing</td>
                    <td>32h</td>
                    <td>3</td>
                    <td>10.7h</td>
                    <td>$640</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Finance</td>
                    <td>18h</td>
                    <td>2</td>
                    <td>9.0h</td>
                    <td>$360</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Operations</td>
                    <td>14h</td>
                    <td>2</td>
                    <td>7.0h</td>
                    <td>$280</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            
            <Tab eventKey="payroll" title="Payroll">
              <h5 className="mb-4">Payroll Analysis - September 2024</h5>
              
              <Row className="g-4 mb-4">
                <Col md={6} lg={3}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="d-flex align-items-center">
                      <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                        <CreditCard size={24} className="text-primary" />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1">Total Salary</h6>
                        <h4 className="mb-0">$148,500</h4>
                        <small className="text-muted">
                          This month
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6} lg={3}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="d-flex align-items-center">
                      <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                        <CreditCard size={24} className="text-success" />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1">Bonuses</h6>
                        <h4 className="mb-0">$12,000</h4>
                        <small className="text-success">
                          ↑ $2,000 from last month
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6} lg={3}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="d-flex align-items-center">
                      <div className="rounded-circle bg-danger bg-opacity-10 p-3 me-3">
                        <CreditCard size={24} className="text-danger" />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1">Deductions</h6>
                        <h4 className="mb-0">$32,100</h4>
                        <small className="text-muted">
                          Tax & benefits
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6} lg={3}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="d-flex align-items-center">
                      <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                        <CreditCard size={24} className="text-warning" />
                      </div>
                      <div>
                        <h6 className="text-muted mb-1">Net Salary</h6>
                        <h4 className="mb-0">$128,400</h4>
                        <small className="text-success">
                          ↑ $3,200 from last month
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              
              <h5 className="mb-3">Payroll by Department</h5>
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>#</th>
                    <th>Department</th>
                    <th>Employees</th>
                    <th>Gross Salary</th>
                    <th>Overtime</th>
                    <th>Deductions</th>
                    <th>Net Salary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Engineering</td>
                    <td>15</td>
                    <td>$78,000</td>
                    <td>$1,560</td>
                    <td>$15,900</td>
                    <td>$63,660</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Marketing</td>
                    <td>8</td>
                    <td>$32,000</td>
                    <td>$640</td>
                    <td>$6,500</td>
                    <td>$26,140</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Finance</td>
                    <td>6</td>
                    <td>$24,000</td>
                    <td>$360</td>
                    <td>$4,900</td>
                    <td>$19,460</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Human Resources</td>
                    <td>4</td>
                    <td>$16,000</td>
                    <td>$0</td>
                    <td>$3,200</td>
                    <td>$12,800</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Operations</td>
                    <td>10</td>
                    <td>$35,000</td>
                    <td>$280</td>
                    <td>$7,100</td>
                    <td>$28,180</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReportsPage;