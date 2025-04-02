import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="hero">
      <h1>Welcome to Your Dashboard</h1>
      <p></p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Hero;