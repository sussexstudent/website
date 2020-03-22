import React from 'react';
import { store } from '../redux/store';
import { StoreContext } from 'redux-react-hook';
import { MemoryRouter } from 'react-router-dom';
import getApolloClientForFalmer
  from "@ussu/common/src/libs/getApolloClientForFalmer";
import { ApolloProvider } from '@apollo/react-hooks';

export const CompProvider: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={getApolloClientForFalmer}>
    <MemoryRouter initialEntries={['/mem']}>
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    </MemoryRouter>
    </ApolloProvider>
  );
};
