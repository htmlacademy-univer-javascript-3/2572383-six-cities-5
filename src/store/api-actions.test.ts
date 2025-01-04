import {describe, it, expect, beforeEach} from 'vitest';
import {Action, ThunkMiddleware} from '@reduxjs/toolkit';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import axios, {AxiosInstance} from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {ApiRoute} from '../enums/api-route';
import {
  fetchOffers,
  checkAuthAction,
  fetchFavorites,
  changeOfferStatus,
} from './api-actions';
import {offersSlice} from './offers/offers-slice';
import {userSlice} from './user/user-slice';
import {citySlice} from './city/city-slice';
import {AuthorizationStatus} from '../enums/authorization-status';
import {RootState} from './index.ts';


describe('Async actions', () => {
  let mockAxios: MockAdapter;
  let store: EnhancedStore<RootState, Action, [ThunkMiddleware<RootState, Action, AxiosInstance>]>;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mockAxios = new MockAdapter(axiosInstance);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store = configureStore({
      reducer: {
        offers: offersSlice.reducer,
        user: userSlice.reducer,
        city: citySlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: axiosInstance,
          },
        }),
    });
  });

  it('fetchOffers should dispatch fulfilled on success', async () => {
    const mockOffers = [
      { id: '1', title: 'Offer 1', /* ...other fields*/ },
      { id: '2', title: 'Offer 2', /* ...other fields*/ },
    ];

    // Mock GET /hotels => 200 with `mockOffers`
    mockAxios.onGet(ApiRoute.Offers).reply(200, mockOffers);

    // Dispatch the thunk
    await store.dispatch(fetchOffers());

    const state = store.getState().offers;
    expect(state.offersLoading).toBe(false);
    expect(state.offers).toEqual(mockOffers);
  });

  it('fetchOffers should keep offersLoading = true on pending', () => {
    const action = fetchOffers.pending('', undefined);
    const nextState = offersSlice.reducer(undefined, action);
    expect(nextState.offersLoading).toBe(true);
  });

  it('checkAuthAction should dispatch setAuthorizationStatus(Auth) if request is successful', async () => {
    const mockUserData = {
      name: 'John',
      avatarUrl: 'some-url',
      email: 'test@test.com',
      token: 'secret',
      isPro: false,
    };

    mockAxios.onGet(ApiRoute.Login).reply(200, mockUserData);

    await store.dispatch(checkAuthAction());

    const {authorizationStatus, userData} = store.getState().user;
    expect(authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(userData).toEqual(mockUserData);
  });

  it('checkAuthAction should dispatch setAuthorizationStatus(NoAuth) on error', async () => {
    mockAxios.onGet(ApiRoute.Login).reply(401, {message: 'Unauthorized'});

    await store.dispatch(checkAuthAction());

    const {authorizationStatus, userData} = store.getState().user;
    expect(authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(userData).toBeNull();
  });

  it('fetchFavorites should store favorites on success', async () => {
    const mockFavorites = [
      {id: '10', title: 'Fav Offer', isFavorite: true},
    ];
    mockAxios.onGet(ApiRoute.Favorite).reply(200, mockFavorites);

    await store.dispatch(fetchFavorites());

    const state = store.getState().offers;
    expect(state.favorites).toEqual(mockFavorites);
    expect(state.favoritesLoading).toBe(false);
  });

  it('changeOfferStatus should POST to /favorite/:offerId/:status and update store', async () => {
    const updatedOffer = {id: '5', isFavorite: true, title: 'Offer 5'};
    mockAxios.onPost(`${ApiRoute.Favorite}/5/1`).reply(200, updatedOffer);

    await store.dispatch(changeOfferStatus({offerId: '5', isFavorite: true}));

    const favorites = store.getState().offers.favorites;
    expect(favorites).toContainEqual(updatedOffer);
  });
});
