import {Coordinates} from './coordinates.ts';

export interface Point {
  title: string;
  coordinates: Coordinates;
}

export type Points = Point[];
