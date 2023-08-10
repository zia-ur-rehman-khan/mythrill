// @flow
import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import Immutable from 'seamless-immutable';
import { cloneDeepItem } from '../../services/utils';

const SubscriptionReducer = createSlice({
  name: 'user',
  initialState: {
    data: {}
  },
  reducers: {
    getSubscriptionsRequest() {},
    getSubscriptionsSuccess(state, action) {
      console.log('obaid ', action.payload);
    }
  }
});

export const { getSubscriptionsRequest, getSubscriptionsSuccess } =
  SubscriptionReducer.actions;

export default SubscriptionReducer.reducer;
