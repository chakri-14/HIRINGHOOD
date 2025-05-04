"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Box,
  Grid,
  Typography,
  Button,
  Chip,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField
} from "@mui/material";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Company {
  _id: string;
  name: string;
  location: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  website: string;
  imageUrl: string;
}

interface Job {
  _id: string;
  title: string;
  requirements: string[];
  salary: string;
  experience: number;
  location: string;
  jobType: string;
  position: number;
  company: Company;
  created_by: string;
  application: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface JobResponse {
  jobs: Job[];
  success: boolean;
}

// Styled Components
const JobCard = styled(motion.div)`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CompanyLogo = styled(Avatar)`
  width: 80px;
  height: 80px;
  margin-bottom: 12px;
`;

const JobTitle = styled(Typography)`
  font-weight: bold;
  color: #333;
  font-size: 1.5rem;
`;

const CompanyName = styled(Typography)`
  color: #777;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const InfoRow = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px 0;
  color: #555;
`;

const ApplyButton = styled(Button)`
  margin-top: 20px;
  background-color: #6a1b9a;
  color: white;
  font-weight: 600;
  border-radius: 50px;
  padding: 8px 24px;
  &:hover {
    background-color:rgb(5, 1, 10);
    color:white;
  }
`;

const FilterContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const JobBoard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()
  const getJobs = async () => {
    try {
      const res = await axios.get<JobResponse>("http://localhost:5000/api/v1/job/get", {
        headers: { "Cache-Control": "no-store" },
      });
      if (res.data.success) {
        setJobs(res.data.jobs);
        setFilteredJobs(res.data.jobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  const handleNavigate =(id: string)=>{
    navigate(`/jobs/${id}`)
  }
  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    let updatedJobs = jobs;
    if (locationFilter) {
      updatedJobs = updatedJobs.filter((job) => job.location.toLowerCase().includes(locationFilter.toLowerCase()));
    }
    if (jobTypeFilter) {
      updatedJobs = updatedJobs.filter((job) => job.jobType.toLowerCase().includes(jobTypeFilter.toLowerCase()));
    }
    if (searchQuery) {
      updatedJobs = updatedJobs.filter((job) => job.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredJobs(updatedJobs);
  }, [locationFilter, jobTypeFilter, searchQuery, jobs]);

  return (
    <Box p={4}>
      <Typography variant="h3" textAlign="center" mb={4} fontWeight="bold" color="#4a148c">
        Explore Exciting Jobs
      </Typography>

      {/* Filters */}
      <FilterContainer>
        <TextField
          label="Search Jobs"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Location</InputLabel>
          <Select
            value={locationFilter}
            label="Location"
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="Bangalore">Bangalore</MenuItem>
            <MenuItem value="Delhi">Delhi</MenuItem>
            <MenuItem value="Hyderabad">Hyderabad</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Job Type</InputLabel>
          <Select
            value={jobTypeFilter}
            label="Job Type"
            onChange={(e) => setJobTypeFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Full Time">Full Time</MenuItem>
            <MenuItem value="Part Time">Part Time</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
          </Select>
        </FormControl>
      </FilterContainer>

      {/* Job Cards */}
      <Grid container spacing={4}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id} onClick={()=>handleNavigate(job._id)}>
            <JobCard
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CompanyLogo src={job.company.imageUrl} />
              <JobTitle>{job.title}</JobTitle>
              <CompanyName>{job.company.name}</CompanyName>

              <InfoRow>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">{job.location}</Typography>
              </InfoRow>

              <InfoRow>
                <WorkOutlineIcon fontSize="small" />
                <Typography variant="body2">{job.jobType}</Typography>
              </InfoRow>

              <InfoRow>
                <AttachMoneyIcon fontSize="small" />
                <Typography variant="body2">{job.salary}</Typography>
              </InfoRow>

              <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                {job.requirements.slice(0, 3).map((req, idx) => (
                  <Chip key={idx} label={req} size="small" variant="outlined" />
                ))}
              </Box>

              <ApplyButton fullWidth>Apply Now</ApplyButton>
            </JobCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default JobBoard;
