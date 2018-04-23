import * as reducers from './reducers';
import { createStore, combineReducers, compose } from 'redux';

const composeEnhancers =
  (typeof (window as any) !== 'undefined' ? window : ({} as any))
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers(reducers) as any, // fix me
  {},
  composeEnhancers(),
);

export { store };
