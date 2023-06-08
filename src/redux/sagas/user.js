import { take, put, call, fork } from "redux-saga/effects";
import { SAGA_ALERT_TIMEOUT, ALERT_TYPES } from "../../constants";
import {
  callRequest,
  CONTACT_US,
  LOGIN_REQUEST,
} from "../../config/webService";
import { toastAlert } from "../../services/utils";
import { userLoginRequest, userLoginSuccess } from "../slicers/user";

function* userLogin() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(userLoginRequest.type);
    console.log("contactUs", payload);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        LOGIN_REQUEST,
        payloadData,
        "",
        "",
        {}
      );
      if (response.status) {
        if (responseCallback) responseCallback(response);
        yield put(userLoginSuccess(response));
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
}
