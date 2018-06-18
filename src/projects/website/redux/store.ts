import * as reducers from './reducers';
import user from '../../../libs/user';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { appMountMiddleware } from './middleware/appMount';
import { rootTransitionMiddleware } from './middleware/rootTransition';
import { ROUTER_INITIAL } from '../ducks/router';
import { sideMenuMiddleware } from './middleware/sideMenu';

const composeEnhancers =
  (typeof (window as any) !== 'undefined' ? window : ({} as any))
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers(reducers) as any, // fix me
  {},
  composeEnhancers(
    applyMiddleware(
      appMountMiddleware,
      rootTransitionMiddleware,
      sideMenuMiddleware,
    ),
  ),
);

store.dispatch({
  type: ROUTER_INITIAL,
});

if (user && user.auth) {
  store.dispatch({
    type: 'PAGE_HYDRATION',
    payload: user,
  });
}

export { store };
