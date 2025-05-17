import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { UserCircle, LogOut, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded} className="mb-3">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="d-flex align-items-center">
            <span className="me-2 text-secondary">👆</span>
            <span>FingerTrack</span>
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setExpanded(!expanded)}
        >
          <Menu size={20} />
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <LinkContainer to="/dashboard" onClick={() => setExpanded(false)}>
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                
                <LinkContainer to="/attendance" onClick={() => setExpanded(false)}>
                  <Nav.Link>Attendance</Nav.Link>
                </LinkContainer>
                
                <LinkContainer to="/leaves" onClick={() => setExpanded(false)}>
                  <Nav.Link>Leave</Nav.Link>
                </LinkContainer>
                
                <LinkContainer to="/payslips" onClick={() => setExpanded(false)}>
                  <Nav.Link>Payslips</Nav.Link>
                </LinkContainer>
                
                {(user.role === 'admin' || user.role === 'manager') && (
                  <LinkContainer to="/reports" onClick={() => setExpanded(false)}>
                    <Nav.Link>Reports</Nav.Link>
                  </LinkContainer>
                )}
                
                {user.role === 'admin' && (
                  <LinkContainer to="/admin/employees" onClick={() => setExpanded(false)}>
                    <Nav.Link>Employees</Nav.Link>
                  </LinkContainer>
                )}
                
                <NavDropdown 
                  title={
                    <span className="d-flex align-items-center">
                      <UserCircle size={18} className="me-1" />
                      {user.name}
                    </span>
                  } 
                  id="basic-nav-dropdown"
                  align="end"
                >
                  <LinkContainer to="/profile" onClick={() => setExpanded(false)}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  
                  <NavDropdown.Divider />
                  
                  <NavDropdown.Item 
                    onClick={() => {
                      logout();
                      setExpanded(false);
                    }}
                    className="d-flex align-items-center text-danger"
                  >
                    <LogOut size={16} className="me-2" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <LinkContainer to="/login" onClick={() => setExpanded(false)}>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;