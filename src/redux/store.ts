import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice.ts';
import cityReducer from './slices/citySlice.ts';
import favoriteReducer from './slices/favoriteSlice.ts';
import locationReducer from './slices/locationSlice.ts';

export const store = configureStore({
  reducer: {
    app: appReducer,
    city: cityReducer,
    favorite: favoriteReducer,
    location: locationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
