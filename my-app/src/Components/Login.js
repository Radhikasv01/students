import React, { useState } from 'react';
import {
  Button, TextField, Container, Typography, Box, Snackbar, Alert, IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = form;

    const validationErrors = {};
    if (!username) validationErrors.username = 'Username is required';
    if (!password) validationErrors.password = 'Password is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axiosInstance.post('Login/Login', {
        UserName: username,
        Password: password,
      });

      const loginData = response.data?.login;

      if (loginData?.Token) {
        axiosInstance.defaults.headers.common['Authorization'] = loginData.Token;
        localStorage.setItem('USERNAME', loginData.UserName);
        localStorage.setItem('RoleId', loginData.Role_Id);
        localStorage.setItem('Id', loginData.Id);

        setSnackbarMessage('Login Successful');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        setTimeout(() => {
          navigate('/Navbar');
        }, 1000);
      } else {
        throw new Error('Invalid login');
      }
    } catch (err) {
      setSnackbarMessage('Invalid username or password');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCancel = () => {
    setForm({ username: '', password: '' });
    navigate('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Login
      </Typography>
      <Box component="form" onSubmit={handleLogin} noValidate>
        <TextField
          fullWidth
          autoFocus
          label="Username"
          name="username"
          margin="normal"
          value={form.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          margin="normal"
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mr: 1 }}
          >
            Login
          </Button>
          <Button
            onClick={handleCancel}
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ ml: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setSnackbarOpen(false)}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
