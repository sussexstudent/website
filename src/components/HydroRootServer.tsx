import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { StaticRouter } from 'react-router';
import { store } from '../projects/website/redux/store';
import { Provider } from 'react-redux';

export const HydroRootServer: React.SFC<{ apolloClient?: any }> = (props) => {
  if (props.apolloClient) {
    return (
      <Provider store={store}>
        <ApolloProvider client={props.apolloClient}>
          <StaticRouter>{props.children}</StaticRouter>
        </ApolloProvider>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <StaticRouter>{props.children}</StaticRouter>
    </Provider>
  );
};
