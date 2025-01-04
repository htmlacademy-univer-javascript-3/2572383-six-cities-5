import {describe, it, expect} from 'vitest';
import {userSlice} from './user-slice';
import {checkAuthAction, logoutAction, clearErrorAction} from '../api-actions';
import {AuthorizationStatus} from '../../enums/authorization-status';

describe('userSlice reducer', () => {
  it('should have initial state', () => {
    const initialState = userSlice.getInitialState();
    expect(initialState).toEqual({
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
      error: null,
    });
  });

  it('should set NoAuth on checkAuthAction.rejected', () => {
    const initialState = userSlice.getInitialState();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const action = checkAuthAction.rejected(null, '');
    const result = userSlice.reducer(initialState, action);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.userData).toBeNull();
  });

  it('should set NoAuth on logoutAction.fulfilled', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: { email: 'test@test.com', token: 'asdf', isPro: false, name: 'User', avatarUrl: '' },
      error: null,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const action = logoutAction.fulfilled(undefined, '');
    const result = userSlice.reducer(initialState, action);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.userData).toBeNull();
  });

  it('should clear error on clearErrorAction.fulfilled', () => {
    const initialState = {authorizationStatus: AuthorizationStatus.NoAuth, userData: null, error: 'Some error'};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const action = clearErrorAction.fulfilled(undefined, '');
    const result = userSlice.reducer(initialState, action);
    expect(result.error).toBeNull();
  });
});
