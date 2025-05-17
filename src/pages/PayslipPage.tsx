import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Dropdown } from 'react-bootstrap';
import { format, subMonths } from 'date-fns';
import { Download, Printer, Mail, Eye, FileText } from 'lucide-react';

const PayslipPage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(subMonths(new Date(), 1));
  const [showPayslipDetails, setShowPayslipDetails] = useState(false);

  // Generate payslip history
  const generatePayslips = () => {
    const payslips = [];
    const today = new Date();
    
    for (let i = 1; i <= 6; i++) {
      const payslipDate = subMonths(today, i);
      const grossSalary = 5000 + Math.random() * 500;
      const deductions = grossSalary * 0.2;
      const netSalary = grossSalary - deductions;
      
      payslips.push({
        id: i,
        month: payslipDate,
        grossSalary,
        deductions,
        netSalary,
        status: i <= 3 ? 'paid' : 'processing'
      });
    }
    
    return payslips;
  };

  const payslips = generatePayslips();

  // Current displayed payslip (demo)
  const currentPayslip = {
    employeeName: 'John Doe',
    employeeId: 'EMP001',
    department: 'Engineering',
    position: 'Senior Developer',
    month: format(selectedMonth, 'MMMM yyyy'),
    payPeriod: `01/${format(selectedMonth, 'MM/yyyy')} - 30/${format(selectedMonth, 'MM/yyyy')}`,
    payDate: format(subMonths(new Date(), 1), 'dd/MM/yyyy'),
    earnings: [
      { description: 'Basic Salary', amount: 4000 },
      { description: 'House Rent Allowance', amount: 800 },
      { description: 'Transport Allowance', amount: 200 },
      { description: 'Performance Bonus', amount: 500 },
      { description: 'Overtime (12 hrs)', amount: 360 }
    ],
    deductions: [
      { description: 'Income Tax', amount: 650 },
      { description: 'Professional Tax', amount: 200 },
      { description: 'Provident Fund', amount: 480 },
      { description: 'Health Insurance', amount: 150 }
    ]
  };

  // Calculate totals
  const totalEarnings = currentPayslip.earnings.reduce((acc, curr) => acc + curr.amount, 0);
  const totalDeductions = currentPayslip.deductions.reduce((acc, curr) => acc + curr.amount, 0);
  const netPay = totalEarnings - totalDeductions;

  return (
    <Container className="py-4 fade-in">
      <h1 className="mb-4">Payslip Management</h1>
      
      {!showPayslipDetails ? (
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white py-3">
            <Row className="align-items-center">
              <Col>
                <h5 className="mb-0">
                  <FileText size={18} className="me-2" />
                  Payslip History
                </h5>
              </Col>
              <Col xs="auto">
                <Form.Control
                  type="month"
                  value={format(selectedMonth, 'yyyy-MM')}
                  onChange={(e) => {
                    if (e.target.value) {
                      setSelectedMonth(new Date(e.target.value));
                    }
                  }}
                  style={{ width: '180px' }}
                />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Month</th>
                    <th>Gross Salary</th>
                    <th>Deductions</th>
                    <th>Net Salary</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payslips.map((payslip) => (
                    <tr key={payslip.id}>
                      <td>{format(payslip.month, 'MMMM yyyy')}</td>
                      <td>${payslip.grossSalary.toFixed(2)}</td>
                      <td>${payslip.deductions.toFixed(2)}</td>
                      <td>${payslip.netSalary.toFixed(2)}</td>
                      <td>
                        <span className={`badge bg-${payslip.status === 'paid' ? 'success' : 'warning'}`}>
                          {payslip.status === 'paid' ? 'Paid' : 'Processing'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => setShowPayslipDetails(true)}
                          >
                            <Eye size={14} />
                          </Button>
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            disabled={payslip.status !== 'paid'}
                          >
                            <Download size={14} />
                          </Button>
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            disabled={payslip.status !== 'paid'}
                          >
                            <Mail size={14} />
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
      ) : (
        <>
          <Row className="mb-4">
            <Col>
              <Button 
                variant="outline-secondary" 
                onClick={() => setShowPayslipDetails(false)}
              >
                Back to List
              </Button>
            </Col>
            <Col xs="auto">
              <Dropdown className="d-inline-block me-2">
                <Dropdown.Toggle variant="outline-primary" id="download-dropdown">
                  <Download size={16} className="me-1" /> Download
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">PDF</Dropdown.Item>
                  <Dropdown.Item href="#">Excel</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant="outline-secondary">
                <Printer size={16} className="me-1" /> Print
              </Button>
            </Col>
          </Row>

          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="text-center mb-4">
                <h3 className="mb-1">FingerTrack Inc.</h3>
                <p className="mb-1">123 Business Avenue, Tech Park</p>
                <p className="mb-0">Phone: (123) 456-7890 | Email: payroll@fingertrack.com</p>
              </div>
              
              <div className="text-center mb-4">
                <h4 className="border-bottom border-2 pb-2 d-inline-block px-3">Payslip for {currentPayslip.month}</h4>
              </div>
              
              <Row className="mb-4">
                <Col md={6}>
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td className="fw-bold">Employee Name:</td>
                        <td>{currentPayslip.employeeName}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Employee ID:</td>
                        <td>{currentPayslip.employeeId}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Department:</td>
                        <td>{currentPayslip.department}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Position:</td>
                        <td>{currentPayslip.position}</td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                <Col md={6}>
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td className="fw-bold">Pay Period:</td>
                        <td>{currentPayslip.payPeriod}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Pay Date:</td>
                        <td>{currentPayslip.payDate}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Payment Method:</td>
                        <td>Bank Transfer</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Bank Account:</td>
                        <td>XXXX-XXXX-XXXX-1234</td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <h5 className="mb-3">Earnings</h5>
                  <Table bordered>
                    <thead className="bg-light">
                      <tr>
                        <th>Description</th>
                        <th className="text-end">Amount ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPayslip.earnings.map((item, index) => (
                        <tr key={index}>
                          <td>{item.description}</td>
                          <td className="text-end">{item.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="table-light fw-bold">
                        <td>Total Earnings</td>
                        <td className="text-end">{totalEarnings.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col md={6}>
                  <h5 className="mb-3">Deductions</h5>
                  <Table bordered>
                    <thead className="bg-light">
                      <tr>
                        <th>Description</th>
                        <th className="text-end">Amount ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPayslip.deductions.map((item, index) => (
                        <tr key={index}>
                          <td>{item.description}</td>
                          <td className="text-end">{item.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="table-light fw-bold">
                        <td>Total Deductions</td>
                        <td className="text-end">{totalDeductions.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              
              <Row className="mt-4">
                <Col>
                  <div className="bg-light p-3 rounded">
                    <Row>
                      <Col md={8}>
                        <h5>Net Pay</h5>
                        <p className="text-muted mb-0">Five Thousand Eight Hundred and Thirty Dollars Only</p>
                      </Col>
                      <Col md={4} className="text-end">
                        <h3 className="text-primary">${netPay.toFixed(2)}</h3>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5>Note:</h5>
              <p>
                This is a computer-generated payslip and does not require a signature. 
                If you have any questions regarding your payslip, please contact the HR department.
              </p>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default PayslipPage;