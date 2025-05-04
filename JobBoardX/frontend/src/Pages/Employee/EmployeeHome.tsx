import { Box, Button, Typography, Divider, AppBar, Toolbar, IconButton, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const EmployeeHome = () => {
  const navigate = useNavigate();

  const handleAddCompany = () => {
    navigate("/employee/company");
  };

  const handleAddJob = () => {
    navigate("/employee/job");
  };

  const handleProfile = () => {
    navigate('/employee/profile');
  };

  const handleApplicants = () => {
    navigate('/employee/applicants');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box>
      {/* Navigation Bar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#1e1e1e',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            sx={{
              color: '#a1a1aa',
              mr: 2,
              '&:hover': {
                color: '#7c3aed',
              },
            }}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              color: '#ffffff',
              fontWeight: 600,
              letterSpacing: '-0.5px',
            }}
          >
            Employee Dashboard
          </Typography>
          <Button
            sx={{
              color: '#a1a1aa',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                color: '#7c3aed',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
              },
            }}
            onClick={handleAddCompany}
          >
            Company
          </Button>
          <Button
            sx={{
              color: '#a1a1aa',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                color: '#7c3aed',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
              },
            }}
            onClick={handleAddJob}
          >
            Job
          </Button>
          <Button
            sx={{
              color: '#a1a1aa',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                color: '#7c3aed',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
              },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 4,
          backgroundColor: '#121212',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.5px',
          }}
        >
          Welcome to the Employee Dashboard
        </Typography>

        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: '#a1a1aa',
            textAlign: 'center',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}
        >
          As an employee, you can manage your companies, post jobs, view applicants, and update your profile. 
          Use the options below to navigate through the platform.
        </Typography>

        <Divider
          sx={{
            marginY: 2,
            backgroundColor: '#444444',
            width: '100%',
            maxWidth: '600px',
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: '#ffffff',
            }}
          >
            Your Current Companies:
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#a1a1aa',
              mb: 1,
            }}
          >
            - Company XYZ: Active, 5 job openings
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#a1a1aa',
              mb: 1,
            }}
          >
            - Company ABC: Active, 3 job openings
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#a1a1aa',
              mb: 3,
              textAlign: 'center',
              maxWidth: '500px',
            }}
          >
            To manage these companies or add a new one, click the button below.
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#7c3aed',
            borderRadius: '6px',
            textTransform: 'none',
            padding: '10px 24px',
            fontWeight: 600,
            mb: 2,
            width: '200px',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#6d28d9',
              boxShadow: '0 3px 10px rgba(124, 58, 237, 0.3)',
              transform: 'translateY(-1px)',
            },
          }}
          onClick={handleAddCompany}
        >
          Add Company
        </Button>

        <Button
          variant="outlined"
          sx={{
            borderColor: '#a1a1aa',
            color: '#a1a1aa',
            borderRadius: '6px',
            textTransform: 'none',
            padding: '10px 24px',
            width: '200px',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: '#7c3aed',
              color: '#7c3aed',
              backgroundColor: 'rgba(124, 58, 237, 0.1)',
            },
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Container>
    </Box>
  );
};

export default EmployeeHome;