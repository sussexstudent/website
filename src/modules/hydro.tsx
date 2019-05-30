import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider as APHook } from 'react-apollo-hooks';
import getApolloClientForFalmer from '~libs/getApolloClientForFalmer';
import { store } from '~website/redux/store';
import { LokiHeader } from '~components/LokiHeader';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from '~components/BrowserRouter';
import { StoreContext as ReduxHooks } from 'redux-react-hook';

export default function() {
  ReactDOM.hydrate(
    <BrowserRouter>
      <ApolloProvider client={getApolloClientForFalmer}>
        <APHook client={getApolloClientForFalmer}>
          <ReduxHooks.Provider value={store}>
            <ReduxProvider store={store}>
              <LokiHeader />
            </ReduxProvider>
          </ReduxHooks.Provider>
        </APHook>
      </ApolloProvider>
    </BrowserRouter>,
    document.querySelector('.LokiHeader'),
  );
}
