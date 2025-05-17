import React, { useState } from 'react';
import { Container, Card, Table, Form, Row, Col, Button, Badge, Tabs, Tab } from 'react-bootstrap';
import { format, subDays, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isWeekend } from 'date-fns';
import { Calendar, Search, Clock, Download } from 'lucide-react';

const AttendancePage: React.FC = () => {
  const [month, setMonth] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState('history');

  // Generate some sample attendance data
  const generateAttendanceData = () => {
    const today = new Date();
    const startDate = subDays(today, 30);
    
    const data = [];
    let currentDate = startDate;
    
    while (currentDate <= today) {
      if (!isWeekend(currentDate)) {
        const checkInTime = new Date(currentDate);
        checkInTime.setHours(8 + Math.floor(Math.random() * 2));
        checkInTime.setMinutes(Math.floor(Math.random() * 30));
        
        const checkOutTime = new Date(currentDate);
        checkOutTime.setHours(17 + Math.floor(Math.random() * 2));
        checkOutTime.setMinutes(Math.floor(Math.random() * 45));
        
        const isLate = checkInTime.getHours() > 9 || (checkInTime.getHours() === 9 && checkInTime.getMinutes() > 0);
        
        // Calculate working hours
        const workingHours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
        const hasOvertime = workingHours > 8;
        
        data.push({
          date: new Date(currentDate),
          checkIn: checkInTime,
          checkOut: checkOutTime,
          status: isLate ? 'late' : 'present',
          workingHours: workingHours.toFixed(2),
          overtime: hasOvertime ? (workingHours - 8).toFixed(2) : '0.00'
        });
      }
      
      currentDate = addDays(currentDate, 1);
    }
    
    return data;
  };

  const attendanceData = generateAttendanceData();

  // Generate calendar view data
  const getCalendarDays = () => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    
    return eachDayOfInterval({ start, end });
  };

  const calendarDays = getCalendarDays();

  // Get status for a specific date
  const getDateStatus = (date: Date) => {
    const record = attendanceData.find(
      record => format(record.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    
    if (!record) {
      return isWeekend(date) ? 'weekend' : 'absent';
    }
    
    return record.status;
  };

  // Get badge variant based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'present':
        return 'success';
      case 'late':
        return 'warning';
      case 'absent':
        return 'danger';
      case 'weekend':
        return 'secondary';
      default:
        return 'light';
    }
  };

  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present':
        return 'Present';
      case 'late':
        return 'Late';
      case 'absent':
        return 'Absent';
      case 'weekend':
        return 'Weekend';
      default:
        return '';
    }
  };

  return (
    <Container className="py-4 fade-in">
      <h1 className="mb-4">Attendance Management</h1>

      <Tabs
        activeKey={selectedTab}
        onSelect={(k) => setSelectedTab(k || 'history')}
        className="mb-4"
      >
        <Tab eventKey="history" title="Attendance History">
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white py-3">
              <Row className="align-items-center">
                <Col>
                  <h5 className="mb-0">Attendance History</h5>
                </Col>
                <Col xs="auto">
                  <div className="d-flex gap-2">
                    <Button variant="outline-secondary" size="sm">
                      <Download size={16} className="me-1" /> Export
                    </Button>
                    <Form.Control
                      type="month"
                      value={format(month, 'yyyy-MM')}
                      onChange={(e) => {
                        if (e.target.value) {
                          setMonth(new Date(e.target.value));
                        }
                      }}
                      style={{ width: '180px' }}
                    />
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Date</th>
                      <th>Day</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Status</th>
                      <th>Working Hours</th>
                      <th>Overtime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((record, index) => (
                      <tr key={index}>
                        <td>{format(record.date, 'dd/MM/yyyy')}</td>
                        <td>{format(record.date, 'EEEE')}</td>
                        <td>{format(record.checkIn, 'hh:mm a')}</td>
                        <td>{format(record.checkOut, 'hh:mm a')}</td>
                        <td>
                          <Badge bg={getBadgeVariant(record.status)}>
                            {getStatusLabel(record.status)}
                          </Badge>
                        </td>
                        <td>{record.workingHours} hrs</td>
                        <td>
                          {parseFloat(record.overtime) > 0 && (
                            <Badge bg="info">{record.overtime} hrs</Badge>
                          )}
                          {parseFloat(record.overtime) === 0 && '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="calendar" title="Calendar View">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <Row className="align-items-center">
                <Col>
                  <h5 className="mb-0">
                    <Calendar size={18} className="me-2" />
                    Attendance Calendar - {format(month, 'MMMM yyyy')}
                  </h5>
                </Col>
                <Col xs="auto">
                  <Form.Control
                    type="month"
                    value={format(month, 'yyyy-MM')}
                    onChange={(e) => {
                      if (e.target.value) {
                        setMonth(new Date(e.target.value));
                      }
                    }}
                    style={{ width: '180px' }}
                  />
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                {calendarDays.map((day, index) => {
                  const status = getDateStatus(day);
                  return (
                    <Col key={index} xs={4} sm={3} md={2} lg={1}>
                      <div 
                        className={`border rounded p-2 text-center ${status === 'weekend' ? 'bg-light' : ''}`}
                        style={{ 
                          cursor: 'pointer',
                          borderColor: status !== 'weekend' ? `var(--${getBadgeVariant(status)})` : '',
                          borderWidth: status !== 'weekend' ? '2px' : '1px'
                        }}
                      >
                        <small className="d-block">{format(day, 'EEE')}</small>
                        <h5 className="mb-0 mt-1">{format(day, 'd')}</h5>
                        {status !== 'weekend' && (
                          <Badge 
                            bg={getBadgeVariant(status)}
                            className="mt-1 w-100"
                          >
                            {getStatusLabel(status)}
                          </Badge>
                        )}
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="regularize" title="Regularize Attendance">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0">
                <Clock size={18} className="me-2" />
                Request Attendance Regularization
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control type="date" required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Type</Form.Label>
                      <Form.Select required>
                        <option value="">Select Type</option>
                        <option value="missed_check_in">Missed Check In</option>
                        <option value="missed_check_out">Missed Check Out</option>
                        <option value="wrong_time">Wrong Time Recording</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Actual Check In Time</Form.Label>
                      <Form.Control type="time" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Actual Check Out Time</Form.Label>
                      <Form.Control type="time" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control as="textarea" rows={3} required />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit">
                    Submit Request
                  </Button>
                  <Button variant="outline-secondary" type="reset">
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AttendancePage;