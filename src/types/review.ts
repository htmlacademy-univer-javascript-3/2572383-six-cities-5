import {User} from './user.ts';

export interface Review {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}
