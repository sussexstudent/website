import React from 'react';
import ReactDOM from 'react-dom';
import OptionsPanel from './OptionsPanel';

export default function enablePanel() {
  const panelContainer = document.createElement('div');
  document.body.appendChild(panelContainer);

  ReactDOM.render(<OptionsPanel />, panelContainer);
}
