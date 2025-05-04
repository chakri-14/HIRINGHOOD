import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");  // Default to "student" (Seeker role)

  const navigate = useNavigate();

  const handleLogin = async () => {
    const payload = {
      email: email,
      password: password,
      role: role
    };

    try {
      const response = await axios.post("http://localhost:5000/api/v1/user/login", payload);
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user",JSON.stringify(response.data.user))
      alert(response?.data?.message);
      navigate(response.data.role === 'student' ? '/seeker/home' : '/employee/home');
    } catch (error: any) {
      alert(error?.response?.data?.message);
    }
  };

  return (
    <Box
      width="360px"
      bgcolor="#1e1e1e"
      boxShadow="0 6px 20px rgba(0, 0, 0, 0.3)"
      display="flex"
      flexDirection="column"
      gap={2.5}
      padding={4}
      borderRadius="10px"
      sx={{
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 28px rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: '#ffffff',
          textAlign: 'center',
          letterSpacing: '-0.5px',
        }}
      >
        {role === "student" ? "Seeker Login" : "Recruiter Login"}
      </Typography>

      <TextField
        label="Username/Email"
        type="email"
        fullWidth
        value={email}
        onChange={e => setEmail(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
            backgroundColor: '#2a2a2a',
            color: '#ffffff',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#333333',
            },
            '&.Mui-focused': {
              backgroundColor: '#2a2a2a',
              boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.2)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#444444',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#7c3aed',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#a1a1aa',
            fontWeight: 500,
            '&.Mui-focused': {
              color: '#7c3aed',
            },
          },
        }}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={e => setPassword(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
            backgroundColor: '#2a2a2a',
            color: '#ffffff',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#333333',
            },
            '&.Mui-focused': {
              backgroundColor: '#2a2a2a',
              boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.2)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#444444',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#7c3aed',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#a1a1aa',
            fontWeight: 500,
            '&.Mui-focused': {
              color: '#7c3aed',
            },
          },
        }}
      />

      <FormControl fullWidth>
        <InputLabel
          sx={{
            color: '#a1a1aa',
            fontWeight: 500,
            '&.Mui-focused': {
              color: '#7c3aed',
            },
          }}
        >
          Role
        </InputLabel>
        <Select
          value={role}
          label="Role"
          onChange={(e) => setRole(e.target.value)}
          sx={{
            borderRadius: '6px',
            backgroundColor: '#2a2a2a',
            color: '#ffffff',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#333333',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#7c3aed',
              boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.2)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#444444',
            },
            '& .MuiSvgIcon-root': {
              color: '#a1a1aa',
            },
          }}
        >
          <MenuItem value="student">Seeker</MenuItem>
          <MenuItem value="recruiter">Recruiter</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleLogin}
        sx={{
          backgroundColor: '#7c3aed',
          padding: '10px',
          borderRadius: '6px',
          fontWeight: 600,
          fontSize: '1rem',
          textTransform: 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: '#6d28d9',
            boxShadow: '0 3px 10px rgba(124, 58, 237, 0.3)',
            transform: 'translateY(-1px)',
          },
        }}
      >
        Log In
      </Button>
    </Box>
  );
};

export default LoginForm;