import React from 'react';
import ReactDOM from 'react-dom';
import {CookieMessage} from '../components/CookieMessage';

export default function onReady() {
  const el = document.createElement('div');
  document.body.insertBefore(el, document.body.firstChild);
  ReactDOM.render(<CookieMessage />, el);

  try {
    localStorage.setItem('su_cookie', '1');
  } catch (e) {
    // props Private Browsing/Safari
  }
}
