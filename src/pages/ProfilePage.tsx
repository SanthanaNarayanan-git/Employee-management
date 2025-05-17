import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Tab, Nav, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Lock, User, Settings, Fingerprint } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [key, setKey] = useState('profile');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordFormSubmitted, setPasswordFormSubmitted] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    department: user?.department || 'Engineering',
    position: user?.position || 'Developer',
    joinDate: '01/01/2020',
    address: '123 Street, City, Country',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1 (555) 987-6543'
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For demo, we'll just show success message
    setFormSubmitted(true);
    
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };
  
  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For demo, we'll just show success message
    setPasswordFormSubmitted(true);
    
    setTimeout(() => {
      setPasswordFormSubmitted(false);
    }, 3000);
  };

  return (
    <Container className="py-4 fade-in">
      <h1 className="mb-4">My Profile</h1>
      
      <Row>
        <Col lg={3} className="mb-4">
          <Card className="border-0 shadow-sm text-center p-3">
            <div className="mb-3">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 mx-auto" style={{ width: 'fit-content' }}>
                <User size={64} className="text-primary" />
              </div>
            </div>
            <h4>{profileData.name}</h4>
            <p className="text-muted mb-1">{profileData.position}</p>
            <p className="badge bg-info">{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}</p>
            
            <Nav variant="pills" className="flex-column mt-4" activeKey={key} onSelect={(k) => setKey(k || 'profile')}>
              <Nav.Item>
                <Nav.Link eventKey="profile" className="text-start">
                  <User size={16} className="me-2" /> Profile Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="password" className="text-start">
                  <Lock size={16} className="me-2" /> Change Password
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fingerprint" className="text-start">
                  <Fingerprint size={16} className="me-2" /> Fingerprint Settings
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="preferences" className="text-start">
                  <Settings size={16} className="me-2" /> Preferences
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card>
        </Col>
        
        <Col lg={9}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Tab.Content>
                <Tab.Pane eventKey="profile">
                  <h4 className="mb-4">Profile Information</h4>
                  
                  {formSubmitted && (
                    <Alert variant="success" className="mb-4">
                      Profile updated successfully!
                    </Alert>
                  )}
                  
                  <Form onSubmit={handleProfileSubmit}>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="name"
                            value={profileData.name}
                            onChange={handleProfileChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control 
                            type="email" 
                            name="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            required
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control 
                            type="tel" 
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Department</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="department"
                            value={profileData.department}
                            onChange={handleProfileChange}
                            readOnly={user?.role !== 'admin'}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Position</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="position"
                            value={profileData.position}
                            onChange={handleProfileChange}
                            readOnly={user?.role !== 'admin'}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Join Date</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="joinDate"
                            value={profileData.joinDate}
                            onChange={handleProfileChange}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="address"
                        value={profileData.address}
                        onChange={handleProfileChange}
                      />
                    </Form.Group>
                    
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Emergency Contact</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="emergencyContact"
                            value={profileData.emergencyContact}
                            onChange={handleProfileChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Emergency Phone</Form.Label>
                          <Form.Control 
                            type="tel" 
                            name="emergencyPhone"
                            value={profileData.emergencyPhone}
                            onChange={handleProfileChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <div className="mt-4">
                      <Button type="submit" variant="primary">
                        Update Profile
                      </Button>
                    </div>
                  </Form>
                </Tab.Pane>
                
                <Tab.Pane eventKey="password">
                  <h4 className="mb-4">Change Password</h4>
                  
                  {passwordFormSubmitted && (
                    <Alert variant="success" className="mb-4">
                      Password changed successfully!
                    </Alert>
                  )}
                  
                  <Form onSubmit={handlePasswordSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        required
                      />
                      <Form.Text className="text-muted">
                        Password must be at least 8 characters long and include uppercase letters, lowercase letters, and numbers.
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        required
                      />
                    </Form.Group>
                    
                    <div className="mt-4">
                      <Button type="submit" variant="primary">
                        Change Password
                      </Button>
                    </div>
                  </Form>
                </Tab.Pane>
                
                <Tab.Pane eventKey="fingerprint">
                  <h4 className="mb-4">Fingerprint Settings</h4>
                  
                  <Card className="mb-4">
                    <Card.Body className="d-flex align-items-center">
                      <div className="me-3">
                        <div className="rounded-circle bg-success bg-opacity-10 p-3">
                          <Fingerprint size={32} className="text-success" />
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-1">Primary Fingerprint Registered</h5>
                        <p className="text-muted mb-0">Your primary fingerprint is registered and ready to use.</p>
                      </div>
                      <div className="ms-auto">
                        <Button variant="outline-danger" size="sm">
                          Reset
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                  
                  <Card>
                    <Card.Body className="text-center p-4">
                      <h5 className="mb-3">Register Additional Fingerprint</h5>
                      <div className="fingerprint-scanner mb-3">
                        <Fingerprint size={60} className="text-secondary" />
                        <p className="mt-2 mb-0">Tap to register</p>
                      </div>
                      <p className="mb-4 text-muted">
                        Registering an additional fingerprint can be useful as a backup for attendance tracking.
                      </p>
                      <Button variant="primary">
                        Start Registration
                      </Button>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                
                <Tab.Pane eventKey="preferences">
                  <h4 className="mb-4">Notification Preferences</h4>
                  
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="switch"
                        id="email-notifications"
                        label="Email Notifications"
                        defaultChecked
                      />
                      <Form.Text className="text-muted">
                        Receive notifications via email for important updates.
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="switch"
                        id="leave-approval"
                        label="Leave Approval Notifications"
                        defaultChecked
                      />
                      <Form.Text className="text-muted">
                        Get notified when your leave requests are approved or rejected.
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="switch"
                        id="payslip-notifications"
                        label="Payslip Notifications"
                        defaultChecked
                      />
                      <Form.Text className="text-muted">
                        Receive notifications when new payslips are available.
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="switch"
                        id="attendance-reminders"
                        label="Attendance Reminders"
                        defaultChecked
                      />
                      <Form.Text className="text-muted">
                        Get reminders to check in and check out.
                      </Form.Text>
                    </Form.Group>
                    
                    <h4 className="mt-4 mb-3">Display Preferences</h4>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Language</Form.Label>
                      <Form.Select>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Date Format</Form.Label>
                      <Form.Select>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </Form.Select>
                    </Form.Group>
                    
                    <div className="mt-4">
                      <Button type="submit" variant="primary">
                        Save Preferences
                      </Button>
                    </div>
                  </Form>
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;