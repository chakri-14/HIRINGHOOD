"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Chip, Button, List, ListItem, CircularProgress } from "@mui/material";
import styled from "styled-components";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ApplicationForm from "../../components/ApplicationForm";

// Interface definitions
interface Company {
  _id: string;
  name: string;
  location: string[];
}

interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  application: string[];
  salary: string;
  experience: number;
  location: string;
  jobType: string;
  position: number;
  company: Company;
  created_by: string;
  createdAt: string;
  updatedAt: string;
}

interface JobResponse {
  success: boolean;
  job: Job;
}

// Styled components
const JobContainer = styled(Box)`
  padding: 24px;
  max-width: 960px;
  margin: auto;
  background-color: #f7f9fc;
  min-height: 100vh;
  font-family: 'Inter', 'Roboto', sans-serif;
`;

const Title = styled(Typography)`
  font-weight: 700;
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 16px;
`;

const InfoRow = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  color: #4b5563;
  font-size: 1rem;
`;

const Section = styled(Box)`
  margin-top: 24px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled(Typography)`
  font-weight: 600;
  font-size: 1.25rem;
  color: #2563eb;
  margin-bottom: 12px;
`;

const RequirementChip = styled(Chip)`
  margin: 4px;
  background-color: #e5e7eb;
  color: #1a1a1a;
  border: 1px solid #2563eb;
  font-weight: 500;
  transition: transform 0.2s ease, background-color 0.2s ease;
  &:hover {
    background-color: #dbeafe;
    transform: scale(1.05);
  }
`;

const ApplyButton = styled(Button)`
  background-color: #2563eb;
  color: #ffffff;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  text-transform: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease, transform 0.2s ease;
  &:hover {
    background-color: #1d4ed8;
    transform: translateY(-2px);
  }
`;

const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f9fc;
`;

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const getJobDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get<JobResponse>(`http://localhost:5000/api/v1/job/jobs/${id}`, {
        headers: { "Cache-Control": "no-store", "Authorization": `Bearer ${token}` },
      });
      setJob(res.data.job);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getJobDetails();
    }
  }, [id]);

  // Function to convert description to points by splitting at commas
  const formatDescription = (description: string) => {
    const points = description.split(",").map((point, index) => (
      <ListItem key={index} sx={{ padding: '4px 0', color: '#4b5563' }}>
        {point.trim()}
      </ListItem>
    ));
    return points;
  };

  if (!job) {
    return (
      <LoadingContainer>
        <CircularProgress size={40} sx={{ color: '#2563eb' }} />
        <Typography variant="h6" color="#4b5563" mt={2}>
          Loading job details...
        </Typography>
      </LoadingContainer>
    );
  }

  return (
    <JobContainer>
      <Title variant="h4">{job.title}</Title>

      <InfoRow>
        <WorkOutlineIcon sx={{ color: '#2563eb' }} />
        <Typography>{job.jobType}</Typography>
      </InfoRow>

      <InfoRow>
        <LocationOnIcon sx={{ color: '#2563eb' }} />
        <Typography>{job.location}</Typography>
      </InfoRow>

      <InfoRow>
        <AttachMoneyIcon sx={{ color: '#2563eb' }} />
        <Typography>₹ {job.salary}</Typography>
      </InfoRow>

      <Section>
        <SectionTitle variant="h6">Job Description</SectionTitle>
        <List>{formatDescription(job.description)}</List>
      </Section>

      <Section>
        <SectionTitle variant="h6">Requirements</SectionTitle>
        <Box display="flex" flexWrap="wrap" mt={1}>
          {job.requirements.map((req, idx) => (
            <RequirementChip key={idx} label={req} variant="outlined" />
          ))}
        </Box>
      </Section>

      <Section>
        <SectionTitle variant="h6">Company Details</SectionTitle>
        <Typography mt={1} color="#4b5563">
          <b>Name:</b> {job.company.name}
        </Typography>
        <Typography mt={1} color="#4b5563">
          <b>Locations:</b> {job.company.location.join(", ")}
        </Typography>
        <Typography mt={1} color="#4b5563">
          <b>Applicants:</b> {job.application.length}
        </Typography>
      </Section>

      <Section>
        <ApplyButton
          variant="contained"
          size="large"
          onClick={() => {
            setOpen(true);
          }}
        >
          Apply Now
        </ApplyButton>
      </Section>
      <ApplicationForm open={open} setOpen={setOpen} id={job._id} />
    </JobContainer>
  );
};

export default JobDetailsPage;