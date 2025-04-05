import { useEffect } from 'react';
import { useWeather } from '../hooks/useWeather';
import { Typography, CircularProgress } from '@mui/material';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ForecastList from '../components/ForecastList';
import styled from '@emotion/styled';

const WeatherContainer = styled.div`
  padding: 32px 16px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Home = () => {
  const { weather, fetchWeatherByLocation } = useWeather();

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  return (
    <WeatherContainer>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        🌤️ Weather Forecast
      </Typography>

      <Section>
        <SearchBar />
      </Section>

      {weather.loading && (
        <Section>
          <CircularProgress />
          <Typography variant="body1">Fetching weather...</Typography>
        </Section>
      )}

      {weather.error && (
        <Section>
          <Typography color="error" variant="body1">
            {weather.error}
          </Typography>
        </Section>
      )}

      {weather.current && (
        <Section>
          <WeatherCard weather={weather.current} />
        </Section>
      )}

      {weather.forecast?.length > 0 && (
        <Section>
          <ForecastList forecast={weather.forecast} />
        </Section>
      )}
    </WeatherContainer>
  );
};

export default Home;
