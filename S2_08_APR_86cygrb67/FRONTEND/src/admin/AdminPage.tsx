import { AppBar, Toolbar, Typography, Box, Container, Button, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../theme';
import { useState } from 'react';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <ThemeProvider theme={getTheme(darkMode ? 'dark' : 'light')}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Button sx={{ color: theme.palette.text.primary }} onClick={() => handleNavigation('/admin/users')}>
              Users
            </Button>
            <Button sx={{ color: theme.palette.text.primary }} onClick={() => handleNavigation('/admin/posts')}>
              Posts
            </Button>
            <Button sx={{ color: theme.palette.text.primary }} onClick={() => handleNavigation('/admin/categories')}>
              Categories
            </Button>
          </Box>
          <Box>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            <Button sx={{ color: theme.palette.text.primary }} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
          Welcome to the Admin Page
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default AdminPage;