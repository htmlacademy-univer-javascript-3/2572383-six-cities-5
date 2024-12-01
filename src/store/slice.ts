import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';
import {mockOffers} from '../mocks/offers.ts';
import {SortType} from '../enums/sort-type.ts';
import {Point} from '../types/point.ts';

interface CityAndOffersState {
  city: City;
  offers: Offer[];
  sortType: SortType;
  selectedPoint: Point | undefined;
}

const cityAndOffersInitialState: CityAndOffersState = {
  city: 'Paris',
  offers: mockOffers,
  sortType: SortType.Popular,
  selectedPoint: undefined,
};


const cityAndOffersSlice = createSlice({
  name: 'cityAndOffers',
  initialState: cityAndOffersInitialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    fillOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    setSelectedPoint: (state, action: PayloadAction<Point | undefined>) => {
      state.selectedPoint = action.payload;
    }
  }
});

export const {setCity, fillOffers, setSortType, setSelectedPoint} = cityAndOffersSlice.actions;
export default cityAndOffersSlice.reducer;
