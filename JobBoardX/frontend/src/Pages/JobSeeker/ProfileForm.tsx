import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Grid, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import styled from "styled-components";

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

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  bio: string;
  skills: string;
  experience: Experience[];
  education: Education[];
}

// Styled components
const FormContainer = styled.div`
  padding: 32px;
  background: radial-gradient(circle at top left, #1a1a1a 0%, #2a2a2a 100%);
  font-family: 'Inter', 'Roboto', sans-serif;
  min-height: 100vh;
`;

const DialogStyled = styled(Dialog)`
  & .MuiDialog-paper {
    border-radius: 12px;
    background: rgba(45, 45, 45, 0.95);
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 16px rgba(20, 184, 166, 0.2);
    max-width: 960px;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform: translateY(0);
    &[open] {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const DialogTitleStyled = styled(DialogTitle)`
  font-size: 1.75rem;
  font-weight: 800;
  color: #ffffff;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(45deg, #14b8a6, #7c3aed);
  border-radius: 12px 12px 0 0;
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #14b8a6;
  margin: 0;
  letter-spacing: -0.5px;
`;

const TextFieldStyled = styled(TextField)`
  & .MuiInputBase-root {
    border-radius: 10px;
    background-color: #3a3a3a;
    color: #ffffff;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  & .MuiInputLabel-root {
    color: #d1d5db;
    font-weight: 500;
    font-size: 0.95rem;
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: #14b8a6;
  }
  & .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: #7c3aed;
  }
  & .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #14b8a6;
    box-shadow: 0 0 12px rgba(20, 184, 166, 0.5);
  }
  & .MuiInputBase-root:hover {
    transform: scale(1.02);
  }
`;

const AddButton = styled(IconButton)`
  color: #14b8a6;
  transition: transform 0.3s ease, background-color 0.3s ease;
  &:hover {
    background-color: rgba(20, 184, 166, 0.1);
    transform: rotate(90deg);
  }
