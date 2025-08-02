// // src/Components/Login.js
// import React, { useState } from 'react';
// import { Button, TextField, Container, Typography, Box, Snackbar, Alert } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../axios';

// const Login = () => {
//   const [form, setForm] = useState({ username: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('info');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prevForm) => ({ ...prevForm, [name]: value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { username, password } = form;

//     const validationErrors = {};
//     if (!username) validationErrors.username = 'Username is required';
//     if (!password) validationErrors.password = 'Password is required';
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       const response = await axiosInstance.post('Login/Login', {
//         UserName: username,
//         Password: password,
//       });

//       const loginData = response.data?.login;

//       if (loginData?.Token) {
//         axiosInstance.defaults.headers.common['Authorization'] = loginData.Token;
//         localStorage.setItem('USERNAME', loginData.UserName);
//         localStorage.setItem('RoleId', loginData.Role_Id);
//         localStorage.setItem('Id', loginData.Id);

//         setSnackbarMessage('Login Successful');
//         setSnackbarSeverity('success');
//         setSnackbarOpen(true);

//         setTimeout(() => {
//           navigate('/Navbar');
//         }, 1000);
//       } else {
//         throw new Error('Invalid login');
//       }
//     } catch (err) {
//       setSnackbarMessage('Invalid username or password');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleCancel = () => {
//     setForm({ username: '', password: '' });
//     navigate('/');
//   };

//   return (
//     <Container maxWidth="xs" sx={{ mt: 8 }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Login
//       </Typography>
//       <Box component="form" onSubmit={handleLogin} noValidate>
//         <TextField
//           fullWidth
//           label="Username"
//           name="username"
//           margin="normal"
//           value={form.username}
//           onChange={handleChange}
//           error={!!errors.username}
//           helperText={errors.username}
//         />
//         <TextField
//           fullWidth
//           label="Password"
//           name="password"
//           type="password"
//           margin="normal"
//           value={form.password}
//           onChange={handleChange}
//           error={!!errors.password}
//           helperText={errors.password}
//         />
//         <Box display="flex" justifyContent="space-between" mt={2}>
//           <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mr: 1 }}>
//             Login
//           </Button>
//           <Button onClick={handleCancel} variant="outlined" color="secondary" fullWidth sx={{ ml: 1 }}>
//             Cancel
//           </Button>
//         </Box>
//       </Box>
//       <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
//         <Alert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default Login;



// src/Components/Login.js
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      const response = await axiosInstance.post('/Login/Login', {
        token: '',
        username,
        password,
      });

      if (response.data?.login?.token) {
        const acctoken = response.data.login.token;
        axiosInstance.defaults.headers.common['Authorization'] = acctoken;
        localStorage.setItem('USERNAME', response.data.login.userName);
        localStorage.setItem('RoleId', response.data.login.role_Id);
        localStorage.setItem('Id', response.data.login.id);

        setSnackbarMessage('Login Successful');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);

        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        throw new Error('Invalid login');
      }
    } catch {
      setSnackbarMessage('Invalid username or password');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCancel = () => {
    setForm({ username: '', password: '' });
    navigate('/');
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>Login</Typography>
      <Box component="form" onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          margin="normal"
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          margin="normal"
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button type="submit" variant="contained">Login</Button>
          <Button onClick={handleCancel} variant="outlined" color="secondary">Cancel</Button>
        </Box>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
