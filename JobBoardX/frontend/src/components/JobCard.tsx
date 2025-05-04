import { Box, Typography, Card, Avatar, Divider, Grid, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import WebIcon from '@mui/icons-material/Web';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  padding: theme.spacing(2),
}));

// Define company type
type Company = {
  name: string;
  location: string[]; // Locations is now an array
  description: string;
  website: string;
  logoUrl: string;
  iconUrl: string; // Add a field for company icon
};

type CompanyProps = Company;

const JobCard: React.FC<CompanyProps> = ({ name, location, description, website, logoUrl, iconUrl }) => {
  // Function to assign different colors to each location
  const locationColors = ['#1976D2', '#0288D1', '#00796B', '#388E3C', '#F57C00'];

  return (
    <StyledCard>
      <Grid container spacing={2} alignItems="center">
        <Grid  size={3}>
          <Avatar src={logoUrl || "https://via.placeholder.com/56"} alt={name} sx={{ width: 56, height: 56 }} />
        </Grid>
        <Grid  size={9}>
          <Typography variant="h6" fontWeight="bold">
            {name}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            {iconUrl && <Avatar src={iconUrl} alt={name} sx={{ width: 24, height: 24 }} />}
            <BusinessIcon fontSize="small" sx={{ color: 'gray' }} />
            <Typography variant="body2" color="text.secondary">
              {name}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        <Grid  size={6}>
          <Box display="flex" alignItems="center" gap={1}>
            <WorkIcon fontSize="small" sx={{ color: 'gray' }} />
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Grid>
        <Grid size={6}>
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOnIcon fontSize="small" sx={{ color: 'gray' }} />
            <Typography variant="body2" color="text.secondary">
              {location.length > 0 ? (
                location.map((loc, index) => (
                  <Box key={index} display="inline-block" mr={1}>
                    <Typography
                      variant="body2"
                      color={locationColors[index % locationColors.length]} // Different color for each location
                    >
                      {loc}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No locations available
                </Typography>
              )}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Website Link Section */}
      <Box display="flex" alignItems="center" gap={1} mt={2}>
        <WebIcon fontSize="small" sx={{ color: 'gray' }} />
        <Link href={website} target="_blank" rel="noopener" color="primary" variant="body2">
          Visit Website
        </Link>
      </Box>
    </StyledCard>
  );
};

export default JobCard;
