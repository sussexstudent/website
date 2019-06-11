import '../../css/sanguine.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Raven from 'raven-js';
import mitt from 'mitt';
import { addClassesForFeatures } from '@ussu/common/src/libs/features';
import { ApolloProvider as ApolloProviderHooks } from 'react-apollo-hooks';
import { StoreContext } from 'redux-react-hook';
import getApolloClientForFalmer from '@ussu/common/src/libs/getApolloClientForFalmer';
import { store } from '../../website/src/redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from '../../website/src/components/BrowserRouter';
import Loadable from 'react-loadable';
import { Website } from './Website';

addClassesForFeatures();

// Install raven for sentry error  reporting
if (process.env.NODE_ENV === 'production') {
  Raven.config('https://fd478822b69843a2a3718c621c5fadad@sentry.io/158659', {
    // eslint-disable-next-line
    release: (window as any).releaseMetadata.gitRev || 'dev',
    environment: 'production',
    whitelistUrls: [/sussexstudent\.com/, /du9l8eemj97rm.cloudfront\.net/],
  }).install();
}

// probs not great
(window as any).emitter = new mitt();

(window as any).LinkshimAsyncLink = {
  referrer_log() {},
  swap() {},
};

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <ApolloProvider client={getApolloClientForFalmer}>
        <ApolloProviderHooks client={getApolloClientForFalmer}>
          <ReduxProvider store={store}>
            <StoreContext.Provider value={store}>
              <Website />
            </StoreContext.Provider>
          </ReduxProvider>
        </ApolloProviderHooks>
      </ApolloProvider>
    </BrowserRouter>,
    document.querySelector('.Site'),
  );
});
