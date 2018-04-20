import React from 'react';
import { ApolloProvider } from 'react-apollo';
import getApolloClientForFalmer from '../libs/getApolloClientForFalmer';

const HydroRoot: React.SFC<{}> = (props) => {
  return (
    <ApolloProvider client={getApolloClientForFalmer}>
      {props.children}
    </ApolloProvider>
  );
};

export default HydroRoot;
