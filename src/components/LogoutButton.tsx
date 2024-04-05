import React, { useState, useEffect } from 'react';
import { logout } from '../api';
import { Button } from 'react-bootstrap';

const LogoutButton: React.FC = () => {
  const [logoutData, setLogoutData] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#abcdef';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logout();
      setLogoutData(response.data);
      // Handle successful logout
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="container" style={{ height: '100vh', width: '100vw' }}>
      <br/>
      <Button variant="danger" onClick={handleLogout}>Logout</Button>
      {logoutData && (
        <div>
          <h2>Logout Data:</h2>
          <pre>{JSON.stringify(logoutData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;