// src/Components/Welcome.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundImage: `url('/pexels-jessbaileydesign-743986.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.85)', p: 4, borderRadius: 3 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Our Student Portal
        </Typography>
        <Typography variant="h6" gutterBottom>
          Click below to login
        </Typography>
        <Box mt={4}>
          <Button variant="contained" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Welcome;
