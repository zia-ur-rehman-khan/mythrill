// @flow
import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

const GeneralReducer = createSlice({
  name: 'stocks',
  initialState: {
    stocks: [],
    stocksSubscribe: [],
    stocksUnSubscribe: [],
    stocksData: {}
  },
  reducers: {
    setStocksListAction(state, action) {
      state.stocks = action.payload;
    },

    setStocksDataAction(state, action) {
      state.stocksData = action.payload;
    },

    getAllStocksRequest() {},
    getAllStocksRequestSuccess(state, action) {
      console.log(action, 'action');
      const unsubscribe = action?.payload?.filter((d) => d.subscribe === 0);
      state.stocksUnSubscribe = unsubscribe;
    },
    getSubscribeStocksRequest() {},
    getSubscribeStocksSuccess(state, action) {
      state.stocksSubscribe = action.payload;
    },

    StockSubscribeRequest() {},
    StockSubscribeSuccess(state, action) {
      state.stocksSubscribe = action.payload;
    },
    StockUnSubscribeRequest() {},
    StockUnSubscribeSuccess(state, action) {
      console.log(
        '🚀 ~ file: stocks.js:40 ~ StockUnSubscribeSuccess ~ action:',
        action
      );
      const data = state.stocks;
      filter = data.filter((d) => d.id !== action.payload.id);
      state.unSubscribe = filter;
    }
  }
});

export const {
  setStocksListAction,
  getAllStocksRequest,
  getAllStocksRequestSuccess,
  StockSubscribeSuccess,
  StockSubscribeRequest,
  StockUnSubscribeRequest,
  StockUnSubscribeSuccess,
  setStocksDataAction,
  getSubscribeStocksRequest,
  getSubscribeStocksSuccess
} = GeneralReducer.actions;

export default GeneralReducer.reducer;
