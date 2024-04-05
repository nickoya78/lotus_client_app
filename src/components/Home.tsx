import React from 'react';
import backgroundImage from '../assets/background.jpg'; // Replace with the path to your image

const Home: React.FC = () => {
  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      height: '100vh',
      color: '#f5f5f5'
    }}>
      <h1>Welcome to Lotus App!</h1>
      <p>Enjoy your stay.</p>
    </div>
  );
};

export default Home;