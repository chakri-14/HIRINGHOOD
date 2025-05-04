import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import styled from 'styled-components';

type Company = {
  _id: string;
  name: string;
  description: string;
  location: string[];
  website: string;
};

// Styled Components
const Container = styled(Box)`
  padding: 3rem;
  background-color: #f4f6f9;
  border-radius: 8px;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(Typography)`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const SearchInput = styled(TextField)`
  margin-bottom: 2rem;
  width: 100%;
`;

const CompanyCard = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
  box-sizing: border-box;
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const Description = styled(Typography)`
  color: #555;
  margin-top: 1rem;
`;

const EditButton = styled(Button)`
  align-self: center;
  margin-left: 1rem;
  background-color: #3f51b5;
  color: white;
  &:hover {
    background-color: #303f9f;
  }
`;

const LoaderContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [updatedName, setUpdatedName] = useState<string>('');
  const [updatedDescription, setUpdatedDescription] = useState<string>('');
  const [updatedLocation, setUpdatedLocation] = useState<string>('');
  const [updatedWebsite, setUpdatedWebsite] = useState<string>('');

  // Fetch companies data from API
  const getCompanies = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/v1/company/get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompanies(response.data?.company || []);
    } catch (err) {
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter companies based on search query
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open edit dialog and set the current company data
  const handleEdit = (companyId: string) => {
    const company = companies.find((company) => company._id === companyId);
    if (company) {
      setCurrentCompany(company);
      setUpdatedName(company.name);
      setUpdatedDescription(company.description);
      setUpdatedLocation(company.location.join(', '));
      setUpdatedWebsite(company.website);
      setOpenDialog(true);
    }
  };

  // Handle update API call
  const handleUpdate = async () => {
    if (currentCompany) {
      const token = localStorage.getItem('token');
      const updatedData = {
        name: updatedName,
        description: updatedDescription,
        location: updatedLocation.split(',').map((loc) => loc.trim()),
        website: updatedWebsite,
      };

      try {
        const res=await axios.put(
          `http://localhost:5000/api/v1/company/update/${currentCompany._id}`,
          updatedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert(res?.data?.message)
        setOpenDialog(false);
        getCompanies();
      } catch (error:any) {
        alert(error?.response?.data?.message)
      }
    }
  };

  return (
    <Container>
      <Title variant="h4">Company List</Title>

      {/* Search bar */}
      <SearchInput
        label="Search Companies"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Display loading spinner while data is being fetched */}
      {loading ? (
        <LoaderContainer>
          <CircularProgress />
        </LoaderContainer>
      ) : (
        <List>
          {filteredCompanies.map((company) => (
            <ListItem key={company._id}>
              <CompanyCard>
                <CardContent>
                  <ListItemText
                    primary={company.name}
                    secondary={`Locations: ${company.location.join(', ')} | Website: ${company.website}`}
                  />
                  <Description variant="body2">{company.description || 'No description available'}</Description>
                </CardContent>
                <EditButton variant="contained" onClick={() => handleEdit(company._id)}>
                  Edit
                </EditButton>
              </CompanyCard>
            </ListItem>
          ))}
        </List>
      )}

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Company</DialogTitle>
        <DialogContent>
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Location(s)"
            variant="outlined"
            fullWidth
            value={updatedLocation}
            onChange={(e) => setUpdatedLocation(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Website"
            variant="outlined"
            fullWidth
            value={updatedWebsite}
            onChange={(e) => setUpdatedWebsite(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CompanyList;
