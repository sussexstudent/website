import '../../common/src/css/main.css';

import Raven from 'raven-js';
import mitt from 'mitt';
import { addClassesForFeatures } from '@ussu/common/src/libs/features';
addClassesForFeatures();
import './modules/eventRedirect';
import Modal from 'react-modal';
import { BrowserRouter } from './components/BrowserRouter';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { StoreContext } from 'redux-react-hook';
import getApolloClientForFalmer from '@ussu/common/src/libs/getApolloClientForFalmer';
import { store } from './redux/store';
import { Website } from './Website';
// Install raven for sentry error  reporting
if (process.env.NODE_ENV === 'production') {
  Raven.config('https://fd478822b69843a2a3718c621c5fadad@sentry.io/158659', {
    release: process.env.COMMIT_REF,
    environment: 'staging',
    whitelistUrls: [/sussexstudent\.com/, /du9l8eemj97rm.cloudfront\.net/],
  }).install();
}

// probs not great
(window as any).emitter = new mitt();

if (document.querySelector('.Body')) {
  Modal.setAppElement('.Body');
} else if (document.querySelector('#root')) {
  Modal.setAppElement('#root');
}

const site = document.createElement('div');
const sideMenu = document.createElement('div');
site.classList.add('Site');
sideMenu.classList.add('js-side-menu');
document.body.appendChild(sideMenu);
document.body.appendChild(site);

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={getApolloClientForFalmer}>
      <StoreContext.Provider value={store}>
        <Website />
      </StoreContext.Provider>
    </ApolloProvider>
  </BrowserRouter>,
  document.querySelector('.Site'),
);
