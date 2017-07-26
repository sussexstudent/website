import { fork } from 'redux-saga/effects';

import { saga as authSaga } from './ducks/auth';

export default function* rootSaga() {
  yield fork(authSaga);
}
