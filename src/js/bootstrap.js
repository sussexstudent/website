import React from 'react';
import ReactDOM from 'react-dom';
import ModalControler from './components/ModalControler';
import LoginModal from './components/LoginModal';

import renderSearch from './apps/search';

function ModalManager() {
  const stack = [];

  function render() {
    function pop() {
      stack.pop();
      render();
    }

    ReactDOM.render(<ModalControler stack={stack} onClose={pop} />, document.querySelector('.js__modal'));
  }

  render();

  return {
    init: render,
    add: (instance) => {
      stack.push(instance);
      render();
    },
  };
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
});
