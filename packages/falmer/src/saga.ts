import { fork } from 'redux-saga/effects';

import { saga as authSaga } from './ducks/auth';
import { saga as imageSaga } from './ducks/images';

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(imageSaga);
}
