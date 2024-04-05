import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { logout } from '../api';
import LogoutButton from '../components/LogoutButton';

// Mock the logout function from '../api'
jest.mock('../api', () => ({
  logout: jest.fn(),
}));

test('renders logout button', () => {
  const { getByText } = render(<LogoutButton />);
  expect(getByText(/Logout/i)).toBeInTheDocument();
});

test('calls logout function when button is clicked', async () => {
  const mockLogout = logout as jest.MockedFunction<typeof logout>;
  const { getByText } = render(<LogoutButton />);
  fireEvent.click(getByText(/Logout/i));
  expect(mockLogout).toHaveBeenCalled();
});


test('does not display logout data when component is initially rendered', () => {
  const { queryByText } = render(<LogoutButton />);
  expect(queryByText(/Logout Data:/i)).not.toBeInTheDocument();
});

test('background color is set to #abcdef when the component mounts', async () => {
  render(<LogoutButton />);
  await waitFor(() => expect(document.body.style.backgroundColor).toBe('rgb(171, 205, 239)'));
});

test('background color is reset when the component unmounts', async () => {
  const { unmount } = render(<LogoutButton />);
  unmount();
  expect(document.body.style.backgroundColor).toBe('');
});

test('logout button is initially enabled', () => {
  const { getByText } = render(<LogoutButton />);
  expect(getByText(/Logout/i)).toBeEnabled();
});

test('logout button has danger variant', () => {
  const { getByText } = render(<LogoutButton />);
  expect(getByText(/Logout/i)).toHaveClass('btn-danger');
});

test('container has correct styles', () => {
  const { getByText } = render(<LogoutButton />);
  const container = getByText(/Logout/i).parentElement;
  expect(container).toHaveStyle({ height: '100vh', width: '100vw' });
});

test('logout data is not displayed when logout fails', async () => {
  const mockLogout = logout as jest.MockedFunction<typeof logout>;
  mockLogout.mockRejectedValueOnce(new Error('Logout failed'));
  const { getByText, queryByText } = render(<LogoutButton />);
  fireEvent.click(getByText(/Logout/i));
  expect(queryByText(/Logout Data:/i)).not.toBeInTheDocument();
});