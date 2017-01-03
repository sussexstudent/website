import 'whatwg-fetch';
import Promise from 'promise-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ModalManager from './bits/modals/manager';
import HeaderSearch from './components/HeaderSearch';
import LoginModal from './components/LoginModal';

import renderSearch from './apps/search';

// Promise polyfil
if (!window.Promise) {
  window.Promise = Promise;
}

const modals = ModalManager();

const actions = {
  login(e) {
    e.preventDefault();
    modals.add(<LoginModal />);
  },
};

function linkListener(e) {
  const el = e.target.dataset;
  if (Object.hasOwnProperty.call(actions, el.action)) {
    actions[el.action](e);
  }
}

window.ga = () => {};

document.addEventListener('DOMContentLoaded', () => {
  modals.init();
  [...document.querySelectorAll('a')].forEach((e) => {
    e.addEventListener('click', linkListener);
  });

  if (document.querySelector('.app__search')) {
    // eslint-disable-next-line
    renderSearch();
  }

  ReactDOM.render(<HeaderSearch />, document.querySelector('.Header__search'));

  if (document.querySelector('.app__events')) {
    // eslint-disable-next-line
    require('./apps/events-calender');
  }

  if (document.querySelector('.app__activities')) {
    // eslint-disable-next-line
    require('./apps/activities');
  }

  if (document.querySelector('.app__tweets')) {
    // eslint-disable-next-line
    require('./apps/tweets');
  }

  // eslint-disable-next-line global-require
  require('./bits/panel').default();
  // eslint-disable-next-line global-require
  console.log(require('./bits/easter-eggs'));
});
