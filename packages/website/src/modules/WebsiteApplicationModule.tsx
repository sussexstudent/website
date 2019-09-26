import ReactDOM from 'react-dom';
import React from 'react';
import WebsiteApplication from '../pages/WebsiteApplication';
import { store } from '../redux/store';
import { AppMountState } from '../ducks/router';
import getApolloClientForFalmer from '@ussu/common/src/libs/getApolloClientForFalmer';
import { BrowserRouter } from '../components/BrowserRouter';
import { ApolloProvider } from '@apollo/react-hooks';
import { StoreContext } from 'redux-react-hook';

export default function ready(
  container: any,
  appMountState: AppMountState = AppMountState.Initial,
) {
  ReactDOM.render(
    <BrowserRouter>
      <ApolloProvider client={getApolloClientForFalmer}>
        <StoreContext.Provider value={store}>
          <WebsiteApplication appMountState={appMountState} />
        </StoreContext.Provider>
      </ApolloProvider>
    </BrowserRouter>,
    container,
  );
}
