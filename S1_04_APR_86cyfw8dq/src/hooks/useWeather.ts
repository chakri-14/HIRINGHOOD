import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } from '../redux/weatherSlice';
import { getCurrentWeather, getForecast, getWeatherByCity } from '../api/weatherApi';

export const useWeather = () => {
  const dispatch = useDispatch();
  const weather = useSelector((state: any) => state.weather);

  const fetchWeatherByLocation = async () => {
    dispatch(fetchWeatherStart());
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const current = await getCurrentWeather(latitude, longitude);
        const forecast = await getForecast(latitude, longitude);
        dispatch(fetchWeatherSuccess({ current, forecast: forecast.list }));
      });
    } catch (error) {
      dispatch(fetchWeatherFailure('Failed to fetch weather data'));
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    dispatch(fetchWeatherStart());
    try {
      const current = await getWeatherByCity(city);
      const forecast = await getForecast(current.coord.lat, current.coord.lon);
      dispatch(fetchWeatherSuccess({ current, forecast: forecast.list }));
    } catch (error) {
      dispatch(fetchWeatherFailure('City not found'));
    }
  };

  return { weather, fetchWeatherByLocation, fetchWeatherByCity };
};