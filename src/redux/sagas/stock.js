import { take, put, call, fork } from 'redux-saga/effects';
import { ALERT_TYPES } from '../../constants';
import {
  callRequest,
  GET_STOCK_NAMES,
  GET_SUBSCRIBE_STOCKS,
  STOCK_SUBSCRIBE,
  STOCK_UNSUBSCRIBE,
  TRENDING_LIST_REQUEST
} from '../../config/webService';
import { toastAlert } from '../../services/utils';
import {
  StockSubscribeRequest,
  StockSubscribeSuccess,
  StockSubscribeTrend,
  StockUnSubscribeRequest,
  StockUnSubscribeSuccess,
  StockUnSubscribeTrend,
  getAllStocksRequest,
  getAllStocksRequestSuccess,
  getStocksNameRequest,
  getStocksNameSuccess,
  getSubscribeStockes,
  getSubscribeStockesRequest,
  getSubscribeStockesSuccess,
  getSubscribeStocksRequest,
  getSubscribeStocksSuccess,
  trendingListRequest,
  trendingListRequestSuccess
} from '../slicers/stocks';
import {
  stockGraphManipulator,
  stocksNameManipulator,
  stocksdataManipulator,
  stocksdataManipulatorObject
} from '../../manipulators/stocksName';
import { socketTokenUpdate } from '../slicers/user';

function* getStockNames() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(getAllStocksRequest.type);
    console.log('contactUs', payload);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        GET_STOCK_NAMES,
        payload,
        '',
        '',
        {}
      );
      if (response?.data) {
        if (responseCallback) responseCallback(response?.data);
        yield put(
          getAllStocksRequestSuccess(
            stocksdataManipulator(response?.data?.data)
          )
        );
      } else {
        if (responseCallback) responseCallback(response);
        if (response.message) toastAlert(response.message, ALERT_TYPES.error);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* getSubscribeStocks() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(getSubscribeStocksRequest.type);
    console.log('contactUs', payload);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        GET_SUBSCRIBE_STOCKS,
        payload,
        '',
        '',
        {}
      );
      if (response?.data) {
        if (responseCallback) responseCallback(response?.data);
        yield put(
          getSubscribeStocksSuccess(
            stocksNameManipulator(response?.data.data.stock_subscribe)
          )
        );
      } else {
        if (responseCallback) responseCallback(response);
        if (response.message) toastAlert(response.message, ALERT_TYPES.error);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* StockSubscribe() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(StockSubscribeRequest.type);
    console.log('contactUs', payload);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        STOCK_SUBSCRIBE,
        payloadData,
        '',
        '',
        {}
      );
      if (response?.data) {
        if (responseCallback) responseCallback(response?.data);
        yield put(
          StockSubscribeSuccess(
            stocksdataManipulatorObject(response?.data?.data?.stocks_name)
          )
        );
        yield put(socketTokenUpdate(response?.data?.data?.subscribedStocks));
        yield put(
          StockSubscribeTrend(
            stocksdataManipulatorObject(response?.data?.data?.trending_stocks)
          )
        );
      } else {
        if (responseCallback) responseCallback(response);
        if (response.message) toastAlert(response.message, ALERT_TYPES.error);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* StockUnSubscribe() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(StockUnSubscribeRequest.type);
    console.log('contactUs', payload);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        STOCK_UNSUBSCRIBE,
        payloadData,
        '',
        '',
        {}
      );
      if (response?.data) {
        if (responseCallback) responseCallback(response?.data);
        yield put(
          StockUnSubscribeSuccess(
            stocksdataManipulatorObject(response?.data?.data?.stocks_name)
          )
        );
        yield put(socketTokenUpdate(response?.data?.data?.subscribedStocks));
        yield put(StockUnSubscribeTrend(payloadData));
      } else {
        if (responseCallback) responseCallback(response);
        if (response.message) toastAlert(response.message, ALERT_TYPES.error);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* trendingList() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(trendingListRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        TRENDING_LIST_REQUEST,
        payloadData,
        '',
        '',
        {}
      );

      if (response.status) {
        if (responseCallback) responseCallback(response);
        yield put(
          trendingListRequestSuccess(
            stockGraphManipulator(response?.data?.data)
          )
        );
      } else {
        if (responseCallback) responseCallback(response);
        if (response.message) toastAlert(response.message, ALERT_TYPES.error);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

export default function* root() {
  yield fork(getStockNames);
  yield fork(StockSubscribe);
  yield fork(StockUnSubscribe);
  yield fork(getSubscribeStocks);
  yield fork(trendingList);
}
