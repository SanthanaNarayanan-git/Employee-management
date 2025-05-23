import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Tabs, Tab, Modal } from 'react-bootstrap';
import { format, addDays, addMonths } from 'date-fns';
import { Calendar, PlusCircle, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
import { leaveAPI } from '../services/api';
import { toast } from 'react-toastify';

const LeavePage: React.FC = () => {
  const [showNewLeaveModal, setShowNewLeaveModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('my-leaves');
  const [leaveData, setLeaveData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    startDate: '',
    endDate: '',
    days: 0,
    reason: ''
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const response = await leaveAPI.getUserLeaves();
      setLeaveData(response.data);
    } catch (error) {
      toast.error('Failed to fetch leave history');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setFormData(prev => ({
        ...prev,
        days: diffDays
      }));
    }
  };

  useEffect(() => {
    calculateDays();
  }, [formData.startDate, formData.endDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await leaveAPI.createLeave(formData);
      toast.success('Leave application submitted successfully');
      setShowNewLeaveModal(false);
      fetchLeaves();
      setFormData({
        type: '',
        startDate: '',
        endDate: '',
        days: 0,
        reason: ''
      });
    } catch (error) {
      toast.error('Failed to submit leave application');
    }
  };

  const handleCancelLeave = async (id: string) => {
    try {
      await leaveAPI.cancelLeave(id);
      toast.success('Leave request cancelled successfully');
      fetchLeaves();
    } catch (error) {
      toast.error('Failed to cancel leave request');
    }
  };

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
                  <tr key={leave._id}>
                    <td>{leave.type}</td>
                    <td>{format(new Date(leave.startDate), 'dd/MM/yyyy')}</td>
                    <td>{format(new Date(leave.endDate), 'dd/MM/yyyy')}</td>
                    <td>{leave.days}</td>
                    <td>{leave.reason}</td>
                    <td>{format(new Date(leave.createdAt), 'dd/MM/yyyy')}</td>
                    <td>{getStatusBadge(leave.status)}</td>
                    <td>
                      {leave.status === 'pending' && (
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleCancelLeave(leave._id)}
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
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Leave Type</Form.Label>
              <Form.Select 
                required
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="">Select Leave Type</option>
                <option value="casual">Casual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="personal">Personal Leave</option>
              </Form.Select>
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>From Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    required
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>To Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    required
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Number of Days</Form.Label>
              <Form.Control 
                type="number" 
                value={formData.days}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reason for Leave</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                required
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="secondary" onClick={() => setShowNewLeaveModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit Application
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default LeavePage;