import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, TextField, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle, Button, SelectChangeEvent } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Define types for job object
interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  company: {
    name: string;
    location: string[];
    website: string;
  };
  requirements: string[];
  experience: number;
  jobType: string;
  position: number;
}

// Styled components for JobListing
const JobListingContainer = styled.div`
  padding: 20px;
  background-color: #f4f6f8;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #3f51b5;
`;

const SearchFilterWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center;
`;

const JobCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
  width: 100%;
  min-width: 280px;
  max-width: 300px;
`;

const JobTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 10px;
  color: #3f51b5;
`;

const JobDescription = styled(Typography)`
  margin-bottom: 10px;
`;

const JobInfo = styled(Typography)`
  margin-bottom: 10px;
  font-size: 14px;
`;

const JobSalary = styled(Typography)`
  font-size: 14px;
  font-weight: bold;
`;

const FilterControl = styled(FormControl)`
  max-width: 250px;
`;

const CardWrapper = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const DialogStyled = styled(Dialog)`
  & .MuiDialog-paper {
    border-radius: 12px;
    padding: 20px;
    width: 600px;
    background: #fafafa;
  }
`;

const DialogTitleStyled = styled(DialogTitle)`
  background-color: #3f51b5;
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 1.5rem;
`;

const DialogContentStyled = styled(DialogContent)`
  margin-top: 20px;
`;

const JobListing: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const navigate = useNavigate()
  // Fetch jobs from the API
  const fetchJobs = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.get('http://localhost:5000/api/v1/job/getadminjobs',{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      setJobs(response.data.jobs); // Store job listings
    } catch (error) {
      console.error('Error fetching job listings:', error);
    }
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle location filter change
  const handleLocationFilterChange = (event: SelectChangeEvent<string>) => {
      setLocationFilter(event.target.value);
  };

  // Filter jobs based on search term and location
  const filterJobs = () => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter !== 'All') {
      filtered = filtered.filter(job => job.location === locationFilter);
    }

    setFilteredJobs(filtered);
  };

  // Fetch job listings on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Apply filter whenever search term or location filter changes
  useEffect(() => {
    filterJobs();
  }, [searchTerm, locationFilter, jobs]);

  // Open dialog with job details
  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
  };

  return (
    <JobListingContainer>
      <Title>Job Listings</Title>

      {/* Search and Filter Section */}
      <SearchFilterWrapper>
        <TextField
          label="Search Jobs"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
        />
        
        <FilterControl fullWidth>
          <InputLabel>Location</InputLabel>
          <Select
            value={locationFilter}
            onChange={handleLocationFilterChange}
            label="Location"
          >
            <MenuItem value="All">All</MenuItem>
            {Array.from(new Set(jobs.map(job => job.location))).map((location, index) => (
              <MenuItem key={index} value={location}>{location}</MenuItem>
            ))}
          </Select>
        </FilterControl>
      </SearchFilterWrapper>

      {/* Job Listings */}
      <Grid container spacing={3} justifyContent="center">
        {filteredJobs.map((job) => (
          <Grid item={true} xs={12} sm={6} md={4} key={job._id}>
            <JobCard onClick={() => handleJobClick(job)}>
              <CardContent>
                <JobTitle variant="h6">{job.title}</JobTitle>
                <JobDescription variant="body2" color="textSecondary">{job.description}</JobDescription>
                <JobInfo variant="body1">
                  Location: <strong>{job.location}</strong>
                </JobInfo>
                <JobSalary variant="body1">
                  Salary: ₹{job.salary.toLocaleString()}
                </JobSalary>
              </CardContent>
            </JobCard>
          </Grid>
        ))}
      </Grid>

      {/* Job Details Dialog */}
      {selectedJob && (
        <DialogStyled open={openDialog} onClose={handleCloseDialog}>
          <DialogTitleStyled>{selectedJob.title}</DialogTitleStyled>
          <DialogContentStyled>
            <Typography variant="h6">Description</Typography>
            <ul>
              {selectedJob.description.split(',').map((desc, index) => (
                <li key={index}><Typography variant="body1">{desc.trim()}</Typography></li>
              ))}
            </ul>

            <Typography variant="h6">Requirements</Typography>
            <ul>
              {selectedJob.requirements.map((req, index) => (
                <li key={index}><Typography variant="body1">{req}</Typography></li>
              ))}
            </ul>

            <Typography variant="h6">Experience</Typography>
            <Typography variant="body1">{selectedJob.experience} years</Typography>

            <Typography variant="h6">Job Type</Typography>
            <Typography variant="body1">{selectedJob.jobType}</Typography>

            <Typography variant="h6">Position</Typography>
            <Typography variant="body1">{selectedJob.position}</Typography>

            <Typography variant="h6">Salary</Typography>
            <Typography variant="body1">₹{selectedJob.salary.toLocaleString()}</Typography>

            <Typography variant="h6">Company</Typography>
            <Typography variant="body1">{selectedJob.company.name}</Typography>
            <Typography variant="body2" color="textSecondary">{selectedJob?.company?.description}</Typography>
            <Typography variant="body2">
              <a href={`http://${selectedJob.company.website}`} target="_blank" rel="noopener noreferrer">
                {selectedJob.company.website}
              </a>
            </Typography>
            <Button onClick={()=>{
                localStorage.setItem("jobId",selectedJob._id)
                navigate("/employee/job/applicants")     
            }}>
                Get Applicants
            </Button>
          </DialogContentStyled>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Close</Button>
          </DialogActions>
        </DialogStyled>
      )}
    </JobListingContainer>
  );
};

export default JobListing;
