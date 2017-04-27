import Raven from 'raven-js';
import React from 'react';
import mitt from 'mitt';
import ReactDOM from 'react-dom';
import ModalManager from './bits/modals/manager';
import HeaderSearch from './components/HeaderSearch';
import LazyLoadApp from './components/LazyLoadApp';
// import LoginModal from './components/LoginModal';
// import NewsletterModal from './components/NewsletterModal';
// import SnapchatModal from './components/SnapchatModal';
import perf from './tracking/perf';
import renderSearch from './apps/search';
import currentUser from './libs/user';
import smoothscroll from './libs/smoothscroll';
import eventCards from './modules/event_cards';
import menu from './modules/menu';
import userBar from './modules/user_bar';


// Install raven for sentry error  reporting
if (process.env.NODE_ENV === 'production') {
  Raven.config('https://fd478822b69843a2a3718c621c5fadad@sentry.io/158659', {
    // eslint-disable-next-line
    release: window.releaseMetadata.gitRev || 'dev',
    environment: 'production',
    whitelistUrls: [/sussexstudent\.com/, /du9l8eemj97rm.cloudfront\.net/],
  }).install();
}

// props not great
window.emitter = mitt();

window.LinkshimAsyncLink = {
  referrer_log() {},
  swap() {},
};

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

  const activitiesApp = document.querySelector('.app__activities');
  if (activitiesApp) {
    const t = perf.recordTime('import', 'activities');
    import(/* webpackChunkName: "discover_orgs.module" */'./apps/activities').then((app) => {
      t.done();
      const ActivitiesApp = app.default;
      ReactDOM.render(<LazyLoadApp><ActivitiesApp /></LazyLoadApp>, activitiesApp);
    });
    ReactDOM.render(<LazyLoadApp />, activitiesApp);
  }

  // NEWS RENDERING
  // TODO: work everywhere
  if (document.querySelector('.app__news')) {
    import(/* webpackChunkName: "news_blocks.module" */ './bits/news');
  }

  if (localStorage.getItem('su_proto') === '1') {
    import(/* webpackChunkName: "panel.module" */'./bits/panel').then(panel => panel.default());
  }


  /* New module style */

  // All pages
  eventCards();
  menu();
  userBar();

  // Conditional modules

  // Module: tweetList
  if (document.querySelector('.js-module--tweetList')) {
    const t = perf.recordTime('import', 'tweetList');
    import(/* webpackChunkName: "tweet_list.module" */ './modules/tweet_list').then((module) => {
      module.default();
      t.done();
    });
  }

  // Module: cookie_message
  if (localStorage.getItem('su_cookie') !== '1') {
    import(/* webpackChunkName: "cookie_message.module" */ './modules/cookie_message')
      .then(module => module.default());
  }
});
