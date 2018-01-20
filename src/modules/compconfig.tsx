import React from 'react';
import ReactDOM from 'react-dom';
import CompOptionsPanel from '~components/CompOptionsPanel';

export default () => {
  const container = document.createElement('div');
  ReactDOM.render(<CompOptionsPanel />, document.body.appendChild(container));
};
