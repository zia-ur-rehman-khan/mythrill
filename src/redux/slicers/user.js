// @flow
import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { cloneDeepItem } from '../../services/utils';

const UserReducer = createSlice({
  name: 'user',
  initialState: {
    data: {},
    profileSections: [],
    isAuthenticated: false,
    isError: null,
    deviceToken: '',
    hash: ''
  },
  reducers: {
    // USER LOGIN
    userLoginRequest(state, action) {},

    userLoginSuccess(state, action) {
      console.log(action, 'userLoginSuccess');
      state.isAuthenticated = true;
      state.data = action.payload;
    },
    // REFRESH TOKEN
    refreshToken(state, action) {
      let newData = cloneDeepItem(state.data);
      newData.access_token = action.payload.access_token;
      newData.refresh_token = action.payload.refresh_token;
      state.data = { ...state.data, ...newData };
    },

    // SET AUTH ERROR
    setAuthError(state, action) {
      state.isError = action.payload;
    },

    // REMOVE AUTH ERROR
    removeAuthError(state, action) {
      state.isError = null;
    },

    // USER SIGNOUT

    // USER SIGNOUT
    userSignOutRequest(state, action) {
      state.isAuthenticated = false;
    },

    userSignOutSuccess(state, action) {
      state.isAuthenticated = false;
      state.deviceToken = '';
      state.data = {};
    },
    deviceNotificationTokenSuccess(state, action) {
      state.deviceToken = action.payload;
    },
    userRegisterRequest(state, action) {},
    userHash(state, action) {
      state.hash = action.payload;
    },
    VerificationRequest(state, action) {},
    ForgotRequest(state, action) {},
    ResetPasswordRequest(state, action) {},
    LogoutRequest(state, action) {},
    ResendVerificationRequest(state, action) {}
  }
});

export const {
  userLoginRequest,
  refreshToken,
  setAuthError,
  removeAuthError,
  userSignOutRequest,
  userSignOutSuccess,
  deviceNotificationTokenSuccess,
  userLoginSuccess,
  userRegisterRequest,
  userHash,
  VerificationRequest,
  ForgotRequest,
  ResetPasswordRequest,
  LogoutRequest,
  ResendVerificationRequest
} = UserReducer.actions;

export default UserReducer.reducer;
