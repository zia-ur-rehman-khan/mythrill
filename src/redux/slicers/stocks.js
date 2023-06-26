// @flow
import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';
import { color } from 'highcharts';

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
      const unsubscribe = action?.payload?.filter((d) => d.subscribe === 0);
      state.stocksUnSubscribe = unsubscribe;
    },
    getSubscribeStocksRequest() {},
    getSubscribeStocksSuccess(state, action) {
      state.stocksSubscribe = action.payload;
    },

    StockSubscribeRequest() {},
    StockSubscribeSuccess(state, action) {
      const data = state.stocksUnSubscribe;
      const filter = data?.filter(
        (d) => d.stockId !== action?.payload?.stockId
      );
      state.stocksUnSubscribe = filter;
      state.stocksSubscribe = [...state.stocksSubscribe, action.payload];
    },
    StockUnSubscribeRequest() {},
    StockUnSubscribeSuccess(state, action) {
      const data = state.stocksSubscribe;
      const filter = data?.filter(
        (d) => d.stockId !== action?.payload?.stock_id
      );

      state.stocksSubscribe = filter;
      // state.stocksUnSubscribe = [...state.stocksSubscribe, action.payload];
    },

    getSubscribeDataRealTime(state, action) {
      // console.log(action.payload, 'data');
      // console.log(current(state.stocksSubscribe), 'subscribe');

      const data = state.stocksSubscribe;

      const filter = data.map((d) => {
        const match = action.payload.nameId === d.nameId;

        // console.log(match, 'match');

        if (match) {
          return {
            ...d,
            amount: action.payload.amount,
            stockUpdate: action.payload.stockUpdate,
            color: action.payload.color
          };
        }

        return d;
      });
      state.stocksSubscribe = filter;
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
  getSubscribeStocksSuccess,
  getSubscribeDataRealTime
} = GeneralReducer.actions;

export default GeneralReducer.reducer;
