import React from 'react';
import {
  LocationProvider,
  createMemorySource,
  createHistory,
} from '@reach/router';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '~website/redux/store';
import { ApolloProvider } from 'react-apollo';
import getApolloClientForFalmer from '~libs/getApolloClientForFalmer';

const source = createMemorySource('/');
const history = createHistory(source);

export const Storybase = (_url: string = '/') => (story: () => any) => (
  <ReduxProvider store={store}>
    <ApolloProvider client={getApolloClientForFalmer}>
      <LocationProvider history={history}>{story()}</LocationProvider>
    </ApolloProvider>
  </ReduxProvider>
);
