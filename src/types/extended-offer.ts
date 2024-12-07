import {Offer} from './offer.ts';
import {User} from './user.ts';

export interface ExtendedOffer extends Offer {
  description: string;
  bedrooms: number;
  goods: [string];
  host: User;
  images: [string];
  maxAdults: number;
}
