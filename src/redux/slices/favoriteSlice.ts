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

// The OpenWeatherMap API was something that I found last minute to use as
// the foundation for this project demonstration for the ability to consume REST APIs.
// However, that being said, the API itself turned to be quite limited as to what you can fetch at the same time.
// Which lead to some... questionable wiring. Like fetching locations (lat/lon) and the weather detail separate.
// That is highly inefficient and would it be my/our backend that would have been fixed ASAP.
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
