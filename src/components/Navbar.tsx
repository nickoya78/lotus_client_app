import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png'; // Import your logo image

const Navigation: React.FC = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#123456'; // Replace with your color

    // Cleanup function to reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <>
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
      <style>
      {`
           @media only screen and (max-width: 768px) {
            .navbar {
              flex-direction: column;
            }
            .nav {
              width: 100%;
            }
          }
        `} 
      </style>
    </>
  );
};

export default Navigation;