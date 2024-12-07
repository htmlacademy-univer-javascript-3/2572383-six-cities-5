import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {Offer} from '../types/offer.ts';
import {ApiRoute} from '../enums/api-route.ts';
import {ExtendedOffer} from '../types/extended-offer.ts';

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
