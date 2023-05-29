import { fork } from "redux-saga/effects";
import general from "./general";
import subscription from "./subscription";

export default function* root() {
  yield fork(general);
  yield fork(subscription);
}
