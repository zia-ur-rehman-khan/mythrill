// @flow
import _ from "lodash";
import { createSlice } from "@reduxjs/toolkit";
import Immutable from "seamless-immutable";
import { cloneDeepItem } from "../../services/utils";

const UserReducer = createSlice({
  name: "user",
  initialState: Immutable({
    data: {},
    profileSections: [],
    isAuthenticated: false,
    isError: null,
  }),
  reducers: {
    // USER LOGIN
    userLoginRequest(state, action) {
      state.isAuthenticated = true;
    },
    // REFRESH TOKEN
    refreshToken(state, action) {
      let newData = cloneDeepItem(state.data);
      newData.access_token = action.payload.access_token;
      newData.refresh_token = action.payload.refresh_token;
      Immutable.merge(state, { data: newData });
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
} = UserReducer.actions;

export default UserReducer.reducer;
