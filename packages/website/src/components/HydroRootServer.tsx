import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { ApolloProvider as APHooks } from 'react-apollo-hooks';
import { StoreContext as ProviderHooks } from 'redux-react-hook';

export const HydroRootServer: React.FC<{ apolloClient?: any }> = (props) => {
  if (props.apolloClient) {
    return (
      <Provider store={store}>
        <ProviderHooks.Provider value={store}>
          <ApolloProvider client={props.apolloClient}>
            <APHooks client={props.apolloClient}>{props.children}</APHooks>
          </ApolloProvider>
        </ProviderHooks.Provider>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <ProviderHooks.Provider value={store}>
        {props.children}
      </ProviderHooks.Provider>
    </Provider>
  );
};
