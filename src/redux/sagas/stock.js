import { take, put, call, fork } from 'redux-saga/effects';
import { ALERT_TYPES } from '../../constants';
import {
  callRequest,
  GET_STOCK_NAMES,
  GET_SUBSCRIBE_STOCKS,
  STOCK_SUBSCRIBE
} from '../../config/webService';
import { toastAlert } from '../../services/utils';
import {
  StockSubscribeRequest,
  StockSubscribeSuccess,
  StockUnSubscribeRequest,
  getAllStocksRequest,
  getAllStocksRequestSuccess,
  getStocksNameRequest,
  getStocksNameSuccess,
  getSubscribeStockes,
  getSubscribeStockesRequest,
  getSubscribeStockesSuccess,
  getSubscribeStocksRequest,
  getSubscribeStocksSuccess
} from '../slicers/stocks';
import {
  stocksNameManipulator,
  stocksdataManipulator,
  stocksdataManipulatorObject
} from '../../manipulators/stocksName';

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
        // yield put(getStocksNameSuccess(stocksNameManipulator(response?.data)));
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
}
