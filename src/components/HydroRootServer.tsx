import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { StaticRouter } from 'react-router';

export const HydroRootServer: React.SFC<{ apolloClient?: any }> = (props) => {
  if (props.apolloClient) {
    return (
      <ApolloProvider client={props.apolloClient}>
        <StaticRouter>{props.children}</StaticRouter>
      </ApolloProvider>
    );
  }

  return <StaticRouter>{props.children}</StaticRouter>;
};
