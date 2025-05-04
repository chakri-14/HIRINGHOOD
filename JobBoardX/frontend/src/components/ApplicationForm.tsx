import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface ApplicationFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    width: 600px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 16px;
  & .MuiOutlinedInput-root {
    border-radius: 8px;
    padding: 10px;
  }
  & .MuiInputLabel-root {
    font-weight: bold;
  }
`;

const StyledButton = styled(Button)`
  &.MuiButton-root {
    margin: 10px;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: bold;
    text-transform: none;
  }

  &.MuiButton-containedPrimary {
    background-color: #00796b;
    color: white;
    &:hover {
      background-color: #004d40;
    }
  }

  &.MuiButton-containedSecondary {
    background-color: #e0e0e0;
    color: #555;
    &:hover {
      background-color: #bdbdbd;
    }
  }
`;

const ApplicationForm: React.FC<ApplicationFormProps> = ({ open, setOpen }) => {
  const { id } = useParams(); 
  const [resume, setResume] = useState('');
  const [coverletter, setCoverletter] = useState('');
  const [error, setError] = useState('');  // For capturing error messages
  const [isSubmitting, setIsSubmitting] = useState(false);  // To track form submission status

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = async () => {
    if (!resume || !coverletter) {
      setError('Please fill all the fields');
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      setError('Authentication token not found. Please log in again.');
      return;
    }
  
    setIsSubmitting(true);
  
    // Log the data being sent
    console.log('Sending data:', { resume, coverletter });
    console.log(id)
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/application/apply/${id}`,
        { resume, coverletter },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Cache-Control": "no-store",
          },
        }
      );
  
      if (response.data.success) {
        setOpen(false);
        alert('Application submitted successfully!');
      } else {
        setError(response.data.message);
      }
    } catch (error:any) {
      setError('Error submitting application. Please try again later.');
      console.error('Error details:', error.response ? error.response.data.message : error);
      alert(error.response.data.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>
        Application Form
      </DialogTitle>
      <StyledDialogContent>
        {error && <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>}  {/* Display error message */}

        <StyledTextField
          label="Resume"
          variant="outlined"
          fullWidth
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          disabled={isSubmitting}  // Disable input during submission
        />
        <StyledTextField
          label="Cover Letter"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={coverletter}
          onChange={(e) => setCoverletter(e.target.value)}
          disabled={isSubmitting}  // Disable input during submission
        />
      </StyledDialogContent>
      <DialogActions>
        <StyledButton onClick={handleClose} color="secondary" variant="contained" disabled={isSubmitting}>
          Cancel
        </StyledButton>
        <StyledButton onClick={handleApply} color="primary" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? 'Applying...' : 'Apply'}
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default ApplicationForm;
