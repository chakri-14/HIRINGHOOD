import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Fade,
} from '@mui/material';

interface Company {
  _id: string;
  name: string;
}

interface Job {
  _id: string;
  title: string;
  location: string;
  company: Company;
}

interface Application {
  _id: string;
  resume: string;
  coverletter: string;
  job: Job;
  applicant: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ApplicationPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApps, setFilteredApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get('http://localhost:5000/api/v1/user/applications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplications(response.data.data);
        setFilteredApps(response.data.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    let filtered = applications;
    if (filterStatus !== 'All') {
      filtered = filtered.filter(app => app.status.toLowerCase() === filterStatus.toLowerCase());
    }
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job.company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredApps(filtered);
  }, [searchTerm, filterStatus, applications]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={50} />
      </Box>
    );
  }

  return (
    <Box p={{ xs: 2, sm: 4 }} maxWidth="lg" mx="auto">
      <Typography variant="h4" align="center" fontWeight="bold" mb={4}>
        Your Applications
      </Typography>

      {/* Search and Filter */}
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="center"
        alignItems="center"
        gap={2}
        mb={5}
      >
        <TextField
          label="Search by Job or Company"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />

        <FormControl fullWidth sx={{ minWidth: 180 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            label="Status"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredApps.length === 0 ? (
        <Typography align="center" mt={6} variant="h6" color="text.secondary">
          No applications found.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {filteredApps.map((application, idx) => {
            const status = application.status.toLowerCase();
            const statusColorMap = {
              accepted: { bg: '#E0F7FA', border: '#00ACC1' },
              pending: { bg: '#FFF8E1', border: '#FFB300' },
              rejected: { bg: '#FFEBEE', border: '#E53935' },
            };
            const colors = statusColorMap[status as keyof typeof statusColorMap];

            return (
              <Grid item xs={12} sm={6} md={4} key={application._id}>
                <Fade in timeout={500 + idx * 100}>
                  <Card
                    sx={{
                      height: '100%',
                      backgroundColor: colors.bg,
                      border: `2px solid ${colors.border}`,
                      borderRadius: 4,
                      boxShadow: 5,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 8,
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary.dark">
                        {application.job.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        📍 Location: {application.job.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        🏢 Company: {application.job.company.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        📌 Status: <strong>{application.status.toUpperCase()}</strong>
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block" mt={2}>
                        🗓️ Applied On: {new Date(application.createdAt).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default ApplicationPage;
