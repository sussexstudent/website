import '../../css/main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Raven from 'raven-js';
import mitt from 'mitt';
import { addClassesForFeatures } from '~libs/features';
import AdvertBar from '~components/AdvertBar';
import { LokiHeaderServer } from '~components/LokiHeader';
import WebsiteApplication from '~website/containers/WebsiteApplication';
import { AppMountState } from '~website/ducks/router';
import MobileFooterTreats from '~components/MobileFooterTreats';
import PrefooterMenu from '~components/PrefooterMenu';
import Footer from '~components/Footer';
import { cx } from 'emotion';
import DonatelloBanner from '~icons/donatello.svg';
import getApolloClientForFalmer from '~libs/getApolloClientForFalmer';
import { store } from '~website/redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from '~components/BrowserRouter';
import { hydrate } from 'emotion';
import Loadable from 'react-loadable';

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

const App = () => (
  <React.Fragment>
    <AdvertBar className="AdvertBar--top" position="TopBanner" />
    <LokiHeaderServer />
    <main className={cx('Site__content u-keep-footer-down')}>
      <WebsiteApplication appMountState={AppMountState.Sanguine} />
    </main>
    <MobileFooterTreats />
    <PrefooterMenu />
    <Footer />
    <div className="AdvertBar AdvertBar--donatello">
      <a
        className="AdvertBar__advert"
        href="http://www.donatello.co.uk/?utm_source=ussu&utm_medium=footer"
      >
        <DonatelloBanner />
      </a>
    </div>
  </React.Fragment>
);

hydrate((window as any).emotionIds);

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <ApolloProvider client={getApolloClientForFalmer}>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </ApolloProvider>
    </BrowserRouter>,
    document.querySelector('.Site'),
  );
});
