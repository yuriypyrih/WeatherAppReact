import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Units } from '../../types/units.ts';

type AppState = {
  unitSystem: Units;
};

const initialState: AppState = {
  unitSystem: 'metric',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUnitSyStem: (state, action: PayloadAction<'imperial' | 'metric'>) => {
      state.unitSystem = action.payload;
    },
  },
});

export const { setUnitSyStem } = appSlice.actions;

export default appSlice.reducer;
