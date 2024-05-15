import React, { useEffect } from 'react';
import backgroundImage from '../assets/background.jpg'; // Replace with the path to your image

const Home: React.FC = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#f5f5f5'; // Replace with your color

    // Cleanup function to reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      color: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '1em'
    }}>
      <h1 style={{ fontSize: '2em' }}>Welcome to Lotus App!</h1>
      <p style={{ fontSize: '1.5em' }}>Enjoy your stay.</p>
      <style>
      {`
          @media only screen and (max-width: 768px) {
           h1 {
            font-size: 1.5em;
          }
          p {
            font-size: 1em;
          }
        }
     `}
      </style>
    </div>
  );
};

export default Home;