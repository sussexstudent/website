import React from 'react';
import ReactDOM from 'react-dom';
import TweetList from '../../components/TweetList';
import perf from '../../tracking/perf';

const tweetsResource = 'https://dxziiu0wrgyxg.cloudfront.net/getTweets';

function render(props) {
  const t = perf.recordTime('TweetList', 'render', null, !props.isLoading);
  ReactDOM.render(<TweetList {...props} />, document.querySelector('.app__tweets'));
  t.done();
}

const t = perf.recordTime('TweetList', 'fetch');
fetch(tweetsResource)
  .then((response) => { t.done(); return response.json(); })
  .then(data => render({ tweets: data, isLoading: false }))
  .catch(e => render({ tweets: e }));

render({ isLoading: true });
