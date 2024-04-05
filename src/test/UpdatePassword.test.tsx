import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UpdatePassword from '../components/UpdatePassword';
import { updatePasswordWithToken } from '../api'; // Import the function you're testing

// Mock the updatePasswordWithToken function
jest.mock('../api', () => ({
    updatePasswordWithToken: jest.fn(),
}));

describe('UpdatePassword', () => {
  it('renders correctly', () => {
    const { getByLabelText, getByText } = render(<UpdatePassword />);

    expect(getByLabelText('Email address')).toBeInTheDocument();
    expect(getByLabelText('New Password')).toBeInTheDocument();
    expect(getByLabelText('Reset Token')).toBeInTheDocument();
    expect(getByText('Update Password')).toBeInTheDocument();
  });

  it('calls updatePasswordWithToken when the form is submitted', async () => {
    const { getByLabelText, getByText } = render(<UpdatePassword />);

    fireEvent.change(getByLabelText('Email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('New Password'), { target: { value: 'newPassword' } });
    fireEvent.change(getByLabelText('Reset Token'), { target: { value: 'resetToken' } });

    fireEvent.click(getByText('Update Password'));

    await waitFor(() => {
      expect(updatePasswordWithToken).toHaveBeenCalledWith('test@example.com', 'newPassword', 'resetToken');
    });
  });
});