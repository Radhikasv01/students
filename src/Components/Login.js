import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';

const Login = () => {
  const [loginData, setLoginData] = useState({
    token:'',
    userName: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7005/api/Login/Login', {
        userName: loginData.userName,
        password: loginData.password,
      });

      const result = response.data;

      if (result.response?.isSuccess) {
        setMessage('✅ ' + result.response.message);
        localStorage.setItem('token', result.login.token);
      } else {
        setMessage('❌ ' + result.response.message);
      }
    } catch (error) {
      setMessage('❌ Login failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            name="userName"
            label="Username"
            variant="outlined"
            value={loginData.userName}
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
          <Typography variant="body1">{message}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
