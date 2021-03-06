import React from 'react';
import ReactDOM from 'react-dom';
import { FalmerApplication } from './containers/FalmerApplication';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { StoreContext } from 'redux-react-hook';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import saga from './saga';
import { BrowserRouter } from '@ussu/website/src/components/BrowserRouter';
import { addClassesForFeatures } from '@ussu/common/src/libs/features';
addClassesForFeatures();

const sagaMiddleware = createSagaMiddleware();
const link = new HttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://falmer.sussexstudent.com/graphql/'
      : 'http://localhost:8000/graphql/',
  // Additional fetch options like `credentials` or `headers`
  credentials: 'same-origin',
  headers: {
    'X-CSRFToken': (window as any).CSRF,
  },
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers(reducers),
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(saga);

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Provider store={store}>
        <StoreContext.Provider value={store}>
          <FalmerApplication />
        </StoreContext.Provider>
      </Provider>
    </BrowserRouter>
  </ApolloProvider>,
  document.querySelector('.FalmerAppRoot'),
);
