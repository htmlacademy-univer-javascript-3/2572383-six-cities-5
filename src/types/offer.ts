import {User} from './user.ts';
import {Review} from './review.ts';
import {Feature} from './feature.ts';

export interface Offer {
  id: string;
  type: string;
  images: string[];
  name: string;
  price: number;
  features: Feature[];
  insideItems: string[];
  host: User;
  descriptionParagraphs: string[];
  reviews: Review[];
  mark?: string;
}
