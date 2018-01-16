import Raven from 'raven-js';
// import React from 'react';
import mitt from 'mitt';
import 'what-input';
import currentUser from '~libs/user';
import smoothscroll from '~libs/smoothscroll';
// import ReactDOM from 'react-dom';
// import NewsletterModal from './components/NewsletterModal';
// import SnapchatModal from './components/SnapchatModal';
import perf from '../../tracking/perf';
import hydro from '../../modules/hydro';
import eventCards from '../../modules/event_cards';

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
  [...document.querySelectorAll('a')].forEach(e => {
    e.addEventListener('click', linkListener);
  });

  if (document.querySelector('.QuoteSlips')) {
    [...document.querySelectorAll('.QuoteSlips')].forEach(quoteSlip => {
      [...quoteSlip.querySelector('.QuoteSlips__questions').children].forEach(
        li => {
          li.addEventListener('click', () => {
            const answerContainer = quoteSlip.querySelector(
              '.QuoteSlips__answer-container'
            );
            const content = li.querySelector('.QuoteSlips__item-answer')
              .innerHTML;
            answerContainer.innerHTML = `
          <h3 class="QuoteSlips__answer-question">${
            li.firstChild.textContent
          }</h3>
          <div class="QuoteSlips__answer-content">${content}</div>
          `;
          });
        }
      );
    });
  }
  /* New module style */

  function A11yRecite() {
    const serviceUrl = '//api.reciteme.com/asset/js?key=';
    const serviceKey = 'ecfd7078070968e702b46720f3f7bb4420de0154';
    const options = {};
    const autoLoad = false;
    const enableFragment = '#reciteEnable';

    const loaded = [];
    let frag = !1;
    window.location.hash === enableFragment && (frag = !0);
    function loadScript(c, b) {
      const a = document.createElement('script');
      a.type = 'text/javascript';
      a.readyState
        ? (a.onreadystatechange = function() {
            if (a.readyState == 'loaded' || a.readyState == 'complete')
              (a.onreadystatechange = null), void 0 != b && b();
          })
        : void 0 != b &&
          (a.onload = function() {
            b();
          });
      a.src = c;
      document.getElementsByTagName('head')[0].appendChild(a);
    }
    function _rc(c) {
      c += '=';
      for (let b = document.cookie.split(';'), a = 0; a < b.length; a++) {
        for (var d = b[a]; d.charAt(0) == ' '; ) d = d.substring(1, d.length);
        if (d.indexOf(c) == 0) return d.substring(c.length, d.length);
      }
      return null;
    }
    function loadService(c) {
      for (var b = serviceUrl + serviceKey, a = 0; a < loaded.length; a++)
        if (loaded[a] == b) return;
      loaded.push(b);
      loadScript(serviceUrl + serviceKey, () => {
        typeof _reciteLoaded === 'function' && _reciteLoaded();
        typeof c === 'function' && c();
        Recite.load(options);
        Recite.Event.subscribe('Recite:load', () => {
          Recite.enable();
        });
      });
    }

    _rc('Recite.Persist') == 'true' && loadService();
    ((autoLoad && _rc('Recite.Persist') != 'false') || frag) && loadService();

    return loadService;
  }

  window.loadRecite = A11yRecite();

  // All pages
  eventCards();
  hydro();

  // todo dev detection
  if (window.location.hostname === 'localhost') {
    import(/* webpackChunkName: "compoptions.module" */ '../../modules/compconfig').then(
      module => module.default()
    );
  }

  // Conditional modules
  // Module: homepageNews
  // TODO: update homepage news selector
  if (document.querySelector('.app__news')) {
    import(/* webpackChunkName: "homepageNews.module" */ '../../modules/homepageNews').then(
      module => module.default()
    );
  }

  if (document.querySelector('.app__news_page')) {
    import(/* webpackChunkName: "newsPage.module" */ '../../modules/newsPage').then(
      module => module.default()
    );
  }

  // Module: tweetList
  if (document.querySelector('.js-module--contentAPI')) {
    const t = perf.recordTime('import', 'contentAPI');
    import(/* webpackChunkName: "contentAPI.module" */ '../../modules/contentAPI').then(
      module => {
        module.default();
        t.done();
      }
    );
  }

  // Module: cookie_message
  if (localStorage.getItem('su_cookie') !== '1') {
    import(/* webpackChunkName: "cookie_message.module" */ '../../modules/cookie_message').then(
      module => module.default()
    );
  }
});
