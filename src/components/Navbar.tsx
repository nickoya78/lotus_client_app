import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png'; // Import your logo image

const Navigation: React.FC = () => {
  return (
    <Navbar style={{ backgroundColor: '#123456' }} variant="dark">
      <Navbar.Brand href="/">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Logo"
        />
        Lotus App
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/login" style={{ color: '#abcdef' }}>Login</Nav.Link>
        <Nav.Link as={Link} to="/register" style={{ color: '#abcdef' }}>Register</Nav.Link>
        <Nav.Link as={Link} to="/logout" style={{ color: '#abcdef' }}>Logout</Nav.Link>
        <Nav.Link as={Link} to="/ResetPassword" style={{ color: '#abcdef' }}>ResetPassword</Nav.Link>
        <Nav.Link as={Link} to="/UpdatePassword" style={{ color: '#abcdef' }}>UpdatePassword</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Navigation;