`;

const DeleteButton = styled(Button)`
  border-color: #ef4444;
  color: #ef4444;
  border-radius: 10px;
  text-transform: none;
  font-weight: 600;
  padding: 8px 16px;
  transition: background-color 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
  &:hover {
    background-color: rgba(239, 68, 68, 0.1);
    border-color: #dc2626;
    color: #dc2626;
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

const ActionButton = styled(Button)`
  border-radius: 10px;
  text-transform: none;
  font-weight: 600;
  padding: 10px 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &.MuiButton-contained {
    background: linear-gradient(45deg, #14b8a6, #7c3aed);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
    &:hover {
      background: linear-gradient(45deg, #7c3aed, #14b8a6);
      box-shadow: 0 6px 16px rgba(20, 184, 166, 0.5);
      transform: translateY(-2px);
    }
  }
  &.MuiButton-outlined {
    border-color: #d1d5db;
    color: #d1d5db;
    &:hover {
      background-color: rgba(209, 213, 219, 0.1);
      border-color: #7c3aed;
      color: #7c3aed;
      transform: translateY(-2px);
    }
  }
`;

const CloseButton = styled(IconButton)`
  color: #ffffff;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const SectionDivider = styled(Box)`
  height: 2px;
  background: linear-gradient(to right, transparent, #14b8a6, transparent);
  margin: 24px 0;
`;

const ProfileForm = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    bio: '',
    skills: '',
    experience: [],
    education: []
  });

  const handleChange = (field: keyof ProfileData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...formData.experience];
    newExperience[index][field] = value;
    setFormData({ ...formData, experience: newExperience });
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData({ ...formData, education: newEducation });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { title: '', company: '', location: '', startDate: '', endDate: '', description: '' }]
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' }]
    });
  };

  const removeExperience = (index: number) => {
    const newExperience = [...formData.experience];
    newExperience.splice(index, 1);
    setFormData({ ...formData, experience: newExperience });
  };

  const removeEducation = (index: number) => {
    const newEducation = [...formData.education];
    newEducation.splice(index, 1);
    setFormData({ ...formData, education: newEducation });
  };

  const handleSubmit = () => {
    console.log("Final Data:", formData);
    setOpen(false);
  };

  return (
    <FormContainer>
      <ActionButton variant="contained" onClick={() => setOpen(true)}>
        Fill Profile Form
      </ActionButton>

      <DialogStyled open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitleStyled>
          Fill Your Profile
          <CloseButton aria-label="close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </CloseButton>
        </DialogTitleStyled>

        <DialogContent dividers sx={{ padding: '32px' }}>
          {/* Basic Details */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextFieldStyled label="Name" fullWidth value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldStyled label="Email" fullWidth value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldStyled label="Phone" fullWidth value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldStyled label="Bio" fullWidth value={formData.bio} onChange={(e) => handleChange('bio', e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextFieldStyled label="Skills (comma separated)" fullWidth value={formData.skills} onChange={(e) => handleChange('skills', e.target.value)} />
            </Grid>
          </Grid>

          <SectionDivider />

          {/* Experience */}
          <Box mt={2} p={2} borderRadius="8px" bgcolor="rgba(58, 58, 58, 0.3)" boxShadow="0 2px 8px rgba(0, 0, 0, 0.2)">
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
              <SectionTitle>Experience</SectionTitle>
              <AddButton onClick={addExperience}>
                <AddIcon />
              </AddButton>
            </Box>
            {formData.experience.map((exp, idx) => (
              <Grid container spacing={3} key={idx} sx={{ marginBottom: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextFieldStyled label="Title" fullWidth value={exp.title} onChange={(e) => handleExperienceChange(idx, 'title', e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextFieldStyled label="Company" fullWidth value={exp.company} onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextFieldStyled label="Location" fullWidth value={exp.location} onChange={(e) => handleExperienceChange(idx, 'location', e.target.value)} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextFieldStyled type="date" label="Start Date" InputLabelProps={{ shrink: true }} fullWidth value={exp.startDate} onChange={(e) => handleExperienceChange(idx, 'startDate', e.target.value)} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextFieldStyled type="date" label="End Date" InputLabelProps={{ shrink: true }} fullWidth value={exp.endDate || ''} onChange={(e) => handleExperienceChange(idx, 'endDate', e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextFieldStyled label="Description" multiline fullWidth rows={3} value={exp.description} onChange={(e) => handleExperienceChange(idx, 'description', e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <DeleteButton variant="outlined" onClick={() => removeExperience(idx)} startIcon={<DeleteIcon />}>
                    Remove Experience
                  </DeleteButton>
                </Grid>
              </Grid>
            ))}
          </Box>

          <SectionDivider />

          {/* Education */}
          <Box mt={2} p={2} borderRadius="8px" bgcolor="rgba(58, 58, 58, 0.3)" boxShadow="0 2px 8px rgba(0, 0, 0, 0.2)">
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
              <SectionTitle>Education</SectionTitle>
              <AddButton onClick={addEducation}>
                <AddIcon />
              </AddButton>
            </Box>
            {formData.education.map((edu, idx) => (
              <Grid container spacing={3} key={idx} sx={{ marginBottom: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextFieldStyled label="School" fullWidth value={edu.school} onChange={(e) => handleEducationChange(idx, 'school', e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextFieldStyled label="Degree" fullWidth value={edu.degree} onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextFieldStyled label="Field of Study" fullWidth value={edu.fieldOfStudy} onChange={(e) => handleEducationChange(idx, 'fieldOfStudy', e.target.value)} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextFieldStyled type="date" label="Start Date" InputLabelProps={{ shrink: true }} fullWidth value={edu.startDate} onChange={(e) => handleEducationChange(idx, 'startDate', e.target.value)} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextFieldStyled type="date" label="End Date" InputLabelProps={{ shrink: true }} fullWidth value={edu.endDate} onChange={(e) => handleEducationChange(idx, 'endDate', e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextFieldStyled label="Description" multiline fullWidth rows={3} value={edu.description} onChange={(e) => handleEducationChange(idx, 'description', e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <DeleteButton variant="outlined" onClick={() => removeEducation(idx)} startIcon={<DeleteIcon />}>
                    Remove Education
                  </DeleteButton>
                </Grid>
              </Grid>
            ))}
          </Box>
        </DialogContent>

        <DialogActions sx={{ padding: '24px 32px' }}>
          <ActionButton variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </ActionButton>
          <ActionButton variant="contained" onClick={handleSubmit}>
            Submit
          </ActionButton>
        </DialogActions>
      </DialogStyled>
    </FormContainer>
  );
};

export default ProfileForm;