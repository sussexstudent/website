import React from 'react';
import ReactDOM from 'react-dom';
import ContentAPIComposer from '../components/ContentAPIComposer';
import perf from '../tracking/perf';

function render(root) {
  const t = perf.recordTime('ContentAPI', 'render');
  const pageId = root.dataset.pageId;
  ReactDOM.render(<ContentAPIComposer pageId={pageId} />, root);
  t.done();
}

export default function onReady() {
  [...document.querySelectorAll('.js-module--contentAPI')].forEach(render);
}
