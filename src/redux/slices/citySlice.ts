import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { City } from '../../types/city.ts';
import { Weather } from '../../types/weather.ts';
import { getWeatherRequest } from '../../http/requests/weather.ts';
import { RootState } from '../store.ts';
import { getLocation } from '../../http/requests/location.ts';
import { getDummyArray } from '../../utils/dummy.ts';

type CityState = {
  selectedCity: City | undefined;
  isLoading: boolean;
  isError: boolean;
};

const initialState: CityState = {
  selectedCity: undefined,
  isLoading: false,
  isError: false,
};

export const extractWeatherData = (data: { current: any }): Weather => ({
  temp: data.current.temp,
  humidity: data.current.humidity,
  windSpeed: data.current.wind_speed,
  icon: data.current.weather?.length > 0 ? data.current.weather[0].icon : null,
  description: data.current.weather?.length > 0 ? data.current.weather[0].description : 'N/A',
});

export const fetchWeather = createAsyncThunk(
  'city/fetchWeather',
  async (args: { lat: number; lon: number }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const weatherRequest = getWeatherRequest(args.lat, args.lon, state.app.unitSystem);
      const locationRequest = getLocation(args);

      const [weatherResponse, locationResponse] = await Promise.all([weatherRequest, locationRequest]);

      const weatherData = extractWeatherData(weatherResponse.data);

      const arrayOfCoord: number[] = getDummyArray();

      return {
        location: locationResponse.data[0],
        weather: weatherData,
        favorite: arrayOfCoord.includes(args.lat) || arrayOfCoord.includes(args.lon),
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setFavorite: (state, action: PayloadAction<boolean>) => {
      if (state.selectedCity) {
        state.selectedCity.favorite = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<City>) => {
        state.isLoading = false;
        state.isError = false;
        state.selectedCity = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setLoading, setFavorite } = citySlice.actions;

export default citySlice.reducer;
