import {State} from '../types/state.ts';

export function getOfferById(state: State, id?: string) {
  if (!id) {
    return null;
  }

  return state.offers.offersDetails[id];
}
