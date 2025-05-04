import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar
} from '@mui/material';
import axios from "axios"

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/user/register", {
        name,
        email,
        phone,
        password,
        role: "student"
      });
      alert(response.data.message);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Registration failed. Please try again.");
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
        component="h2"
        textAlign="center"
        sx={{
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.5px',
        }}
      >
        Registration
      </Typography>

      <Box textAlign="center">
        <Avatar
          src={imagePreview || undefined}
          sx={{
            width: 80,
            height: 80,
            margin: "0 auto",
            bgcolor: '#7c3aed',
            fontSize: 28,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          {!imagePreview && getInitials(name)}
        </Avatar>

        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-input"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="upload-input">
          <Button
            variant="outlined"
            component="span"
            sx={{
              mt: 1,
              borderColor: '#7c3aed',
              color: '#7c3aed',
              borderRadius: '6px',
              fontWeight: 500,
              textTransform: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: '#6d28d9',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                color: '#6d28d9',
              },
            }}
          >
            Upload Image
          </Button>
        </label>
      </Box>

      <TextField
        label="Name"
        type="text"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        label="Phone"
        type="tel"
        fullWidth
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
        onChange={(e) => setPassword(e.target.value)}
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

      <Button
        variant="contained"
        onClick={handleSubmit}
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
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;