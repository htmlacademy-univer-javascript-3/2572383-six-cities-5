import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {City} from '../../types/city.ts';
import {SortType} from '../../enums/sort-type.ts';
import {ParisCity} from '../../const.ts';

export interface CityState {
  city: City;
  sortType: SortType;
}

const initialState: CityState = {
  city: ParisCity,
  sortType: SortType.Popular,
};

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
  }
});

export const { setCity, setSortType } = citySlice.actions;

export default citySlice.reducer;
