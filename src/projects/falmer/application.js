import React from 'react';
import ReactDOM from 'react-dom';
import FalmerApplication from '~components/falmer/FalmerApplication';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as reducers from './reducers';
import saga from './saga';
import ScrollToTop from '../../components/ScrollToTop';

const sagaMiddleware = createSagaMiddleware();
const networkInterface = createNetworkInterface({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://falmer.sussexstudent.com/graphql'
      : 'http://localhost:8000/graphql',
  opts: {
    // Additional fetch options like `credentials` or `headers`
    credentials: 'same-origin',
    headers: {
      'X-CSRFToken': window.CSRF,
    },
  },
});
const client = new ApolloClient({
  networkInterface,
});

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
      <ScrollToTop>
        <FalmerApplication />
      </ScrollToTop>
    </Router>
  </ApolloProvider>,
  document.querySelector('.FalmerAppRoot')
);
