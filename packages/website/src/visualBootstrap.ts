import 'what-input';
import currentUser from '@ussu/common/src/libs/user';
import Modal from 'react-modal';
import hydro from './modules/hydro';

export function setup() {
  if (document.querySelector('.Body')) {
    Modal.setAppElement('.Body');
  } else if (document.querySelector('#root')) {
    Modal.setAppElement('#root');
  }

  if (currentUser && currentUser.fundraising.blocking) {
    Array.from(document.querySelectorAll('.AdvertBar')).forEach((advert) => {
      advert.remove();
    });
  }

  hydro();

  if (window.location.pathname.match(/\/organisation\/([0-9a-z].)/)) {
    import(
      /* webpackChunkName: "StudentGroupEnhancement" */ './modules/StudentGroupEnhancement'
    ).then((module) => module.default());
  }

  // todo dev detection
  if (window.location.hostname === 'localhost') {
    import(
      /* webpackChunkName: "compoptions.module" */ './modules/compconfig'
    ).then((module) => module.default());
  }

  // Conditional modules
  // Module: homepageNews
  // TODO: update homepage news selector
  if (document.querySelector('.app__news')) {
    import(
      /* webpackChunkName: "homepageNews.module" */ './modules/homepageNews'
    ).then((module) => module.default());
  }

  if (document.querySelector('.app__news_page')) {
    import(
      /* webpackChunkName: "newsPage.module" */ './modules/newsPage'
    ).then((module) => module.default());
  }

  // Module: cookie_message
  if (localStorage.getItem('su_cookie') !== '1') {
    import(
      /* webpackChunkName: "cookie_message.module" */ './modules/cookie_message'
    ).then((module) => module.default());
  }
}
