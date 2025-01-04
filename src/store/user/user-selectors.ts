import { createSelector } from '@reduxjs/toolkit';
import {RootState} from '../index.ts';
import {AuthorizationStatus} from '../../enums/authorization-status.ts';

export const selectAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;

export const selectIsAuthorized = createSelector(
  selectAuthorizationStatus,
  (authorizationStatus) => authorizationStatus === AuthorizationStatus.Auth
);
