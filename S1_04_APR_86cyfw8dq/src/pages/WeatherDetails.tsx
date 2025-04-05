import { useSelector } from 'react-redux';
import { Typography, useTheme, Paper } from '@mui/material';
import WeatherCard from '../components/WeatherCard';
import styled from '@emotion/styled';
import { RootState } from '../redux/store';

const DetailsContainer = styled('div')`
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`;

const MessageBox = styled(Paper)<{ $darkmode?: boolean }>`
  background-color: ${(props) => (props.$darkmode ? '#1e293b' : '#f0f4f8')};
  color: ${(props) => (props.$darkmode ? '#e2e8f0' : '#0f172a')};
  border-left: 6px solid ${(props) => (props.$darkmode ? '#38bdf8' : '#1976d2')};
  padding: 24px 32px;
  border-radius: 12px;
  max-width: 600px;
  text-align: center;
  box-shadow: ${(props) =>
    props.$darkmode
      ? '0 4px 20px rgba(255, 255, 255, 0.05)'
      : '0 4px 20px rgba(0, 0, 0, 0.1)'};
`;

const WeatherDetails = () => {
  const theme = useTheme();
  const weather = useSelector((state: RootState) => state.weather.current);

  return (
    <DetailsContainer>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        sx={{ fontWeight: 700 }}
      >
        🌤️ Weather Details
      </Typography>

      {weather ? (
        <WeatherCard weather={weather} />
      ) : (
        <MessageBox elevation={3} $darkmode={theme.palette.mode === 'dark'}>
          <Typography variant="h6" gutterBottom>
            Oops! No data found.
          </Typography>
          <Typography variant="body1">
            Please return to the home page and search for a city to see the weather details.
          </Typography>
        </MessageBox>
      )}
    </DetailsContainer>
  );
};

export default WeatherDetails;
