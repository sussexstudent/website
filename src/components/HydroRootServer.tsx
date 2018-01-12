import React from 'react';
import { ApolloProvider } from 'react-apollo';
import getApolloClientForFalmer from '../libs/getApolloClientForFalmer';
import {StaticRouter} from 'react-router';

const HydroRootServer: React.SFC<{}> = (props) => (
  <ApolloProvider client={getApolloClientForFalmer}>
    <StaticRouter>
      {props.children}
    </StaticRouter>
  </ApolloProvider>
);

export { HydroRootServer };
