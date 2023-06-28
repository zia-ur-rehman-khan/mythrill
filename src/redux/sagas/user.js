import { take, put, call, fork } from 'redux-saga/effects';
import { SAGA_ALERT_TIMEOUT, ALERT_TYPES } from '../../constants';
import {
  callRequest,
  CHANGE_USER_Info,
  CHANGE_USER_PASSWORD,
  CONTACT_US,
  FORGOT_PASSWORD,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  NUMBER_VERIFICATION_REQUEST,
  REJISTER_REQUEST,
  RESEND_REQUEST,
  RESEND_VERIFICATION_REQUEST,
  RESET_PASSWORD,
  VERIFICATION_REQUEST
} from '../../config/webService';
import { toastAlert } from '../../services/utils';
import {
  EmailVerificationRequest,
  ForgotRequest,
  LogoutRequest,
  NumberVerificationRequest,
  ResendRequest,
  ResendVerificationRequest,
  ResetPasswordRequest,
  VerificationRequest,
  userChangePasswordRequest,
  userDataUpdateRequest,
  userDataUpdateSuccess,
  userHash,
  userLoginRequest,
  userLoginSuccess,
  userNumberVerificationRequest,
  userRegisterRequest,
  userRegisterSuccess,
  userSignOutSuccess
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
        yield put(userHash(response?.data?.data?.hash));
      } else {
        if (responseCallback) responseCallback(response);
        if (response.message) toastAlert(response.message, ALERT_TYPES.error);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* userVerification() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(VerificationRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        VERIFICATION_REQUEST,
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

function* forgotPassword() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(ForgotRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        FORGOT_PASSWORD,
        payloadData,
        '',
        '',
        {}
      );

      if (response.status) {
        if (responseCallback) responseCallback(response);
        yield put(userHash(response?.data?.data?.hash));
      } else {
        if (responseCallback) responseCallback(response);
        if (response.message) toastAlert(response.message, ALERT_TYPES.error);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* userEmailVerification() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(EmailVerificationRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        VERIFICATION_REQUEST,
        payloadData,
        '',
        '',
        {}
      );

      if (response.status) {
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
        if (response.message) toastAlert(response.message, ALERT_TYPES.error);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* ResetPassword() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(ResetPasswordRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        RESET_PASSWORD,
        payloadData,
        '',
        '',
        {}
      );

      if (response.status) {
        if (responseCallback) responseCallback(response);
        yield put(userHash(response?.data?.data?.hash));
      } else {
        if (responseCallback) responseCallback(response);
        if (response.message) toastAlert(response.message, ALERT_TYPES.error);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* LogoutPassword() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(LogoutRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        LOGOUT_REQUEST,
        payloadData,
        '',
        '',
        {}
      );

      if (response.status) {
        if (responseCallback) responseCallback(response);
        yield put(userSignOutSuccess(response?.data));
      } else {
        if (responseCallback) responseCallback(response);
        if (response.message) toastAlert(response.message, ALERT_TYPES.error);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* ResendUserVerification() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(ResendVerificationRequest.type);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        RESEND_VERIFICATION_REQUEST,
        payloadData,
        '',
        '',
        {}
      );

      if (response.status) {
        if (responseCallback) responseCallback(response);
        // yield put(userSignOutSuccess(response?.data));
      } else {
        if (responseCallback) responseCallback(response);
        if (response.message) toastAlert(response.message, ALERT_TYPES.error);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* changePassword() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(userChangePasswordRequest.type);
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        CHANGE_USER_PASSWORD,
        payloadData,
        '',
        '',
        {}
      );
      if (response?.status) {
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(response);
        if (response.message) toastAlert(response.message, ALERT_TYPES.error);
      }
    } catch (err) {
      if (responseCallback) responseCallback(err);
    }
  }
}

function* userDataUpdate() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(userDataUpdateRequest.type);
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        CHANGE_USER_Info,
        payloadData,
        '',
        '',
        {}
      );
      if (response?.status) {
        if (responseCallback) responseCallback(response);
        yield put(userDataUpdateSuccess(response?.data?.data));
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
  yield fork(userVerification);
  yield fork(forgotPassword);
  yield fork(ResetPassword);
  yield fork(LogoutPassword);
  yield fork(ResendUserVerification);
  yield fork(userEmailVerification);
  yield fork(userDataUpdate);
  yield fork(changePassword);
}
