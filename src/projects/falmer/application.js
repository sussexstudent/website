import React from 'react';
import ReactDOM from 'react-dom';
import FalmerApplication from '~components/falmer/FalmerApplication';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import * as reducers from './reducers';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers(reducers),
  undefined,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <FalmerApplication />
    </Router>
  </Provider>,
  document.querySelector('.FalmerAppRoot')
);
