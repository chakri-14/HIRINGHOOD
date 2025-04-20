import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Unauthorized = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box textAlign="center" mt={10} sx={{ color: theme.palette.text.primary }}>
      <Typography variant="h4">Unauthorized</Typography>
      <Typography sx={{ color: theme.palette.text.secondary }}>You don’t have access to this page.</Typography>
      <Button variant="contained" onClick={() => navigate('/login')} sx={{ mt: 2 }}>
        Back to Login
      </Button>
    </Box>
  );
};

export default Unauthorized;