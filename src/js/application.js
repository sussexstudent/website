import Raven from 'raven-js';
// import React from 'react';
import mitt from 'mitt';
import 'what-input';
// import ReactDOM from 'react-dom';
import ModalManager from './bits/modals/manager';
// import LoginModal from './components/LoginModal';
// import NewsletterModal from './components/NewsletterModal';
// import SnapchatModal from './components/SnapchatModal';
import perf from './tracking/perf';
import currentUser from './libs/user';
import smoothscroll from './libs/smoothscroll';
import hydro from './modules/hydro';
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

// probs not great
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
  [...document.querySelectorAll('.AdvertBar')].forEach(advert => {
    advert.remove();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  modals.init();
  [...document.querySelectorAll('a')].forEach(e => {
    e.addEventListener('click', linkListener);
  });

  if (document.querySelector('.QuoteSlips')) {
    [...document.querySelectorAll('.QuoteSlips')].forEach(quoteSlip => {
      [
        ...quoteSlip.querySelector('.QuoteSlips__questions').children,
      ].forEach(li => {
        li.addEventListener('click', () => {
          const answerContainer = quoteSlip.querySelector(
            '.QuoteSlips__answer-container'
          );
          const content = li.querySelector('.QuoteSlips__item-answer')
            .innerHTML;
          answerContainer.innerHTML = `
          <h3 class="QuoteSlips__answer-question">${li.firstChild
            .textContent}</h3>
          <div class="QuoteSlips__answer-content">${content}</div>
          `;
        });
      });
    });
  }
  /* New module style */

  // All pages
  eventCards();
  menu();
  userBar();
  hydro();

  // Conditional modules
  // Module: homepageNews
  // TODO: update homepage news selector
  if (document.querySelector('.app__news')) {
    import(/* webpackChunkName: "homepageNews.module" */ './modules/homepageNews').then(
      module => module.default()
    );
  }

  if (document.querySelector('.app__news_page')) {
    import(/* webpackChunkName: "newsPage.module" */ './modules/newsPage').then(
      module => module.default()
    );
  }

  // Module: tweetList
  if (document.querySelector('.js-module--contentAPI')) {
    const t = perf.recordTime('import', 'contentAPI');
    import(/* webpackChunkName: "contentAPI.module" */ './modules/contentAPI').then(
      module => {
        module.default();
        t.done();
      }
    );
  }

  // Module: cookie_message
  if (localStorage.getItem('su_cookie') !== '1') {
    import(/* webpackChunkName: "cookie_message.module" */ './modules/cookie_message').then(
      module => module.default()
    );
  }
});
