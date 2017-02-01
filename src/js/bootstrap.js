import 'whatwg-fetch';
import Promise from 'promise-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import has from 'lodash/has';
import ModalManager from './bits/modals/manager';
import HeaderSearch from './components/HeaderSearch';
import LazyLoadApp from './components/LazyLoadApp';
// import LoginModal from './components/LoginModal';
// import NewsletterModal from './components/NewsletterModal';
// import SnapchatModal from './components/SnapchatModal';
import perf from './tracking/perf';
import registerOnClickOff from './libs/registerOnClickOff';
import renderSearch from './apps/search';
import renderNews from './apps/news';
import eventCardLinking from './bits/events_card_linking';
import pseudoActiveMenu from './bits/pseudoActiveMenu';
import smoothscroll from './bits/smoothscroll';

// Promise polyfil
if (!window.Promise) {
  window.Promise = Promise;
}

const modals = ModalManager();

const actions = {
  login() {
    // e.preventDefault();
    // modals.add(<LoginModal />);
  },
  snapchat() {
    // e.preventDefault();
    // modals.add(<SnapchatModal />);
  },
  newsletter_subscribe() {
    // e.preventDefault();
    // modals.add(<NewsletterModal />);
  },
  scrollTop(e) {
    e.preventDefault();
    smoothscroll(document.body, 300);
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

  const activitiesApp = document.querySelector('.app__activities');

  if (document.querySelector('.app__search')) {
    // eslint-disable-next-line
    renderSearch();
  }

  ReactDOM.render(<HeaderSearch />, document.querySelector('.Header__search'));

  if (document.querySelector('.app__events')) {
    const t = perf.recordTime('import', 'calender');
    System.import('./apps/events-calender').then(() => t.done());
  }

  if (activitiesApp) {
    const t = perf.recordTime('import', 'activities');
    System.import('./apps/activities').then((app) => {
      t.done();
      const ActivitiesApp = app.default;
      ReactDOM.render(<LazyLoadApp><ActivitiesApp /></LazyLoadApp>, activitiesApp);
    });
    ReactDOM.render(<LazyLoadApp />, activitiesApp);
  }

  if (document.querySelector('.app__tweets')) {
    const t = perf.recordTime('import', 'tweets');
    System.import('./apps/tweets').then(() => t.done());
  }

  if (document.querySelector('.app__news')) {
    renderNews();
  }


  if (localStorage.getItem('su_cookie') !== '1') {
    const el = document.createElement('div');
    document.body.insertBefore(el, document.body.firstChild);
    System.import('./components/CookieMessage')
      .then(module => module.default)
      .then((CookieMessage) => {
        ReactDOM.render(<CookieMessage />, el);
      });
    localStorage.setItem('su_cookie', '1');
  }

  eventCardLinking();

  if (localStorage.getItem('su_proto') === '1') {
    System.import('./bits/panel').then(panel => panel.default());
  }
  // eslint-disable-next-line no-undef
  if (has(window, 'mslUserInfo.userinfo.FirstName')) {
    // eslint-disable-next-line no-undef
    const firstName = window.mslUserInfo.userinfo.FirstName;
    const welcome = document.querySelector('.UserBar__item--welcome');
    if (welcome) {
      welcome.appendChild(document.createTextNode(`Hi ${firstName}!`));
    }
  }

  [...document.querySelectorAll('.UserBar__item-dropdown')].forEach((dropdownEl) => {
    if (dropdownEl.firstChild) {
      dropdownEl.parentNode.classList.remove('UserBar__item--empty');
    }
  });

  [...document.querySelectorAll('.UserBar__item-admin')]
    .forEach((item) => {
      item.querySelector('span')
        .addEventListener('click', () => {
          item.classList.toggle('UserBar__item--open');
          setTimeout(() => {
            registerOnClickOff(item.querySelector('.UserBar__item-dropdown'), () => {
              item.classList.toggle('UserBar__item--open', false);
            });
          }, 0);
        });
    });

  pseudoActiveMenu(window.location);
});
