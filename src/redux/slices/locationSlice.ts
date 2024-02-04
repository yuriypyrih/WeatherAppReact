import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from 'types/location.ts';
import { getLocations } from 'http/requests/location.ts';
import axios from 'axios';

type WeatherState = {
  locations: Location[];
  isLoading: boolean;
  isError: boolean;
};

const initialState: WeatherState = {
  locations: [],
  isLoading: false,
  isError: false,
};

export const fetchLocations = createAsyncThunk(
  'location/fetchLocations',
  async (search: string, { rejectWithValue }) => {
    try {
      const response = await getLocations(search);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An unknown error occurred');
      }
    }
  },
);

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchLocations.fulfilled, (state, action: PayloadAction<Location[]>) => {
        state.isLoading = false;
        state.isError = false;
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setLoading } = locationSlice.actions;

export default locationSlice.reducer;
