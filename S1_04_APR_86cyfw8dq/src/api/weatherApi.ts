import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export const getCurrentWeather = async (lat: number, lon: number) => {
  const response = await api.get('/weather', {
    params: {
      lat,
      lon,
      appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
      units: 'metric',
    },
  });
  return response.data;
};

export const getForecast = async (lat: number, lon: number) => {
  const response = await api.get('/forecast', {
    params: {
      lat,
      lon,
      appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
      units: 'metric',
    },
  });
  return response.data;
};

export const getWeatherByCity = async (city: string) => {
  const response = await api.get('/weather', {
    params: {
      q: city,
      appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
      units: 'metric',
    },
  });
  return response.data;
};