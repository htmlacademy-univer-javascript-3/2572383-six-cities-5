import {User} from './user.ts';

export interface Review {
  user: User;
  text: string;
  stars: number;
  datetime: string;
}
