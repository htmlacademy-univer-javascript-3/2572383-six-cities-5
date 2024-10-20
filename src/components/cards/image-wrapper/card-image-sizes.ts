import {CardType} from '../card-type.ts';

export const CardImageSizes: Record<CardType, {width: number; height: number}> = {
  [CardType.MainPage]: {width: 260, height: 200},
  [CardType.FavoritesPage]: {width: 150, height: 110},
};
