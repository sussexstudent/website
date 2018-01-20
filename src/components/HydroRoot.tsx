import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import getApolloClientForFalmer from '../libs/getApolloClientForFalmer';
import ScrollToTop from '../components/ScrollToTop';

const HydroRoot: React.SFC<{}> = (props) => (
  <ApolloProvider client={getApolloClientForFalmer}>
    <BrowserRouter>
      <ScrollToTop>{props.children}</ScrollToTop>
    </BrowserRouter>
  </ApolloProvider>
);

export { HydroRoot };
