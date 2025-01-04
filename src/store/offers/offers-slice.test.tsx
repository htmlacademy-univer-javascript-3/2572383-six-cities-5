import {describe, it, expect} from 'vitest';
import {offersSlice} from './offers-slice';
import {fetchOffers} from '../api-actions';
import {makeFakeOffer} from '../../utils/mocks'; // your mock factory, if any

describe('offersSlice reducer', () => {
  it('should return initial state by default', () => {
    const initialState = offersSlice.getInitialState();
    const action = { type: 'UNKNOWN_ACTION' };
    const result = offersSlice.reducer(undefined, action);
    expect(result).toEqual(initialState);
  });

  it('should handle fetchOffers.pending', () => {
    const initialState = offersSlice.getInitialState();
    const action = fetchOffers.pending('', undefined);
    const result = offersSlice.reducer(initialState, action);

    expect(result.offersLoading).toBe(true);
  });

  it('should handle fetchOffers.fulfilled', () => {
    const initialState = offersSlice.getInitialState();
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];

    const action = fetchOffers.fulfilled(mockOffers, '', undefined);
    const result = offersSlice.reducer(initialState, action);

    expect(result.offers).toEqual(mockOffers);
    expect(result.offersLoading).toBe(false);
  });
});
