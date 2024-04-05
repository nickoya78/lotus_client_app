import React, { useEffect, useState } from 'react';
import { resetPassword } from '../api';
import { Form, Button, Alert } from 'react-bootstrap';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  useEffect(() => {
    document.body.style.backgroundColor = '#FFC0CB'; // Set the background color to light orange

    return () => {
        document.body.style.backgroundColor = ''; // Reset the background color when the component unmounts
    };
}, []);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await resetPassword(email);
      setMessage('Password reset email sent');
    } catch (error) {
      setMessage('Error resetting password');
    }
  };

  const customPlaceholderStyle = {
    fontSize: '1em',
   color: 'black',
   width: '50%'
  }

  return (
    <div className="container">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <br/>
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required 
        style={customPlaceholderStyle}/>
      </Form.Group>
      <br/>
      <Button variant="warning" type="submit">
        Reset Password
      </Button>
      {message && <Alert variant="info">{message}</Alert>}
    </Form>
    </div>
  );
};

export default ResetPassword;