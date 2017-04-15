import Raven from 'raven-js';
import React from 'react';
import ReactDOM from 'react-dom';
import ModalManager from './bits/modals/manager';
import HeaderSearch from './components/HeaderSearch';
import LazyLoadApp from './components/LazyLoadApp';
// import LoginModal from './components/LoginModal';
// import NewsletterModal from './components/NewsletterModal';
// import SnapchatModal from './components/SnapchatModal';
import perf from './tracking/perf';
import registerOnClickOff from './libs/registerOnClickOff';
import renderSearch from './apps/search';
import classToggle from './libs/dom/classToggle';
import currentUser from './libs/user';
import smoothscroll from './libs/smoothscroll';
import eventCards from './modules/event_cards';
import menu from './modules/menu';

// Install raven for sentry error reporting
Raven.config('https://fd478822b69843a2a3718c621c5fadad@sentry.io/158659').install();

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

if (currentUser.fundraising.blocking) {
  [...document.querySelectorAll('.AdvertBar')].forEach((advert) => {
    advert.remove();
  });
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
    import(/* webpackChunkName: "events-calender.module" */ './apps/events-calender').then(() => t.done());
  }


  if (document.querySelector('.QuoteSlips')) {
    [...document.querySelectorAll('.QuoteSlips')].forEach((quoteSlip) => {
      [...quoteSlip.querySelector('.QuoteSlips__questions').children].forEach((li) => {
        li.addEventListener('click', () => {
          const answerContainer = quoteSlip.querySelector('.QuoteSlips__answer-container');
          const content = li.querySelector('.QuoteSlips__item-answer').innerHTML;
          answerContainer.innerHTML = `
          <h3 class="QuoteSlips__answer-question">${li.firstChild.textContent}</h3>
          <div class="QuoteSlips__answer-content">${content}</div>
          `;
        });
      });
    });
  }

  // const twitter = [...document.querySelectorAll('.App-tweets')]

  if (activitiesApp) {
    const t = perf.recordTime('import', 'activities');
    import(/* webpackChunkName: "discover-orgs.module" */'./apps/activities').then((app) => {
      t.done();
      const ActivitiesApp = app.default;
      ReactDOM.render(<LazyLoadApp><ActivitiesApp /></LazyLoadApp>, activitiesApp);
    });
    ReactDOM.render(<LazyLoadApp />, activitiesApp);
  }

  if (document.querySelector('.app__tweets')) {
    const t = perf.recordTime('import', 'tweets');
    import(/* webpackChunkName: "tweet-list.module" */ './apps/tweets').then(() => t.done());
  }


  // NEWS RENDERING
  // TODO: work everywhere
  if (document.querySelector('.app__news')) {
    import(/* webpackChunkName: "news-blocks.module" */ './bits/news');
  }

  if (localStorage.getItem('su_cookie') !== '1') {
    const el = document.createElement('div');
    document.body.insertBefore(el, document.body.firstChild);
    import(/* webpackChunkName: "cookie-message.component" */ './components/CookieMessage')
      .then(module => module.default)
      .then((CookieMessage) => {
        ReactDOM.render(<CookieMessage />, el);
      });
    localStorage.setItem('su_cookie', '1');
  }


  if (localStorage.getItem('su_proto') === '1') {
    import(/* webpackChunkName: "panel.module" */'./bits/panel').then(panel => panel.default());
  }

  if (currentUser.auth.isLoggedIn) {
    const welcome = document.querySelector('.UserBar__item--welcome');
    if (welcome) {
      welcome.appendChild(document.createTextNode(`Hi ${currentUser.auth.firstName}!`));
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
          classToggle(item, 'UserBar__item--open');
          setTimeout(() => {
            registerOnClickOff(item.querySelector('.UserBar__item-dropdown'), () => {
              classToggle(item, 'UserBar__item--open', false);
            });
          }, 0);
        });
    });


  /* New module style */
  eventCards();
  menu();
});
