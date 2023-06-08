import { fork } from "redux-saga/effects";
import general from "./general";
import subscription from "./subscription";
import user from "./user";

export default function* root() {
  yield fork(general);
  yield fork(user);
  yield fork(subscription);
}
