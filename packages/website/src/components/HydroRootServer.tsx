import React from 'react';
import { store } from '../redux/store';
import { ApolloProvider } from '@apollo/react-hooks';
import { StoreContext as ProviderHooks } from 'redux-react-hook';

export const HydroRootServer: React.FC<{ apolloClient?: any }> = (props) => {
  if (props.apolloClient) {
    return (
      <ProviderHooks.Provider value={store}>
        <ApolloProvider client={props.apolloClient}>
          {props.children}
        </ApolloProvider>
      </ProviderHooks.Provider>
    );
  }

  return (
    <ProviderHooks.Provider value={store}>
      {props.children}
    </ProviderHooks.Provider>
  );
};
