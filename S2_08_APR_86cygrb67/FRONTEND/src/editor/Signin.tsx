import React from 'react';
import { Container, Typography, TextField, Button, Box, Card, CardContent, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { useState as reactUseState } from 'react';

const BackgroundBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundImage: 'url(https://source.unsplash.com/featured/?technology)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 450,
  width: '100%',
  borderRadius: '20px',
  padding: theme.spacing(4),
  boxShadow: '0px 10px 40px rgba(0,0,0,0.2)',
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
}));

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/register', values);
        if (res.data.status) {
          setSnackbarMsg(res.data.message);
          setOpenSnackbar(true);
          setTimeout(() => navigate('/login'), 2000);
        }
      } catch (err: any) {
        setSnackbarMsg(err.response?.data?.message || 'Signup failed');
        setOpenSnackbar(true);
      }
    },
  });

  return (
    <BackgroundBox>
      <StyledCard>
        <CardContent>
          <Typography variant="h4" fontWeight={700} gutterBottom align="center" color="primary">
            Create Account
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
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
            <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 2, borderRadius: 2 }}>
              Sign Up
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Button variant="text" onClick={() => navigate('/login')}>
              Login
            </Button>
          </Typography>
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
        </CardContent>
      </StyledCard>
    </BackgroundBox>
  );
};

function useState<T>(initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  return reactUseState(initialValue);
}

export default Signin;

// Removed duplicate useState implementation
