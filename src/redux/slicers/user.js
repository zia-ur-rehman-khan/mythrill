// @flow
import _ from "lodash";
import { createSlice } from "@reduxjs/toolkit";
import { cloneDeepItem } from "../../services/utils";

const UserReducer = createSlice({
  name: "user",
  initialState: {
    data: {},
    profileSections: [],
    isAuthenticated: false,
    isError: null,
    deviceToken: "",
    text: "true",
  },
  reducers: {
    // USER LOGIN
    userLoginRequest(state, action) {
      console.log(action, "userLoginRequest");
    },
    userLoginSuccess(state, action) {
      console.log(action, "userLoginSuccess");
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
      // state.isAuthenticated = false;
    },

    userSignOutSuccess(state, action) {
      // state.isAuthenticated = false;
    },
    deviceNotificationTokenSuccess(state, action) {
      state.deviceToken = action.payload;
    },
  },
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
} = UserReducer.actions;

export default UserReducer.reducer;
