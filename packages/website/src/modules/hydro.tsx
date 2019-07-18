import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import getApolloClientForFalmer from '@ussu/common/src/libs/getApolloClientForFalmer';
import { store } from '../redux/store';
import { LokiHeaderInner } from '../components/LokiHeader';
import { BrowserRouter } from '../components/BrowserRouter';
import { StoreContext as ReduxHooks } from 'redux-react-hook';

export default function() {
  ReactDOM.hydrate(
    <BrowserRouter>
      <ApolloProvider client={getApolloClientForFalmer}>
        <ReduxHooks.Provider value={store}>
          <LokiHeaderInner />
        </ReduxHooks.Provider>
      </ApolloProvider>
    </BrowserRouter>,
    document.querySelector('.LokiHeader'),
  );
}
