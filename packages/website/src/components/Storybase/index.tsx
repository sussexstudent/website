import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ScrollToTop } from '../ScrollToTop';
import getApolloClientForFalmer from '@ussu/common/src/libs/getApolloClientForFalmer';
import { store } from '../../redux/store';
import { ApolloProvider } from '@apollo/react-hooks';
import { StoreContext } from 'redux-react-hook';

export const Storybase = (url: string = '/') => (story: () => any) => (
  <MemoryRouter initialEntries={[url]}>
    <ApolloProvider client={getApolloClientForFalmer}>
      <StoreContext.Provider value={store}>
        <ScrollToTop>{story()}</ScrollToTop>
      </StoreContext.Provider>
    </ApolloProvider>
  </MemoryRouter>
);
