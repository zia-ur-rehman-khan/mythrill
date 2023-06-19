import { take, put, call, fork } from 'redux-saga/effects';
import { SAGA_ALERT_TIMEOUT, ALERT_TYPES } from '../../constants';
import {
  callRequest,
  CONTACT_US,
  LOGIN_REQUEST,
  NUMBER_VERIFICATION_REQUEST,
  REJISTER_REQUEST
} from '../../config/webService';
import { toastAlert } from '../../services/utils';
import {
  NumberVerificationRequest,
  userLoginRequest,
  userLoginSuccess,
  userNumberVerificationRequest,
  userRegisterRequest,
  userRegisterSuccess
} from '../slicers/user';

function* userLogin() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(userLoginRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        LOGIN_REQUEST,
        payloadData,
        '',
        '',
        {}
      );

      if (response.status) {
        if (responseCallback) responseCallback(response);
        yield put(userLoginSuccess(response?.data));
      } else {
        if (responseCallback) responseCallback(response);
        if (response.message) toastAlert(response.message, ALERT_TYPES.error);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* userRegister() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(userRegisterRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        REJISTER_REQUEST,
        payloadData,
        '',
        '',
        {}
      );

      if (response.status) {
        if (responseCallback) responseCallback(response);
        yield put(userRegisterSuccess(response?.data?.data?.hash));
      } else {
        if (responseCallback) responseCallback(response);
        if (response.message) toastAlert(response.message, ALERT_TYPES.error);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* userNumberVerification() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(NumberVerificationRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        NUMBER_VERIFICATION_REQUEST,
        payloadData,
        '',
        '',
        {}
      );

      if (response.status) {
        if (responseCallback) responseCallback(response);
        yield put(userLoginSuccess(response?.data));
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
  yield fork(userLogin);
  yield fork(userRegister);
  yield fork(userNumberVerification);
}
