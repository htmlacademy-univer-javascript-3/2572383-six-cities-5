import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';
import {mockOffers} from '../mocks/offers.ts';
import {SortType} from '../enums/sort-type.ts';
import {getReviewsAverageRating} from '../utils/get-reviews-average-rating.ts';
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
  sortType: SortType.POPULAR,
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
      if (state.sortType !== action.payload){
        state.sortType = action.payload;

        switch (state.sortType) {
          case SortType.POPULAR:
            state.offers = mockOffers;
            break;
          case SortType.HIGH_TO_LOW:
            state.offers = state.offers.sort((a, b) => b.price - a.price);
            break;
          case SortType.LOW_TO_HIGH:
            state.offers = state.offers.sort((a, b) => a.price - b.price);
            break;
          case SortType.TOP_RATED_FIRST:
            state.offers = state.offers
              .sort((a, b) => getReviewsAverageRating(b.reviews) - getReviewsAverageRating(a.reviews));
            break;
          default:
            state.offers = mockOffers;
            break;
        }
      }
    },
    setSelectedPoint: (state, action: PayloadAction<Point | undefined>) => {
      state.selectedPoint = action.payload;
    }
  }
});

export const {setCity, fillOffers, setSortType, setSelectedPoint} = cityAndOffersSlice.actions;
export default cityAndOffersSlice.reducer;
