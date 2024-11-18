import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';
import {mockOffers} from '../mocks/offers.ts';

interface State {
  city: City;
  offers: Offer[];
}

const initialState: State = {
  city: 'Paris',
  offers: mockOffers,
};


const slice = createSlice({
  name: 'slice',
  initialState: initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    fillOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    }
  }
});

export const {setCity, fillOffers} = slice.actions;
export default slice.reducer;
