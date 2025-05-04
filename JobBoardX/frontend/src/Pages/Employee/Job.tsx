import { Button, Box, Typography, Modal, Grid, Paper } from "@mui/material";
import { useState } from "react";
import AddJob from "./AddJob";
import JobListing from "./JobList";
import styled from "styled-components";

// Styled components
const JobContainer = styled(Box)`
  padding: 32px;
  background-color: #121212;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled(Typography)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;
`;

const JobButton = styled(Button)`
  background-color: #7c3aed;
  color: #ffffff;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  text-transform: none;
  box-shadow: 0 3px 10px rgba(124, 58, 237, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background-color: #6d28d9;
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
    transform: translateY(-2px);
  }
`;

const AddJobModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalPaper = styled(Paper)`
  padding: 0;
  width: 450px;
  border-radius: 10px;
  background-color: #1e1e1e;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
`;

const JobSection = styled(Grid)`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const Job = () => {
  const [openAddJob, setOpenAddJob] = useState(false);

  const handleAddJob = () => {
    setOpenAddJob(true);
  };

  const handleCloseAddJob = () => {
    setOpenAddJob(false);
  };

  return (
    <JobContainer>
      <Header>
        <Title>Job Portal</Title>
        <JobButton onClick={handleAddJob}>Post a Job</JobButton>
      </Header>

      {/* Add Job Modal */}
      <AddJobModal open={openAddJob} onClose={handleCloseAddJob}>
        <ModalPaper>
          <AddJob openAddJob={openAddJob} setOpenAddJob={setOpenAddJob} />
        </ModalPaper>
      </AddJobModal>

      {/* Job Listings */}
      <JobSection container>
        <JobListing />
      </JobSection>
    </JobContainer>
  );
};

export default Job;