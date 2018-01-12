import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import getApolloClientForFalmer from '../libs/getApolloClientForFalmer';
import ScrollToTop from '../components/ScrollToTop';

const HydroRoot: React.SFC<{}> = (props) => (
  <ApolloProvider client={getApolloClientForFalmer}>
    <BrowserRouter basename={(typeof window !== "undefined") && window.location.pathname.indexOf('/~/') === 0 ? '/~/' : undefined}>
      <ScrollToTop>
        {props.children}
      </ScrollToTop>
    </BrowserRouter>
  </ApolloProvider>
);

export { HydroRoot };
