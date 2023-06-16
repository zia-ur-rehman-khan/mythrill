import { take, put, call, fork } from 'redux-saga/effects';
import { ALERT_TYPES } from '../../constants';
import { callRequest, GET_STOCK_NAMES } from '../../config/webService';
import { toastAlert } from '../../services/utils';
import { getStocksNameRequest, getStocksNameSuccess } from '../slicers/stocks';
import { stocksNameManipulator } from '../../manipulators/stocksName';

function* getStockNames() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(getStocksNameRequest.type);
    console.log('contactUs', payload);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { responseCallback } = payload;
    try {
      const response = yield call(callRequest, GET_STOCK_NAMES, {}, '', '', {});
      if (response?.data) {
        if (responseCallback) responseCallback(response?.data);
        yield put(getStocksNameSuccess(stocksNameManipulator(response?.data)));
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
}
