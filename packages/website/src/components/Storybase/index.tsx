import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ScrollToTop } from '../ScrollToTop';
import { store } from '../../redux/store';
import { ApolloProvider } from 'react-apollo';
import getApolloClientForFalmer from '@ussu/common/src/libs/getApolloClientForFalmer';

export const Storybase = (url: string = '/') => (story: () => any) => (
  <ReduxProvider store={store}>
    <ApolloProvider client={getApolloClientForFalmer}>
      <MemoryRouter initialEntries={[url]}>
        <ScrollToTop>{story()}</ScrollToTop>
      </MemoryRouter>
    </ApolloProvider>
  </ReduxProvider>
);
