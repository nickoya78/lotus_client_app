import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { login } from '../api';
import LoginForm from '../components/LoginForm';
import { AxiosRequestHeaders } from 'axios';


// Mock the login function from '../api'
jest.mock('../api', () => ({
  login: jest.fn(),
}));

test('submits form data and handles the login response', async () => {
const mockLogin = login as jest.MockedFunction<typeof login>;
mockLogin.mockResolvedValueOnce({
    data: { id: 1, name: 'Test User' },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: { headers: {} as AxiosRequestHeaders }, // Add this line
  });

const { getByLabelText, getByText, findByText } = render(<LoginForm />);

// Fill out the form
fireEvent.change(getByLabelText(/Email address/i), { target: { value: 'test@example.com' } });
fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password' } });

// Submit the form
fireEvent.click(getByText(/Login/i));

// Wait for the mock login promise to resolve
await waitFor(() => expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password'));

  // Check if the user data is displayed
  expect(await findByText(/User Data:/i)).toBeInTheDocument();
  expect(await findByText(/"id": 1/i)).toBeInTheDocument();
  expect(await findByText(/"name": "Test User"/i)).toBeInTheDocument();
});

test('displays an error message when login fails', async () => {
  const mockLogin = login as jest.MockedFunction<typeof login>;
  mockLogin.mockRejectedValueOnce(new Error('Login failed'));

  const { getByLabelText, getByText, findByText } = render(<LoginForm />);
  
  // Fill out the form
  fireEvent.change(getByLabelText(/Email address/i), { target: { value: 'test@example.com' } });
  fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password' } });

  // Submit the form
  fireEvent.click(getByText(/Login/i));

  // Wait for the mock login promise to reject
  await waitFor(() => expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password'));

  // Check if the error message is displayed
  expect(await findByText(/Login failed/i)).toBeInTheDocument();
});

test('email and password fields are initially empty', () => {
    const { getByLabelText } = render(<LoginForm />);
    expect(getByLabelText(/Email address/i)).toHaveValue('');
    expect(getByLabelText(/Password/i)).toHaveValue('');
  });
  
  test('login button is initially enabled', () => {
    const { getByText } = render(<LoginForm />);
    expect(getByText(/Login/i)).toBeEnabled();
  });
  
  test('error message is initially not displayed', () => {
    const { queryByText } = render(<LoginForm />);
    expect(queryByText(/Login failed/i)).not.toBeInTheDocument();
  });
  
  test('typing into the email and password fields updates their values', () => {
    const { getByLabelText } = render(<LoginForm />);
    fireEvent.change(getByLabelText(/Email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password' } });
    expect(getByLabelText(/Email address/i)).toHaveValue('test@example.com');
    expect(getByLabelText(/Password/i)).toHaveValue('password');
  });
  
 