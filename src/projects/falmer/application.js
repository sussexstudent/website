import React from 'react';
import ReactDOM from 'react-dom';
import FalmerApplication from '~components/falmer/FalmerApplication';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as reducers from './reducers';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const client = new ApolloClient();

reducers.apollo = client.reducer();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers(reducers),
  undefined,
  composeEnhancers(applyMiddleware(sagaMiddleware, client.middleware()))
);

sagaMiddleware.run(saga);

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router>
      <FalmerApplication />
    </Router>
  </ApolloProvider>,
  document.querySelector('.FalmerAppRoot')
);
