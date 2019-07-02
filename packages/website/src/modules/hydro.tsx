import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider as APHook } from 'react-apollo-hooks';
import getApolloClientForFalmer from '@ussu/common/src/libs/getApolloClientForFalmer';
import { store } from '../redux/store';
import { LokiHeaderInner } from '../components/LokiHeader';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from '../components/BrowserRouter';
import { StoreContext as ReduxHooks } from 'redux-react-hook';

export default function() {
  ReactDOM.hydrate(
    <BrowserRouter>
      <ApolloProvider client={getApolloClientForFalmer}>
        <APHook client={getApolloClientForFalmer}>
          <ReduxHooks.Provider value={store}>
            <LokiHeaderInner />
          </ReduxHooks.Provider>
        </APHook>
      </ApolloProvider>
    </BrowserRouter>,
    document.querySelector('.LokiHeader'),
  );
}
