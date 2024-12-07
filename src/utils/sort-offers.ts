import {State} from '../types/state.ts';
import {SortType} from '../enums/sort-type.ts';

export function getSortedOffers(state: State){
  const offers = [...state.offers];

  switch (state.sortType) {
    case SortType.Popular:
      return offers;
    case SortType.HighToLow:
      return offers.sort((a, b) => b.price - a.price);
    case SortType.LowToHigh:
      return offers.sort((a, b) => a.price - b.price);
    case SortType.TopRatedFirst:
      return offers.sort(
        (a, b) => b.rating - a.rating
      );
    default:
      return offers;
  }
}
