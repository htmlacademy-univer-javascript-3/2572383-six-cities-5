import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {Offer} from '../types/offer.ts';
import {ApiRoute} from '../enums/api-route.ts';
import {ExtendedOffer} from '../types/extended-offer.ts';
import {AuthData} from '../types/auth-data.ts';
import {AppDispatch} from '../types/state.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {UserData} from '../types/user-data.ts';
import {AuthorizationStatus} from '../enums/authorization-status.ts';
import {TIMEOUT_SHOW_ERROR} from '../const.ts';
import {Review} from '../types/review.ts';
import {clearUserData, setAuthorizationStatus, setErrorMessage, setUserData} from './user/user-slice.ts';

export const fetchOffers = createAsyncThunk<Offer[], undefined, {
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_, {extra: api}) => {
    const {data} = await api.get<Offer[]>(ApiRoute.Offers);
    return data;
  },
);

export const fetchExtendedOffer = createAsyncThunk<ExtendedOffer, string, {extra: AxiosInstance}>(
  'fetchExtendedOffer',
  async (id, {extra: api}) => {
    const {data} = await api.get<ExtendedOffer>(`${ApiRoute.Offers}/${id}`);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(ApiRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUserData(data));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(clearUserData());
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'login',
  async ({email: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(ApiRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserData(data));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(clearUserData());
  },
);

export const clearErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
}>(
  'clearError',
  async (_arg, {dispatch}) => {
    await new Promise((_) => setTimeout(_, TIMEOUT_SHOW_ERROR)).then(() => dispatch(setErrorMessage(null)));
  },
);

export const fetchNearbyOffers = createAsyncThunk<Offer[], string, {extra: AxiosInstance}>(
  'fetchNearbyOffers',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offer[]>(`${ApiRoute.Offers}/${id}/nearby`);
    return data;
  },
);

export const fetchReviews = createAsyncThunk<Review[], string, {extra: AxiosInstance}>(
  'fetchReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${ApiRoute.Comments}/${id}`);
    return data;
  },
);

export const postReview = createAsyncThunk<Review, {offerId: string; comment: string; rating: number}, {extra: AxiosInstance}>(
  'postReview',
  async (arg, {extra: api}) => {
    const {data} = await api.post<Review>(`${ApiRoute.Comments}/${arg.offerId}`, {comment: arg.comment, rating: arg.rating});
    return data;
  },
);

export const fetchFavorites = createAsyncThunk<Offer[], undefined, {extra: AxiosInstance}>(
  'fetchFavorites',
  async (_, {extra: api}) => {
    const {data} = await api.get<Offer[]>(ApiRoute.Favorite);
    return data;
  },
);

export const changeOfferStatus = createAsyncThunk<Offer, {offerId: string; isFavorite: boolean}, {extra: AxiosInstance}>(
  'changeOfferStatus',
  async (arg, {extra: api}) => {
    const {data} = await api.post<Offer>(`${ApiRoute.Favorite}/${arg.offerId}/${arg.isFavorite ? 1 : 0}`);
    return data;
  },
);
