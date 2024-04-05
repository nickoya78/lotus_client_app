import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LogoutButton from './components/LogoutButton';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import Home from './components/Home'; // Import the Home component
import ResetPassword from './components/ResetPassword';
import UpdatePassword from './components/UpdatePassword';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Add a route for the home page */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/logout" element={<LogoutButton />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/UpdatePassword" element={<UpdatePassword />} />
        {/* Add more routes as necessary */}
      </Routes>
    </Router>
  );
};

export default App;