import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../enums/authorization-status.ts';
import {UserData} from '../../types/user-data.ts';
import {checkAuthAction, clearErrorAction, logoutAction} from '../api-actions.ts';


export interface UserState {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  error: string | null;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizationStatus: (
      state,
      action: PayloadAction<AuthorizationStatus>
    ) => {
      state.authorizationStatus = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userData = null;
    });

    builder.addCase(logoutAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userData = null;
    });

    builder.addCase(clearErrorAction.fulfilled, (state) => {
      state.error = null;
    });
  },
});

export const {
  setAuthorizationStatus,
  setUserData,
  setErrorMessage,
  clearUserData,
} = userSlice.actions;

export default userSlice.reducer;
