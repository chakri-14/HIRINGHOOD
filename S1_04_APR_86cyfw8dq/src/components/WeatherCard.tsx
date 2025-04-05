import { Card, CardContent, Typography, useTheme, styled } from '@mui/material';
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiFog,
} from 'react-icons/wi';

const WeatherCardStyled = styled(Card)(({ theme }) => ({
  marginTop: 20,
  padding: 16,
  backgroundColor: theme.palette.mode === 'dark' ? '#2c2c2c' : '#fafafa',
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[3],
  borderRadius: '16px',
}));

interface WeatherCardProps {
  weather: any;
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <WiDaySunny size={60} />;
    case 'rain':
      return <WiRain size={60} />;
    case 'clouds':
      return <WiCloudy size={60} />;
    case 'snow':
      return <WiSnow size={60} />;
    case 'fog':
    case 'mist':
    case 'haze':
      return <WiFog size={60} />;
    default:
      return <WiCloudy size={60} />;
  }
};

const WeatherCard = ({ weather }: WeatherCardProps) => {
  const theme = useTheme();

  return (
    <WeatherCardStyled>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {weather.name}
        </Typography>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '10px',
          }}
        >
          {getWeatherIcon(weather.weather[0].main)}
          <Typography variant="h4">{Math.round(weather.main.temp)}°C</Typography>
        </div>

        <Typography variant="subtitle1" gutterBottom>
          {weather.weather[0].description}
        </Typography>

        <Typography variant="body2">
          <strong>Feels Like:</strong> {Math.round(weather.main.feels_like)}°C
        </Typography>
        <Typography variant="body2">
          <strong>Humidity:</strong> {weather.main.humidity}%
        </Typography>
        <Typography variant="body2">
          <strong>Wind:</strong> {weather.wind.speed} m/s
        </Typography>
        <Typography variant="body2">
          <strong>Sunrise:</strong> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
        </Typography>
        <Typography variant="body2">
          <strong>Sunset:</strong> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
        </Typography>
      </CardContent>
    </WeatherCardStyled>
  );
};

export default WeatherCard;
