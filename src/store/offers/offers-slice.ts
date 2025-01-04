import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Offer} from '../../types/offer.ts';
import {ExtendedOffer} from '../../types/extended-offer.ts';
import {Review} from '../../types/review.ts';
import {
  changeOfferStatus,
  fetchExtendedOffer,
  fetchFavorites,
  fetchNearbyOffers,
  fetchOffers,
  fetchReviews,
  postReview
} from '../api-actions.ts';
import {Location} from '../../types/location.ts';


export interface OffersState {
  offers: Offer[];
  offersLoading: boolean;
  offersDetails: Record<string, ExtendedOffer>;
  offerDetailsLoading: boolean;
  favorites: Offer[];
  favoritesLoading: boolean;
  offerId: string | null;
  nearbyOffers: Offer[];
  nearbyOffersLoading: boolean;
  reviews: Review[];
  reviewsLoading: boolean;
  reviewUploading: boolean;
  reviewSuccess: boolean;
  selectedLocation: Location | null;
}

const initialState: OffersState = {
  offers: [],
  offersLoading: true,
  offersDetails: {},
  offerDetailsLoading: false,
  offerId: null,
  nearbyOffers: [],
  nearbyOffersLoading: false,
  reviews: [],
  reviewsLoading: false,
  favorites: [],
  favoritesLoading: false,
  reviewUploading: false,
  reviewSuccess: false,
  selectedLocation: null,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOfferId: (state, action: PayloadAction<string>) => {
      state.offerId = action.payload;
    },
    setSelectedPoint: (state, action: PayloadAction<Location | null>) => {
      state.selectedLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.offersLoading = false;
    });
    builder.addCase(fetchOffers.pending, (state) => {
      state.offersLoading = true;
    });
    builder.addCase(fetchExtendedOffer.fulfilled, (state, action) => {
      state.offersDetails[action.payload.id] = action.payload;
      state.offerDetailsLoading = false;
    });
    builder.addCase(fetchExtendedOffer.pending, (state) => {
      state.offerDetailsLoading = true;
    });
    builder.addCase(fetchExtendedOffer.rejected, (state) => {
      state.offerDetailsLoading = false;
    });
    builder.addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
      state.nearbyOffersLoading = false;
    });
    builder.addCase(fetchNearbyOffers.pending, (state) => {
      state.nearbyOffersLoading = true;
    });
    builder.addCase(fetchNearbyOffers.rejected, (state) => {
      state.nearbyOffersLoading = false;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.reviewsLoading = false;
    });
    builder.addCase(fetchReviews.pending, (state) => {
      state.reviewsLoading = true;
    });
    builder.addCase(postReview.fulfilled, (state, action) => {
      state.reviews.unshift(action.payload);
      state.reviewUploading = false;
      state.reviewSuccess = true;
    });
    builder.addCase(postReview.pending, (state) => {
      state.reviewUploading = true;
      state.reviewSuccess = false;
    });
    builder.addCase(postReview.rejected, (state) => {
      state.reviewUploading = false;
      state.reviewSuccess = false;
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
      state.favoritesLoading = false;
    });
    builder.addCase(fetchFavorites.rejected, (state) => {
      state.favorites = [];
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

      if (action.payload.id in state.offersDetails){
        state.offersDetails[action.payload.id] = {...state.offersDetails[action.payload.id], ...action.payload};
      }

      if (action.payload.isFavorite){
        state.favorites.push(action.payload);
      } else{
        state.favorites = state.favorites.filter((favorite) => favorite.id !== action.payload.id);
      }
    });
  },
});

export const { setOfferId, setSelectedPoint } = offersSlice.actions;

export default offersSlice.reducer;
