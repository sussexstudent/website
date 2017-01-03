import React from 'react';
import ReactDOM from 'react-dom';
import TweetList from '../../components/TweetList';

const tweetsResource = 'https://dxziiu0wrgyxg.cloudfront.net/getTweets';

function render(props) {
  ReactDOM.render(<TweetList {...props} />, document.querySelector('.app__tweets'));
}

fetch(tweetsResource)
  .then(response => response.json())
  .then(data => render({ tweets: data, isLoading: false }))
  .catch(e => render({ tweets: e }));

render({ isLoading: true });
