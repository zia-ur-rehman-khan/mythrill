// @flow
import _ from 'lodash';
import { createSlice, current } from '@reduxjs/toolkit';
import { cloneDeepItem } from '../../services/utils';

const UserReducer = createSlice({
  name: 'user',
  initialState: {
    data: {},
    profileSections: [],
    isAuthenticated: false,
    isError: null,
    deviceToken: '',
    hash: '',
    search: ''
  },
  reducers: {
    // USER LOGIN
    userLoginRequest(state, action) {},

    userLoginSuccess(state, action) {
      console.log(action, 'userLoginSuccess');
      state.isAuthenticated = true;
      state.data = action.payload.data;
    },
    // REFRESH TOKEN
    refreshToken(state, action) {
      let newData = { ...state.data };
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
    EmailVerificationRequest(state, action) {},

    ResetPasswordRequest(state, action) {},
    LogoutRequest(state, action) {},
    ResendVerificationRequest(state, action) {},
    userChangePasswordRequest(state, action) {},
    userDataUpdateRequest(state, action) {},
    userDataUpdateSuccess(state, action) {
      let newData = { ...state.data };
      newData.name = action.payload.name;
      newData.phone = action.payload.phone;
      newData.email = action.payload.email;
      newData.profile_image = action.payload.profile_image;
      state.data = { ...state.data, ...newData };
    },
    userAvatarRequest(state, action) {},
    socketTokenUpdate(state, action) {
      let newData = { ...state.data };
      newData.subscribedStocks = action.payload;
      state.data = { ...state.data, ...newData };
    },
    googleLoginRequest(state, action) {},
    facebookLoginRequest(state, action) {},
    subscriptionRequest(state, action) {},
    subscriptionRequestSuccess(state, action) {
      console.log(action, 'action');
      let newData = { ...state.data };
      newData.subscribe_status = action.payload.subscribe_status;
      newData.pay_details = action.payload.pay_details;
      newData.card_exist = action.payload.card_exist;

      state.data = { ...state.data, ...newData };
    },

    updateCardRequest(state, action) {},
    updateCardRequestSuccess(state, action) {
      console.log(action, 'updateCardRequestSuccess');
      let newData = { ...state.data };
      newData.subscribe_status = action.payload.subscribe_status;
      newData.pay_details = action.payload.pay_details;
      newData.card_exist = action.payload.card_exist;

      state.data = { ...state.data, ...newData };
    },
    removeCardRequest(state, action) {},
    removeCardRequestSuccess(state, action) {
      console.log(action, 'removeCardRequestSuccess');
      let newData = { ...state.data };
      newData.card_exist = action.payload.card_exist;

      state.data = { ...state.data, ...newData };
    },

    updateCardRequest(state, action) {},
    pauseSubscriptionRequest(state, action) {},
    pauseSubscriptionRequestSuccess(state, action) {
      console.log(action, 'action');
      let newData = { ...state.data };
      newData.subscribe_status = action.payload.subscribe_status;
      state.data = { ...state.data, ...newData };
    },
    cancelSubscriptionRequest(state, action) {},
    resumeSubscriptionRequest() {},
    paymentListRequest() {},
    trendingListRequest() {},
    search(state, action) {
      state.search = action.payload;
    }
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
  EmailVerificationRequest,
  userChangePasswordRequest,
  ResetPasswordRequest,
  LogoutRequest,
  ResendVerificationRequest,
  userDataUpdateRequest,
  userDataUpdateSuccess,
  userAvatarRequest,
  socketTokenUpdate,
  googleLoginRequest,
  facebookLoginRequest,
  subscriptionRequest,
  updateCardRequest,
  updateCardRequestSuccess,
  removeCardRequest,
  removeCardRequestSuccess,
  pauseSubscriptionRequest,
  pauseSubscriptionRequestSuccess,
  cancelSubscriptionRequest,
  resumeSubscriptionRequest,
  subscriptionRequestSuccess,
  paymentListRequest,
  trendingListRequest,
  search
} = UserReducer.actions;

export default UserReducer.reducer;
