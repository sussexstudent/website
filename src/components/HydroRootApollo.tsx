import React from 'react';
import { ApolloProvider } from 'react-apollo';
import getApolloClientForFalmer from '../libs/getApolloClientForFalmer';

const HydroRoot: React.SFC<{}> = (props) => {
  console.log(props);
  return (
    <ApolloProvider client={getApolloClientForFalmer}>
      {props.children}
    </ApolloProvider>
  );
};

export default HydroRoot;
