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
    allStocks: [],
    stocks: [],
    stocksSubscribe: [],
    stocksUnSubscribe: [],
    stocksData: {},
    stockLimitExceed: false,
    trendData: [],
    notificationList: [],
    notificationCount: 0,
    filter: 'all',
    collapse: true
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
      state.allStocks = action.payload;
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
          data: sort,
          stockId: stock.stockId,
          frequency: stock.frequency,
          name_slug: stock.slugName,
          symbol: stock.symbol
        };
      }

      state.stocksData = stocksDataPayload;
    },

    StockSubscribeRequest() {},
    StockSubscribeSuccess(state, action) {
      console.log(action, 'sub');
      const data = [...state.stocksUnSubscribe];
      const filter = data?.filter(
        (d) => d.stockId !== action?.payload?.stockId
      );
      state.stocksUnSubscribe = [...filter];
      state.stocksSubscribe = [...state.stocksSubscribe, action.payload];

      // const sort = action.payload.stocks?.sort(
      //   (a, b) => new Date(a?.date) - new Date(b?.date)
      // );

      const stocksData = { ...state.stocksData };

      stocksData[action.payload.nameId] = {
        color: action.payload.color,
        data: action.payload.stocks,
        stockId: action.payload.stockId,
        frequency: action.payload.frequency,
        name_slug: action.payload.slugName,
        symbol: action.payload.symbol
      };

      state.stocksData = { ...stocksData };
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

    StockFavouriteRequest() {},
    StockFavouriteRequestSuccess(state, action) {
      console.log(action, 'favourite');

      const data = state.stocksSubscribe;

      const filter = data.map((d) => {
        const match = action.payload.nameId === d.nameId;

        if (match) {
          return {
            ...d,
            favourite: true
          };
        }

        return d;
      });

      state.stocksSubscribe = filter;
    },

    StockUnFavouriteRequest() {},
    StockUnFavouriteRequestSuccess(state, action) {
      console.log(action, 'unFavourite');

      const data = state.stocksSubscribe;

      const filter = data.map((d) => {
        const match = action.payload.nameId === d.nameId;

        if (match) {
          return {
            ...d,
            favourite: false
          };
        }

        return d;
      });

      state.stocksSubscribe = filter;
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
            prevPrice: action.payload.prevPrice,
            overallTrend: action.payload.overallTrend,
            fearGreedIndex: action.payload.fearGreedIndex
          };
        }

        return d;
      });

      state.stocksSubscribe = filter;

      state.stocksData[action.payload.nameId] = {
        ...state.stocksData[action.payload.nameId],
        color: action.payload.color
      };

      state.stocksData = { ...state.stocksData };
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

      const data2 = state.allStocks;

      const filter2 = data2.map((d) => {
        const match2 = action.payload.nameId === d.nameId;

        if (match2) {
          return {
            ...d,
            overallTrend: action.payload.overallTrend,
            changeInPercent: action.payload.changeInPercent
          };
        }

        return d;
      });

      state.allStocks = filter2;
    },
    stockLimitExceed(state, action) {
      state.stockLimitExceed = action.payload;
    },
    trendingListRequest() {},
    trendingListRequestSuccess(state, action) {
      state.trendData = action.payload;
    },
    preCloseDataRequest() {},
    // preCloseDataRequestSuccess(state, action) {
    //   state.trendData = action.payload;
    // },
    StockSubscribeTrend(state, action) {
      state.trendData = [...state.trendData, action.payload];
    },
    StockUnSubscribeTrend(state, action) {
      const data = state.trendData;
      const filter = data?.filter((d) => d.nameId !== action?.payload?.nameId);

      state.trendData = filter;
    },
    getTrendDataRealTime(state, action) {
      const data = state.trendData;
      const updateData = action.payload;

      const filter = data.map((d) => {
        const match = action.payload.nameId === d.nameId;

        if (match) {
          return {
            ...d,
            amount: updateData.amount,
            stockUpdate: updateData.stockUpdate,
            color: updateData.color,
            changeInPercent: updateData.changeInPercent,
            changeInPrice: updateData.changeInPrice,
            prevPrice: updateData.prevPrice,
            currentPrice: updateData.currentPrice,
            updateDate: updateData?.updateDate,
            overallTrend: updateData.overallTrend,
            fearGreedIndex: updateData.fearGreedIndex
          };
        }

        return d;
      });

      state.trendData = filter;

      // const data1 = state.stocksSubscribe;

      // const filter2 = data1.map((d) => {
      //   const match = action.payload.nameId === d.nameId;

      //   // console.log(match, 'match');

      //   if (match) {
      //     return {
      //       ...d,
      //       amount: action.payload.amount,
      //       stockUpdate: action.payload.stockUpdate,
      //       color: action.payload.color,
      //       changeInPercent: action.payload.changeInPercent,
      //       changeInPrice: action.payload.changeInPrice,
      //       prevPrice: action.payload.prevPrice
      //     };
      //   }

      //   return d;
      // });

      // state.stocksSubscribe = filter2;
    },
    getFrequencyDataRequest() {},
    setFrequencyRequest() {},
    setFrequencyRequestSuccess(state, action) {
      console.log(action, 'action');
    },
    getFrequencyRequest() {},
    getNotificationRequest() {},
    getNotificationSuccess(state, action) {
      state.notificationList = action.payload;
    },
    getNotificationReadRequest() {},
    getNotificationReadSuccess(state, action) {
      const data = state.notificationList;
      const updateData = action.payload;

      const filter = data.map((d) => {
        const match = action.payload.id === d.id;

        if (match) {
          return {
            ...d,
            is_read: updateData.is_read
          };
        }

        return d;
      });

      state.notificationList = filter;
    },
    getNotificationReadAllRequest(state, action) {},
    getNotificationReadAllRequestSuccess(state, action) {
      state.notificationList = action.payload;
    },
    getNotificationsCountRequest(state, action) {},
    getNotificationsCountRequestSuccess(state, action) {
      state.notificationCount = action.payload.unseen_count;
    },
    seeNotificationsRequest(state, action) {},
    seeNotificationsRequestSuccess(state, action) {
      state.notificationCount = 0;
    },
    getlatestNotification(state, action) {
      const data = state.notificationList;

      let newData = action.payload;
      state.notificationList = [{ ...newData }, ...data];

      state.notificationCount += 1;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    isSubscribeRequest(state, action) {},
    setCollapsedState(state, action) {
      state.collapse = action.payload;
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
  StockFavouriteRequest,
  StockFavouriteRequestSuccess,
  StockUnFavouriteRequest,
  StockUnFavouriteRequestSuccess,
  getFavouriteStockRequest,
  getFavouriteStockSuccess,
  preCloseDataRequest,
  setStocksDataAction,
  getSubscribeStocksRequest,
  getSubscribeStocksSuccess,
  getSubscribeDataRealTime,
  getUnSubscribeDataRealTime,
  stockLimitExceed,
  trendingListRequest,
  trendingListRequestSuccess,
  StockSubscribeTrend,
  getTrendDataRealTime,
  StockUnSubscribeTrend,
  getFrequencyDataRequest,
  setFrequencyRequest,
  setFrequencyRequestSuccess,
  getFrequencyRequest,
  getNotificationRequest,
  getNotificationSuccess,
  getNotificationReadRequest,
  getNotificationReadSuccess,
  getNotificationReadAllRequest,
  getNotificationReadAllRequestSuccess,
  getNotificationsCountRequest,
  getNotificationsCountRequestSuccess,
  seeNotificationsRequest,
  seeNotificationsRequestSuccess,
  getlatestNotification,
  setFilter,
  isSubscribeRequest,
  setCollapsedState
} = GeneralReducer.actions;

export default GeneralReducer.reducer;
