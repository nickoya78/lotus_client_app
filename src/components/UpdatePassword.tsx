import React, { useEffect, useState } from 'react';
import { updatePasswordWithToken } from '../api'; // Import the new API function
import { Form, Button, Alert } from 'react-bootstrap';

const UpdatePassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetToken, setResetToken] = useState(''); // Add a new state variable for the reset token
  const [message, setMessage] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = '#8FBC8F';

    return () => {
        document.body.style.backgroundColor = '';
    };
}, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await updatePasswordWithToken(email, newPassword, resetToken); // Call the new API function with the reset token
      setMessage('Password updated successfully');
    } catch (error) {
      setMessage('Error updating password');
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
      
      <Form.Group controlId="formBasicPassword">
        <br />
        <Form.Label>New Password</Form.Label>
        <Form.Control type="password" placeholder="Enter new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required 
        style={customPlaceholderStyle}/>
      </Form.Group>

      <Form.Group controlId="formBasicToken">
        <br />
        <Form.Label>Reset Token</Form.Label>
        <Form.Control type="text" placeholder="Enter reset token" value={resetToken} onChange={e => setResetToken(e.target.value)} required 
        style={customPlaceholderStyle}/>
      </Form.Group>

      <br />
      <Button variant="warning" type="submit">
        Update Password
      </Button>
      {message && <Alert variant="info">{message}</Alert>}
    </Form>
    </div>
  );
};

export default UpdatePassword;