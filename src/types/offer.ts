import {Location} from './location.ts';
import {City} from './city.ts';
import {OfferType} from '../enums/offer-type.ts';

export interface Offer {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage?: string;
}
