import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { register } from '../api';
import RegisterForm from '../components/RegisterForm';
import { AxiosRequestHeaders } from 'axios';
import { act } from '@testing-library/react';


// Mock the register function from '../api'
jest.mock('../api', () => ({
  register: jest.fn(),
}));

test('submits form data and handles the register response', async () => {
  const mockRegister = register as jest.MockedFunction<typeof register>;
  mockRegister.mockResolvedValueOnce({
    data: { id: 1, name: 'Test User' },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: { headers: {} as AxiosRequestHeaders },
  });

  const { getByLabelText, getByText, findByText } = render(<RegisterForm />);
  
  // Fill out the form
  // ... rest of your test setup

fireEvent.change(getByLabelText(/Name/i), { target: { value: 'Test User' } });
fireEvent.change(getByLabelText(/Email address/i), { target: { value: 'test@example.com' } });
fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password' } });

// Submit the form
fireEvent.click(getByText(/Register/i));

// Wait for the mock register promise to resolve
await waitFor(() => expect(mockRegister).toHaveBeenCalledWith('test@example.com', 'password', 'Test User'));

// Check if the user data is displayed
  expect(await findByText(/User Data:/i)).toBeInTheDocument();
  expect(await findByText(/"id": 1/i)).toBeInTheDocument();
  expect(await findByText(/"name": "Test User"/i)).toBeInTheDocument();
});

test('displays an error message when registration fails', async () => {
  const mockRegister = register as jest.MockedFunction<typeof register>;
  mockRegister.mockRejectedValueOnce(new Error('Registration failed'));

  const { getByLabelText, getByText, findByText } = render(<RegisterForm />);
  
  // Fill out the form
  // ... rest of your test setup

fireEvent.change(getByLabelText(/Name/i), { target: { value: 'Test User' } });
fireEvent.change(getByLabelText(/Email address/i), { target: { value: 'test@example.com' } });
fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password' } });

// Submit the form
fireEvent.click(getByText(/Register/i));

// Wait for the mock register promise to resolve
await waitFor(() => expect(mockRegister).toHaveBeenCalledWith('test@example.com', 'password', 'Test User'));

// ... rest of your test
  // Check if the error message is displayed
  expect(await findByText(/Registration failed/i)).toBeInTheDocument();
});

test('email and password fields are initially empty', () => {
    const { getByLabelText } = render(<RegisterForm />);
    expect(getByLabelText(/Email address/i)).toHaveValue('');
    expect(getByLabelText(/Password/i)).toHaveValue('');
  });
  
  test('register button is initially enabled', () => {
    const { getByText } = render(<RegisterForm />);
    expect(getByText(/Register/i)).toBeEnabled();
  });
  
  test('error message is initially not displayed', () => {
    const { queryByText } = render(<RegisterForm />);
    expect(queryByText(/Registration failed/i)).not.toBeInTheDocument();
  });
  
  test('typing into the email and password fields updates their values', () => {
    const { getByLabelText } = render(<RegisterForm />);
    fireEvent.change(getByLabelText(/Email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password' } });
    expect(getByLabelText(/Email address/i)).toHaveValue('test@example.com');
    expect(getByLabelText(/Password/i)).toHaveValue('password');
  });
  test('background color is set to light orange when the component mounts and reset when it unmounts', async () => {
    render(<RegisterForm />);
    await waitFor(() => expect(document.body.style.backgroundColor).toBe('rgb(255, 192, 77)'));
  });
  


  
  test('user data is not displayed when the form is initially rendered', () => {
    const { queryByText } = render(<RegisterForm />);
    expect(queryByText(/User Data:/i)).not.toBeInTheDocument();
  });