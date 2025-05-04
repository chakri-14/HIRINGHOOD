import React, { useState } from "react";
import { Dialog, DialogContent, DialogActions, DialogTitle, Typography, TextField, Button, Box } from "@mui/material";
import axios from 'axios';

interface AddCompanyProps {
  openAddCompany: boolean;
  setOpenAddCompany: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCompany: React.FC<AddCompanyProps> = ({ openAddCompany, setOpenAddCompany }) => {
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    location: "",
    website: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/company/register",
        companyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Company registered successfully:", response.data);

      setCompanyData({
        name: "",
        description: "",
        location: "",
        website: ""
      });

      setOpenAddCompany(false);
    } catch (err: any) {
      setError("Failed to register company. Please try again.");
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={openAddCompany}
      onClose={() => setOpenAddCompany(false)}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: '#1e1e1e',
          borderRadius: '10px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.5px',
          }}
        >
          Register a New Company
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            name="name"
            value={companyData.name}
            onChange={handleInputChange}
            label="Name"
            fullWidth
            variant="outlined"
            required
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
            name="description"
            value={companyData.description}
            onChange={handleInputChange}
            label="Description"
            fullWidth
            variant="outlined"
            required
            multiline
            rows={4}
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
            name="location"
            value={companyData.location}
            onChange={handleInputChange}
            label="Location"
            fullWidth
            variant="outlined"
            required
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
            name="website"
            value={companyData.website}
            onChange={handleInputChange}
            label="Website"
            fullWidth
            variant="outlined"
            required
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
          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{
                mt: 2,
                color: '#f87171',
                textAlign: 'center',
              }}
            >
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', padding: '16px' }}>
        <Button
          onClick={() => setOpenAddCompany(false)}
          variant="outlined"
          sx={{
            borderColor: '#a1a1aa',
            color: '#a1a1aa',
            borderRadius: '6px',
            textTransform: 'none',
            padding: '8px 16px',
            marginRight: '8px',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: '#7c3aed',
              color: '#7c3aed',
              backgroundColor: 'rgba(124, 58, 237, 0.1)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleRegister}
          variant="contained"
          sx={{
            backgroundColor: '#7c3aed',
            borderRadius: '6px',
            textTransform: 'none',
            padding: '8px 16px',
            fontWeight: 600,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#6d28d9',
              boxShadow: '0 3px 10px rgba(124, 58, 237, 0.3)',
              transform: 'translateY(-1px)',
            },
            '&:disabled': {
              backgroundColor: '#4b5563',
              color: '#a1a1aa',
            },
          }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCompany;