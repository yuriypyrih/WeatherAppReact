import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice.ts';
import cityReducer from './slices/citySlice.ts';
import favoriteReducer from './slices/favoriteSlice.ts';
import locationReducer from './slices/locationSlice.ts';

// I am using Redux Toolkit and so here are some slices for this app. I spread out the functionality but
// ultimately did not utilized all the "isLoading" or even the "unitSystem" for changing the metric system.
// But here it would be the place to store/adjust them if needed.
export const store = configureStore({
  reducer: {
    app: appReducer,
    city: cityReducer,
    favorite: favoriteReducer,
    location: locationReducer,
  },
});

// Helper types for the redux store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
