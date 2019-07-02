import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ScrollToTop } from '../ScrollToTop';
import { ApolloProvider } from 'react-apollo';
import getApolloClientForFalmer from '@ussu/common/src/libs/getApolloClientForFalmer';

export const Storybase = (url: string = '/') => (story: () => any) => (
  <ApolloProvider client={getApolloClientForFalmer}>
    <MemoryRouter initialEntries={[url]}>
      <ScrollToTop>{story()}</ScrollToTop>
    </MemoryRouter>
  </ApolloProvider>
);
