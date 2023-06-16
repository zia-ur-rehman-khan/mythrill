import { fork } from 'redux-saga/effects';
import general from './general';
import subscription from './subscription';
import user from './user';
import stock from './stock';

export default function* root() {
  yield fork(general);
  yield fork(user);
  yield fork(subscription);
  yield fork(stock);
}
