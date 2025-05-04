import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";

interface AddJobProps {
  openAddJob: boolean;
  setOpenAddJob: React.Dispatch<React.SetStateAction<boolean>>;
}

type Company = {
  _id: string;
  name: string;
  description: string;
  location: string[];
};

const AddJob: React.FC<AddJobProps> = ({ openAddJob, setOpenAddJob }) => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experience: "",
    jobType: "",
    location: "",
    position: "",
    company: null as Company | null,
  });

  const [companies, setCompanies] = useState<Company[]>([]);

  const getCompanies = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/api/v1/company/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched companies:", response.data.data);
      setCompanies(response.data?.company || []);
    } catch (err) {
      console.error("Failed to fetch companies:", err);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    e: SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    if (name) {
      setJobData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCompanyChange = (e: SelectChangeEvent<string>) => {
    const selectedCompany = companies.find(
      (company) => company._id === e.target.value
    );
    if (selectedCompany) {
      setJobData((prev) => ({ ...prev, company: selectedCompany }));
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting job:", jobData);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/v1/job/post",
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert(response?.data?.message);
      setOpenAddJob(false);
    } catch (error: any) {
      alert(error?.response?.data?.message);
    }
  };

  return (
    <Dialog
      open={openAddJob}
      onClose={() => setOpenAddJob(false)}
      maxWidth="md"
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
          Add New Job
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <FormControl fullWidth variant="outlined" required>
            <InputLabel
              sx={{
                color: '#a1a1aa',
                fontWeight: 500,
                '&.Mui-focused': {
                  color: '#7c3aed',
                },
              }}
            >
              Select Company
            </InputLabel>
            <Select
              name="company"
              value={jobData.company?._id || ""}
              onChange={handleCompanyChange}
              label="Select Company"
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
              {companies.map((company) => (
                <MenuItem key={company._id} value={company._id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Job Title"
            name="title"
            value={jobData.title}
            onChange={handleInputChange}
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
            label="Job Description"
            name="description"
            value={jobData.description}
            onChange={handleInputChange}
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
            label="Required Skills (comma separated)"
            name="requirements"
            value={jobData.requirements}
            onChange={handleInputChange}
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
            label="Salary (in INR)"
            name="salary"
            value={jobData.salary}
            onChange={handleInputChange}
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
            label="Experience (in years)"
            name="experience"
            value={jobData.experience}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            required
            type="number"
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
          <FormControl fullWidth variant="outlined" required>
            <InputLabel
              sx={{
                color: '#a1a1aa',
                fontWeight: 500,
                '&.Mui-focused': {
                  color: '#7c3aed',
                },
              }}
            >
              Job Type
            </InputLabel>
            <Select
              name="jobType"
              value={jobData.jobType}
              onChange={handleSelectChange}
              label="Job Type"
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
              <MenuItem value="full-time">Full-time</MenuItem>
              <MenuItem value="part-time">Part-time</MenuItem>
              <MenuItem value="contract">Contract</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" required>
            <InputLabel
              sx={{
                color: '#a1a1aa',
                fontWeight: 500,
                '&.Mui-focused': {
                  color: '#7c3aed',
                },
              }}
            >
              Location
            </InputLabel>
            <Select
              name="location"
              value={jobData.location}
              onChange={handleSelectChange}
              label="Location"
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
              {jobData.company?.location.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Available Positions"
            name="position"
            value={jobData.position}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            required
            type="number"
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
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
        <Button
          onClick={() => setOpenAddJob(false)}
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
          onClick={handleSubmit}
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
          }}
        >
          Add Job
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddJob;