import {faker} from '@faker-js/faker';
import {Offer} from '../types/offer';
import {OfferType} from '../enums/offer-type.ts';
import {AuthorizationStatus} from '../enums/authorization-status.ts';
import {OffersState} from '../store/offers/offers-slice.ts';
import {UserState} from '../store/user/user-slice.ts';
import {SortType} from '../enums/sort-type.ts';
import {ParisCity} from '../const.ts';
import {CityState} from '../store/city/city-slice.ts';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {State} from '../types/state.ts';
import {createAPI} from '../services/api.ts'; // Adjust the import path as needed

export const makeFakeOffer = (): Offer => ({
  id: faker.string.uuid(),
  title: faker.commerce.productName(),
  type: faker.datatype.boolean() ? OfferType.Apartment : OfferType.House,
  price: parseFloat(faker.commerce.price({min: 50, max: 1000, dec: 0})),
  city: {
    name: faker.location.city(),
    location: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      zoom: 12,
    },
  },
  location: {
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    zoom: 14,
  },
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: parseFloat((Math.random() * 5).toFixed(1)),
  previewImage: faker.internet.url(),
});


export const createMockOffersState = (overrides: Partial<OffersState> = {}): OffersState => ({
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
  ...overrides, // Apply overrides here
});

export const createMockUserState = (overrides: Partial<UserState> = {}): UserState => ({
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  error: null,
  ...overrides,
});

export const createMockCityState = (overrides: Partial<CityState> = {}): CityState => ({
  city: ParisCity,
  sortType: SortType.Popular,
  ...overrides,
});

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
