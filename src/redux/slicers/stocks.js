// @flow
import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';
import { color } from 'highcharts';
import {
  stockGraphManipulator,
  stocksdataManipulatorObject
} from '../../manipulators/stocksName';

const GeneralReducer = createSlice({
  name: 'stocks',
  initialState: {
    stocks: [],
    stocksSubscribe: [],
    stocksUnSubscribe: [],
    stocksData: {},
    stockLimitExceed: false
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

      const stocksDataPayload = {};

      for (const stock of action.payload) {
        const sort = stock?.stocks?.sort(
          (a, b) => new Date(a?.date) - new Date(b?.date)
        );

        stocksDataPayload[stock.nameId] = {
          color: stock.color,
          data: sort
        };
      }

      state.stocksData = stocksDataPayload;
    },

    StockSubscribeRequest() {},
    StockSubscribeSuccess(state, action) {
      console.log(action, 'sub');
      const data = state.stocksUnSubscribe;
      const filter = data?.filter(
        (d) => d.stockId !== action?.payload?.stockId
      );
      state.stocksUnSubscribe = filter;
      state.stocksSubscribe = [...state.stocksSubscribe, action.payload];

      const sort = action.payload.stocks?.sort(
        (a, b) => new Date(a?.date) - new Date(b?.date)
      );

      state.stocksData[action.payload.nameId] = {
        color: action.payload.color,
        data: sort
      };

      state.stocksData = { ...state.stocksData };
    },
    StockUnSubscribeRequest() {},
    StockUnSubscribeSuccess(state, action) {
      console.log(action, 'action');

      const data = state.stocksSubscribe;
      const filter = data?.filter(
        (d) => d.stockId !== action?.payload?.stockId
      );

      state.stocksSubscribe = filter;
      state.stocksUnSubscribe = [...state.stocksUnSubscribe, action.payload];
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
            color: action.payload.color,
            stocks: [...d.stocks, action.payload],
            changeInPercent: action.payload.changeInPercent,
            changeInPrice: action.payload.changeInPrice,
            prevPrice: action.payload.prevPrice
          };
        }

        return d;
      });

      state.stocksSubscribe = filter;
    },

    getUnSubscribeDataRealTime(state, action) {
      const data = state.stocksUnSubscribe;

      const filter = data.map((d) => {
        const match = action.payload.nameId === d.nameId;

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

      state.stocksUnSubscribe = filter;
    },
    stockLimitExceed(state, action) {
      state.stockLimitExceed = action.payload;
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
  getSubscribeDataRealTime,
  getUnSubscribeDataRealTime,
  stockLimitExceed
} = GeneralReducer.actions;

export default GeneralReducer.reducer;
