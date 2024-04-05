import React, { useState, useEffect } from 'react';
import { login } from '../api';
import { Form, Button, Alert } from 'react-bootstrap';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = '#b366ff'; // Set the background color to light purple

    return () => {
      document.body.style.backgroundColor = ''; // Reset the background color when the component unmounts
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      setUserData(response.data);
      setErrorMessage(''); // Clear the error message on successful login
    } catch (unknownError) {
        let error = unknownError as Error; // Type assertion
        setErrorMessage(error.message || 'An error occurred'); // Set the error message on error
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
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
          style={customPlaceholderStyle} />
        </Form.Group>
          <br/>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {/* Display the error message if it exists */}
      {userData && (
        <div>
          <h2>User Data:</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default LoginForm;