import React from 'react';
import ModalManager from './bits/modals/manager';
import LoginModal from './components/LoginModal';

import renderSearch from './apps/search';

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

document.addEventListener('DOMContentLoaded', () => {
  modals.init();
  [...document.querySelectorAll('a')].forEach((e) => {
    e.addEventListener('click', linkListener);
  });

  if (document.querySelector('.app__search')) {
    // eslint-disable-next-line
    renderSearch();
  }

  if (document.querySelector('.app__events')) {
    // eslint-disable-next-line
    require('./apps/events-calender');
  }

  if (document.querySelector('.app__activities')) {
    // eslint-disable-next-line
    require('./apps/activities');
  }

  const search = document.querySelector('.HeaderSearch');
  const header = document.querySelector('.Header');
  search.addEventListener('focus', () => header.classList.add('Header--search-focus'));
  search.addEventListener('blur', () => header.classList.remove('Header--search-focus'));

  // eslint-disable-next-line global-require
  require('./bits/panel').default();
  // eslint-disable-next-line global-require
  console.log(require('./bits/easter-eggs'));
});
