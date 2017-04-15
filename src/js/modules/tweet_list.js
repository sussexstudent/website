import React from 'react';
import ReactDOM from 'react-dom';
import TweetList from '../components/TweetList';
import perf from '../tracking/perf';


function render(root) {
  const t = perf.recordTime('TweetList', 'render');
  const signature = root.dataset.signature;
  const query = root.dataset.query;
  ReactDOM.render(<TweetList signature={signature} query={query} />, root);
  t.done();
}

export default function onReady() {
  [...document.querySelectorAll('.js-module--tweetList')].forEach(render);
}
