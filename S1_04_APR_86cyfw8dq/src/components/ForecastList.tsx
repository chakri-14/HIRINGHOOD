import { Card, CardContent, Typography, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiFog,
} from 'react-icons/wi';

const ForecastContainer = styled.div`
  margin-top: 30px;
  padding: 10px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

interface StyledCardProps {
  darkmode: boolean;
}

const StyledForecastCard = styled(Card)<StyledCardProps>`
  flex: 1 1 150px;
  max-width: 180px;
  min-width: 140px;
  border-radius: 16px;
  text-align: center;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: ${({ darkmode }) => (darkmode ? '#1e1e1e' : '#f0f2f5')};
  color: ${({ darkmode }) => (darkmode ? '#ffffff' : '#000000')};

  &:hover {
    transform: translateY(-5px);
  }
`;

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <WiDaySunny size={40} color="#f9d71c" />;
    case 'rain':
      return <WiRain size={40} color="#4a90e2" />;
    case 'clouds':
      return <WiCloudy size={40} color="#7f8c8d" />;
    case 'snow':
      return <WiSnow size={40} color="#00bcd4" />;
    case 'fog':
    case 'mist':
    case 'haze':
      return <WiFog size={40} color="#95a5a6" />;
    default:
      return <WiCloudy size={40} color="#7f8c8d" />;
  }
};

interface ForecastItem {
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

interface ForecastListProps {
  forecast: ForecastItem[];
}

const ForecastList = ({ forecast }: ForecastListProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const dailyForecast = forecast
    .filter((item) => new Date(item.dt_txt).getHours() === 12)
    .slice(0, 7);

  return (
    <ForecastContainer>
      <Typography variant="h6" gutterBottom align="center">
        7-Day Forecast
      </Typography>
      <CardWrapper>
        {dailyForecast.map((day, index) => (
          <StyledForecastCard key={index} darkmode={isDarkMode}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                {new Date(day.dt_txt).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </Typography>
              {getWeatherIcon(day.weather[0].main)}
              <Typography>Temp: {Math.round(day.main.temp)}°C</Typography>
              <Typography>Humidity: {day.main.humidity}%</Typography>
              <Typography>Wind: {day.wind.speed} m/s</Typography>
            </CardContent>
          </StyledForecastCard>
        ))}
      </CardWrapper>
    </ForecastContainer>
  );
};

export default ForecastList;
