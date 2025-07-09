import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box,
  Snackbar, Alert, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    userName: '',
    password: '',
    emailAddress: '',
    mobile: '',
    address: '',
    pincode: '',
    roleId: '',
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('Register/Add', {
        ...form,
        date: new Date().toISOString(),
        isActive: true,
      });
      setSnackbar({ open: true, message: 'Registration successful', severity: 'success' });
      setTimeout(() => navigate('/registerlist'), 1000);
    } catch (error) {
      setSnackbar({ open: true, message: 'Registration failed', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField fullWidth label="Username" name="userName" onChange={handleChange} margin="normal" required />
        <TextField fullWidth label="Password" name="password" type="password" onChange={handleChange} margin="normal" required />
        <TextField fullWidth label="Email Address" name="emailAddress" onChange={handleChange} margin="normal" required />
        <TextField fullWidth label="Mobile" name="mobile" onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Address" name="address" onChange={handleChange} margin="normal" required />
        <TextField fullWidth label="Pincode" name="pincode" type="number" onChange={handleChange} margin="normal" required />

        {/* Role Dropdown */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="roleId"
            name="roleId"
            value={form.roleId}
            onChange={handleChange}
            label="Role"
          >
            <MenuItem value={1}>Student</MenuItem>
            <MenuItem value={2}>Teacher</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Register</Button>
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
