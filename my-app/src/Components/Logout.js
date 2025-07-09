// src/Components/Logout.js
import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear login info
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("RoleId");
    localStorage.removeItem("Id");

    // Optionally remove Authorization header
    // axiosInstance.defaults.headers.common['Authorization'] = null;

    // Navigate to login
    navigate('/login');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Are you sure you want to logout?
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        sx={{ mt: 3 }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Logout;
