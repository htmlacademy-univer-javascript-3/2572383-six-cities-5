import {SortType} from '../enums/sort-type.ts';
import {Offer} from '../types/offer.ts';

export function getSortedOffers(offers: Offer[], sortType: SortType){
  const offersCopy = [...offers];

  switch (sortType) {
    case SortType.Popular:
      return offersCopy;
    case SortType.HighToLow:
      return offersCopy.sort((a, b) => b.price - a.price);
    case SortType.LowToHigh:
      return offersCopy.sort((a, b) => a.price - b.price);
    case SortType.TopRatedFirst:
      return offersCopy.sort(
        (a, b) => b.rating - a.rating
      );
    default:
      return offersCopy;
  }
}
