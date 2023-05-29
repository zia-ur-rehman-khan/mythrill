import { take, put, call, fork } from "redux-saga/effects";
import { contactUsForm } from "../slicers/general";
import { SAGA_ALERT_TIMEOUT, ALERT_TYPES } from "../../constants";
import { callRequest, CONTACT_US } from "../../config/webService";
import { toastAlert } from "../../services/utils";

function* contactUs() {
  while (true) {
    // PAYLOAD PATTERN COMING FROM REDUX-TOOLKIT
    const { payload } = yield take(contactUsForm.type);
    console.log("contactUs", payload);
    // PARAMETER SEND FROM DISPATCH WILL DESTRUCTURE THERE
    const { payloadData, responseCallback } = payload;
    try {
      const response = yield call(
        callRequest,
        CONTACT_US,
        payloadData,
        "",
        "",
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
export default function* root() {
  yield fork(contactUs);
}
