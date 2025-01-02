import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {City} from '../types/city.ts';
import {Offer} from '../types/offer.ts';
import {SortType} from '../enums/sort-type.ts';
import {Location} from '../types/location.ts';
import {
  changeOfferStatus,
  checkAuthAction,
  fetchExtendedOffer, fetchFavorites,
  fetchNearbyOffers,
  fetchOffers,
  fetchReviews,
  postReview
} from './api-actions.ts';
import {ExtendedOffer} from '../types/extended-offer.ts';
import {ParisCity} from '../const.ts';
import {AuthorizationStatus} from '../enums/authorization-status.ts';
import {UserData} from '../types/user-data.ts';
import {Review} from '../types/review.ts';

interface SixCitiesState {
  offerId: string | null;
  city: City;
  offers: Offer[];
  offersDetails: Record<string, ExtendedOffer>;
  sortType: SortType;
  selectedLocation: Location | null;
  offerDetailsLoading: boolean;
  offersLoading: boolean;
  nearbyOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  error: string | null;
  nearbyOffers: Offer[];
  reviews: Review[];
  reviewsLoading: boolean;
  favorites: Offer[];
  favoritesLoading: boolean;
}

const sixCitiesInitialState: SixCitiesState = {
  offerId: null,
  city: ParisCity,
  offers: [],
  offersDetails: {},
  sortType: SortType.Popular,
  selectedLocation: null,
  offerDetailsLoading: false,
  offersLoading: true,
  nearbyOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  error: null,
  nearbyOffers: [],
  reviews: [],
  reviewsLoading: false,
  favorites: [],
  favoritesLoading: false,
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
    setSelectedPoint: (state, action: PayloadAction<Location | null>) => {
      state.selectedLocation = action.payload;
    },
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },
    setOfferId: (state, action: PayloadAction<string>) => { // Add this action
      state.offerId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.reviewsLoading = false;
    });
    builder.addCase(fetchReviews.pending, (state) => {
      state.reviewsLoading = true;
    });
    builder.addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
      state.nearbyOffersLoading = false;
    });
    builder.addCase(fetchNearbyOffers.pending, (state) => {
      state.nearbyOffersLoading = true;
    });
    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.offersLoading = false;
    });
    builder.addCase(fetchExtendedOffer.pending, (state) => {
      state.offerDetailsLoading = true;
    });
    builder.addCase(fetchExtendedOffer.fulfilled, (state, action) => {
      state.offersDetails[action.payload.id] = action.payload;
      state.offerDetailsLoading = false;
    });
    builder.addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
    builder.addCase(postReview.fulfilled, (state, action) => {
      state.reviews.push(action.payload);
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
      state.favoritesLoading = false;
    });
    builder.addCase(fetchFavorites.pending, (state) => {
      state.favoritesLoading = true;
    });
    builder.addCase(changeOfferStatus.fulfilled, (state, action) => {
      state.offers = state.offers.map((offer) => {
        if (offer.id === action.payload.id){
          return action.payload;
        }

        return offer;
      });

      if (action.payload.isFavorite){
        state.favorites.push(action.payload);
      } else{
        state.favorites = state.favorites.filter((favorite) => favorite.id !== action.payload.id);
      }
    });
  }
});


export const {setCity, setSortType, setAuthorizationStatus, setErrorMessage, setUserData, clearUserData, setSelectedPoint} = cityAndOffersSlice.actions;
export default cityAndOffersSlice.reducer;
