import React from 'react';
import { Container, Typography, Box, TextField, Button, Paper, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(5, 'Minimum 5 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', values);
        if (response.data.status) {
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
          setSnackbarMsg(response.data.message);
          setOpenSnackbar(true);
          const role = response.data.data.user.role;
          setTimeout(() => navigate(role === 'user' ? '/' : '/admin'), 2000);
        } else {
          setSnackbarMsg(response.data.message);
          setOpenSnackbar(true);
        }
      } catch (error: any) {
        setSnackbarMsg(error.response?.data?.message || 'Login failed');
        setOpenSnackbar(true);
      }
    },
  });

  return (
    <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center" sx={{ p: 2 }}>
      <Paper elevation={10} sx={{ p: 5, width: 400, borderRadius: 4 }}>
        <Typography variant="h4" textAlign="center" gutterBottom color="primary">
          Welcome Back
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, py: 1.5, fontWeight: 600 }}>
            Login
          </Button>
        </form>
        <Button onClick={() => navigate('/signup')} fullWidth sx={{ mt: 2, textTransform: 'none' }}>
          Don’t have an account? <strong>Sign Up</strong>
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarMsg.includes('failed') ? 'error' : 'success'}>
            {snackbarMsg}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

// Removed duplicate useState implementation

export default Login;

import { useState } from 'react';
