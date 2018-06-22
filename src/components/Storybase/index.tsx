import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import ScrollToTop from '~components/ScrollToTop';
import { store } from '../../projects/website/redux/store';
import { ApolloProvider } from 'react-apollo';
import getApolloClientForFalmer from '~libs/getApolloClientForFalmer';

console.log(getApolloClientForFalmer);

export const Storybase = (url: string = '/') => (story: () => any) => (
  <ReduxProvider store={store}>
    <ApolloProvider client={getApolloClientForFalmer}>
      <MemoryRouter initialEntries={[url]}>
        <ScrollToTop>{story()}</ScrollToTop>
      </MemoryRouter>
    </ApolloProvider>
  </ReduxProvider>
);
