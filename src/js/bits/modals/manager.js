import React from 'react';
import ReactDOM from 'react-dom';
import ModalControler from '../../components/ModalControler';

export default function ModalManager() {
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
