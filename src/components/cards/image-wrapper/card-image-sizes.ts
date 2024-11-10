import {CardType} from '../card-type.ts';
import {ImageSize} from '../../../types/image-size.ts';

export const CardImageSizes: Record<CardType, ImageSize> = {
  [CardType.MainPage]: {width: 260, height: 200},
  [CardType.FavoritesPage]: {width: 150, height: 110},
};
