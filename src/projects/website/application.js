import Raven from 'raven-js';
import mitt from 'mitt';
import 'what-input';
import 'regenerator-runtime';
import currentUser from '~libs/user';
import { addClassesForFeatures } from '~libs/features';
import hydro from '../../modules/hydro';
import Modal from 'react-modal';
import { grooves } from '../../libs/grooves';
import '../../modules/eventRedirect';

addClassesForFeatures();

Modal.setAppElement('.Body');

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

if (currentUser.fundraising.blocking) {
  [...document.querySelectorAll('.AdvertBar')].forEach((advert) => {
    advert.remove();
  });
}

if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const timings = window.performance.timing;
      grooves.track('Performance Timed', {
        dnsTiming: timings.domainLookupEnd - timings.domainLookupStart,
        tcpTiming: timings.connectEnd - timings.connectStart,
        requestTiming: timings.responseStart - timings.connectEnd,
        responseTiming: timings.responseEnd - timings.responseStart,
        processingTiming: timings.loadEventStart - timings.domLoading,
        onLoadTiming: timings.loadEventEnd - timings.loadEventStart,
        totalPageLoadTime: timings.loadEventEnd - timings.navigationStart,
      });
    }, 0);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.QuoteSlips')) {
    [...document.querySelectorAll('.QuoteSlips')].forEach((quoteSlip) => {
      [...quoteSlip.querySelector('.QuoteSlips__questions').children].forEach(
        (li) => {
          li.addEventListener('click', () => {
            const answerContainer = quoteSlip.querySelector(
              '.QuoteSlips__answer-container',
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
        },
      );
    });
  }
  /* New module style */

  // All pages
  hydro();

  // todo dev detection
  if (window.location.hostname === 'localhost') {
    import(/* webpackChunkName: "compoptions.module" */ '../../modules/compconfig').then(
      (module) => module.default(),
    );
  }

  // Conditional modules
  // Module: homepageNews
  // TODO: update homepage news selector
  if (document.querySelector('.app__news')) {
    import(/* webpackChunkName: "homepageNews.module" */ '../../modules/homepageNews').then(
      (module) => module.default(),
    );
  }

  if (document.querySelector('.app__news_page')) {
    import(/* webpackChunkName: "newsPage.module" */ '../../modules/newsPage').then(
      (module) => module.default(),
    );
  }

  // Module: cookie_message
  if (localStorage.getItem('su_cookie') !== '1') {
    import(/* webpackChunkName: "cookie_message.module" */ '../../modules/cookie_message').then(
      (module) => module.default(),
    );
  }
});
