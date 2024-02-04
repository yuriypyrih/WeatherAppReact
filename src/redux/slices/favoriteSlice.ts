import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from 'types/city';
import { RootState } from '../store.ts';
import { getWeatherRequest } from '../../http/requests/weather.ts';
import { getLocation } from '../../http/requests/location.ts';
import axios from 'axios';
import { extractWeatherData } from './citySlice.ts';

type FavoriteState = {
  favouriteCities: City[];
  isLoading: boolean;
};

const initialState: FavoriteState = {
  favouriteCities: [],
  isLoading: false,
};
export const fetchFavorite = createAsyncThunk(
  'favorite/fetchFavorite',
  async (args: { lat: number; lon: number }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const weatherRequest = getWeatherRequest(args.lat, args.lon, state.app.unitSystem);
      const locationRequest = getLocation(args);

      const [weatherResponse, locationResponse] = await Promise.all([weatherRequest, locationRequest]);

      const weatherData = extractWeatherData(weatherResponse.data);
      return { location: locationResponse.data[0], weather: weatherData, favorite: true };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clean: (state) => {
      state.favouriteCities = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavorite.fulfilled, (state, action: PayloadAction<City>) => {
      state.isLoading = false;
      state.favouriteCities = [...state.favouriteCities, action.payload];
    });
  },
});

export const { setLoading, clean } = favoriteSlice.actions;

export default favoriteSlice.reducer;
