import React, { useState, useEffect } from 'react';
import { register } from '../api';
import { Form, Button, Alert } from 'react-bootstrap';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

useEffect(() => {
    document.body.style.backgroundColor = '#FFC04D'; // Set the background color to light orange

    return () => {
        document.body.style.backgroundColor = ''; // Reset the background color when the component unmounts
    };
}, []);

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  if (!email || !password || !name ) {
    return; 
  }
  try {
    const response = await register(email, password, name); // Add an empty string as the third argument
    setUserData(response.data);
    setErrorMessage(''); // Clear the error message on successful registration
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
      <Form.Group controlId="formBasicName">
        <br/>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required 
          style={customPlaceholderStyle}/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required 
          style={customPlaceholderStyle}/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required 
          style={customPlaceholderStyle}/>
        </Form.Group>
          <br/>
        <Button variant="primary" type="submit">
          Register
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

export default RegisterForm;