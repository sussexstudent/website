import 'whatwg-fetch';
import Promise from 'promise-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ModalManager from './bits/modals/manager';
import HeaderSearch from './components/HeaderSearch';
import LazyLoadApp from './components/LazyLoadApp';
import LoginModal from './components/LoginModal';
import perf from './tracking/perf';
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

  System.import('./bits/panel').then(panel => panel.default());
});
