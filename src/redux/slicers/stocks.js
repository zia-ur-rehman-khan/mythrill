// @flow
import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

const GeneralReducer = createSlice({
  name: 'stocks',
  initialState: {
    stocks: [],
    stocksData: {}
  },
  reducers: {
    setStocksListAction(state, action) {
      state.stocks = action.payload;
    },

    setStocksDataAction(state, action) {
      state.stocksData = action.payload;
    },

    getStocksNameRequest() {},
    getStocksNameSuccess(state, action) {
      state.stocks = action.payload;
    }
  }
});

export const {
  setStocksListAction,
  getStocksNameRequest,
  getStocksNameSuccess,
  setStocksDataAction
} = GeneralReducer.actions;

export default GeneralReducer.reducer;
