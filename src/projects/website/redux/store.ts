import * as reducers from './reducers';
import user from '../../../libs/user';
import { createStore, combineReducers, compose } from 'redux';

const composeEnhancers =
  (typeof (window as any) !== 'undefined' ? window : ({} as any))
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers(reducers) as any, // fix me
  {},
  composeEnhancers(),
);

if (user && user.auth) {
  store.dispatch({
    type: 'PAGE_HYDRATION',
    payload: user,
  });
}

export { store };
