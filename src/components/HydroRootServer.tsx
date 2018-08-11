import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { store } from '~website/redux/store';
import { Provider } from 'react-redux';

export const HydroRootServer: React.SFC<{ apolloClient?: any }> = (props) => {
  if (props.apolloClient) {
    return (
      <Provider store={store}>
        <ApolloProvider client={props.apolloClient}>
          {props.children}
        </ApolloProvider>
      </Provider>
    );
  }

  return <Provider store={store}>{props.children}</Provider>;
};
