import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
  current: any;
  forecast: any[];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  current: null,
  forecast: [],
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherStart(state) {
      state.loading = true;
    },
    fetchWeatherSuccess(state, action: PayloadAction<{ current: any; forecast: any[] }>) {
      state.current = action.payload.current;
      state.forecast = action.payload.forecast;
      state.loading = false;
      state.error = null;
    },
    fetchWeatherFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } = weatherSlice.actions;
export default weatherSlice.reducer;