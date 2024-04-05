import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ResetPassword from '../components/ResetPassword';
import { resetPassword } from '../api'; // Import the function you're testing

// Mock the resetPassword function
jest.mock('../api', () => ({
  resetPassword: jest.fn(),
}));

describe('ResetPassword', () => {
  it('renders correctly', () => {
    const { getByLabelText, getByText } = render(<ResetPassword />);

    expect(getByLabelText('Email address')).toBeInTheDocument();
    expect(getByText('Reset Password')).toBeInTheDocument();
  });

  it('calls resetPassword when the form is submitted', async () => {
    const { getByLabelText, getByText } = render(<ResetPassword />);

    fireEvent.change(getByLabelText('Email address'), { target: { value: 'test@example.com' } });

    fireEvent.click(getByText('Reset Password'));

    await waitFor(() => {
      expect(resetPassword).toHaveBeenCalledWith('test@example.com');
    });
  });
});