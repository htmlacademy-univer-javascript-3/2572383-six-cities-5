import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';
import {SortType} from '../enums/sort-type.ts';
import {Location} from '../types/location.ts';
import {fetchExtendedOffer, fetchOffers} from './api-actions.ts';
import {ExtendedOffer} from '../types/extended-offer.ts';
import {ParisCity} from '../const.ts';
import {AuthorizationStatus} from '../enums/authorization-status.ts';

interface SixCitiesState {
  city: City;
  offers: Offer[];
  offersDetails: Record<string, ExtendedOffer>;
  sortType: SortType;
  selectedPoint: Location | undefined;
  offerDetailsLoading: boolean;
  offersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
}

const sixCitiesInitialState: SixCitiesState = {
  city: ParisCity,
  offers: [],
  offersDetails: {},
  sortType: SortType.Popular,
  selectedPoint: undefined,
  offerDetailsLoading: false,
  offersLoading: true,
  authorizationStatus: AuthorizationStatus.Unknown
};


const cityAndOffersSlice = createSlice({
  name: 'cityAndOffers',
  initialState: sixCitiesInitialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    setSelectedPoint: (state, action: PayloadAction<Location | undefined>) => {
      state.selectedPoint = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.offersLoading = false;
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    builder.addCase(fetchExtendedOffer.pending, (state, _) => {
      state.offerDetailsLoading = true;
    });
    builder.addCase(fetchExtendedOffer.fulfilled, (state, action) => {
      state.offersDetails[action.payload.id] = action.payload;
      state.offerDetailsLoading = false;
    });
  }
});


export const {setCity, setSortType, setSelectedPoint} = cityAndOffersSlice.actions;
export default cityAndOffersSlice.reducer;
