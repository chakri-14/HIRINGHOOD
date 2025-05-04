import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, Select, MenuItem, FormControl, InputLabel, CircularProgress, Grid, Card, CardContent, Link } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import styled from "styled-components";

// TYPES
interface Profile {
  profilePhoto: string;
  skills: string[];
}
interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}
interface Applicant {
  _id: string;
  resume: string;
  coverletter: string;
  status: string;
  applicant: {
    name: string;
    email: string;
    phone: string;
    education: Education[];
    experience: Experience[];
    profile: Profile;
  };
}

// STYLED COMPONENTS
const StyledCard = styled(Card)`
  margin: 16px 0;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Container = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: auto;
`;

const ResumeSection = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #555;
`;

const Value = styled.span`
  margin-left: 8px;
  color: #333;
`;

const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ApplicantPage = () => {
  const jobId = localStorage.getItem("jobId");
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [status, setStatus] = useState<string>(''); // To hold selected status

  const getApplicants = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/application/${jobId}/applicants`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log(res.data.job[0])
      setApplicants(res?.data?.job?.application || []);
      
    } catch (error: any) {
      alert(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    const newStatus = event.target.value as string;
    setStatus(newStatus);
    const token = localStorage.getItem("token")
    if (selectedApplicant) {
      try {
        // Mock API call to update status
        const res = await axios.put(`http://localhost:5000/api/v1/employee/status/${selectedApplicant._id}`, {
          status: newStatus,
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        console.log(`Applicant's status updated to: ${newStatus}`);
      } catch (error: any) {
        alert("Error updating status.");
      }
    }
  };

  const handleCloseDialog = () => {
    setSelectedApplicant(null);
    setStatus('');
  };

  useEffect(() => {
    getApplicants();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Applicants for Job ID: {jobId}
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : applicants.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No applicants found.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {applicants.map((applicantData) => (
            <Grid item xs={12} sm={6} md={4} key={applicantData._id}>
              <StyledCard onClick={() => setSelectedApplicant(applicantData)}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{applicantData.applicant.name}</Typography>
                  <Typography variant="body2" color="textSecondary"><strong>Email:</strong> {applicantData.applicant.email}</Typography>
                  <Typography variant="body2" color="textSecondary"><strong>Phone:</strong> {applicantData.applicant.phone}</Typography>
                  <Typography variant="body2" color="primary" sx={{ marginTop: 2 }}>
                    <strong>Status:</strong> {applicantData.status.toUpperCase()}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Applicant Detail Dialog */}
      <Dialog open={!!selectedApplicant} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        {selectedApplicant && (
          <>
            <DialogTitle>
              <DialogHeader>
                <Typography variant="h5">{selectedApplicant.applicant.name}'s Resume</Typography>
                <IconButton onClick={handleCloseDialog}>
                  <CloseIcon />
                </IconButton>
              </DialogHeader>
            </DialogTitle>
            <DialogContent dividers>
              {/* Profile Photo */}
              {selectedApplicant.applicant.profile?.profilePhoto && (
                <ResumeSection>
                  <img 
                    src={selectedApplicant.applicant.profile.profilePhoto} 
                    alt="Profile" 
                    style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '16px' }}
                  />
                </ResumeSection>
              )}

              {/* Basic Info */}
              <ResumeSection>
                <Label>Name:</Label> <Value>{selectedApplicant.applicant.name}</Value>
              </ResumeSection>
              <ResumeSection>
                <Label>Email:</Label> <Value>{selectedApplicant.applicant.email}</Value>
              </ResumeSection>
              <ResumeSection>
                <Label>Phone:</Label> <Value>{selectedApplicant.applicant.phone}</Value>
              </ResumeSection>
              <ResumeSection>
                <Label>Status:</Label> <Value>{selectedApplicant.status.toUpperCase()}</Value>
              </ResumeSection>

              {/* Status Dropdown - Only if not accepted */}
              {selectedApplicant.status !== 'accepted' && (
                <Box style={{ marginBottom: '20px' }}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={status}
                      onChange={handleStatusChange}
                      label="Status"
                      disabled={loading} // Disable dropdown while loading
                    >
                      <MenuItem value="accepted">Accept</MenuItem>
                      <MenuItem value="rejected">Reject</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}

              {/* Loading Spinner */}
              {loading && (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <CircularProgress />
                </Box>
              )}

              {/* Education and Experience */}
            


              {/* Resume Link */}
              {selectedApplicant.resume && (
                <ResumeSection>
                  <Label>Resume Link:</Label>
                  <Value>
                    <Link href={selectedApplicant.resume} target="_blank" rel="noopener noreferrer">
                      View Resume
                    </Link>
                  </Value>
                </ResumeSection>
              )}

              {/* Cover Letter */}
              {selectedApplicant.coverletter && (
                <ResumeSection>
                  <Label>Cover Letter:</Label>
                  <Typography variant="body2" style={{ marginTop: '8px' }}>
                    {selectedApplicant.coverletter}
                  </Typography>
                </ResumeSection>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ApplicantPage;
